import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSnowflake, FaWindowMaximize, FaCogs, FaCar, FaMapMarkerAlt, FaBluetooth, FaKey, FaSun, FaCameraRetro, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';
import { cars } from '../CarDetails/cars';
import axios from 'axios';
import './index.css';

// Define feature icons
const featureIcons = {
  FaSnowflake,
  FaWindowMaximize,
  FaCogs,
  FaCar,
  MdEventSeat,
  FaMapMarkerAlt,
  FaBluetooth,
  FaKey,
  FaSun,
  FaCameraRetro,
};

// Styled Components
const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  padding: 40px 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
`;

const Section = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.delete ? 'red' : '#007bff'};
  margin: 0 5px;
  font-size: 18px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.2);
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.2);
  }
`;

const Button = styled.button`
  padding: 15px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const FeatureButton = styled.button`
  padding: 10px;
  border: 2px solid ${props => props.active ? '#007bff' : '#ccc'};
  background-color: ${props => props.active ? '#007bff' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
  border-radius: 50%;
  cursor: pointer;
  margin: 5px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

const ImageInput = styled.div`
  margin-bottom: 10px;
`;

const CarForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    kmDriven: '',
    fuelType: '',
    transmission: '',
    condition: '',
    location: '',
    images: [''],
    features: [],
  });
  const carData = cars;
  const [uploading, setUploading] = useState(false);
  // const [carData, setCarData] = useState([]); // Store car data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFeatureChange = (icon) => {
    setFormData(prevState => ({
      ...prevState,
      features: [...prevState.features, { icon, label: icon.replace(/([A-Z])/g, ' $1').trim() }],
    }));
  };

  const handleAddImage = () => {
    setFormData(prevState => ({
      ...prevState,
      images: [...prevState.images, ''],
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prevState => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0]; // Get the first selected file
    if (newFile) {
      setFormData(prevState => ({
        ...prevState,
        images: [...prevState.images, newFile], // Add the file to the images array
      }));
    }
  };
  
  const uploadImage = async (file) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Get current timestamp
    const fileName = `${formData.brand}-${formData.model}-${timestamp}`; // Generate custom name

    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', 'CLOUDINARY_UPLOAD_PRESET'); // replace with your Cloudinary preset
    imageData.append('public_id', fileName); // Assign custom name

    try {
      // const res = await axios.post(`https://api.cloudinary.com/v1_1/CLOUDINARY_CLOUD_NAME/image/upload`, imageData);
      // return res.data.secure_url; // Return the uploaded image URL
    } catch (err) {
      console.error('Error uploading image:', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const uploadedImages = [];
    for (let i = 0; i < formData.images.length; i++) {
      const file = formData.images[i];
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        uploadedImages.push(imageUrl); // Store uploaded image URLs
      }
    }

    // After all images are uploaded, set the images URLs in the formData
    const updatedFormData = {
      ...formData,
      images: uploadedImages,
    };

    // Add to car data and trigger onSubmit with the form data
    // setCarData([...carData, updatedFormData]);
    onSubmit(updatedFormData);
    setUploading(false);
  };

  const handleDelete = (index) => {
    const updatedData = carData.filter((_, i) => i !== index);
    // setCarData(updatedData);
  };

  const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  background-color: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;


const AddImageButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #28a745;
  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ff4d4d;
  border: none;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const handleDeleteImage = (index) => {
  const updatedImages = formData.images.filter((_, i) => i !== index);
  setFormData(prevState => ({
    ...prevState,
    images: updatedImages,
  }));
};



  return (
    <PageWrapper>
      <Container>
        <Section>
          <Title>Car List</Title>
          <Table>
            <thead>
              <tr>
                <TableHeader>Brand</TableHeader>
                <TableHeader>Model</TableHeader>
                <TableHeader>Year</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {carData.map((car, index) => (
                <TableRow key={index}>
                  <TableData>{car.brand}</TableData>
                  <TableData>{car.model}</TableData>
                  <TableData>{car.year}</TableData>
                  <TableData>{car.price}</TableData>
                  <TableData>
                    <ActionButton><FaEdit /></ActionButton>
                    <ActionButton delete onClick={() => handleDelete(index)}><FaTrashAlt /></ActionButton>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Section>

        <Section>
          <Title>Add Car</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              placeholder="Model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              placeholder="Year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              placeholder="KM Driven"
              name="kmDriven"
              value={formData.kmDriven}
              onChange={handleInputChange}
              required
            />
            <Select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              required
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </Select>
            <Select
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              required
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </Select>
            <Select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
            >
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </Select>
            <Input
              type="text"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <div>
  <h4>Images</h4>
  <div className="image-container">
    {formData.images.map((file, index) => (
      <div className="image-box" key={index}>
        {file instanceof File ? (
          <img src={URL.createObjectURL(file)} alt="Uploaded Car" className="uploaded-image" />
        ) : (
          <span>Invalid file</span>
        )}
        <button className="delete-button" onClick={() => handleDeleteImage(index)}>
          <FaTrashAlt />
        </button>
      </div>
    ))}
  </div>
  <label className="add-image-button">
    <FaPlus /> Add Image
    <input type="file" onChange={handleFileChange} />
  </label>
</div>


            <div>
              <h4>Features</h4>
              {Object.entries(featureIcons).map(([icon, IconComponent]) => (
                <FeatureButton
                  key={icon}
                  active={formData.features.find(f => f.icon === icon)}
                  onClick={() => handleFeatureChange(icon)}
                >
                  <IconComponent size={24} />
                </FeatureButton>
              ))}
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        </Section>
      </Container>
    </PageWrapper>
  );
};

export default CarForm;
