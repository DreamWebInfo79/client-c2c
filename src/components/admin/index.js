import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSnowflake, FaWindowMaximize, FaCogs, FaCar, FaMapMarkerAlt, FaBluetooth, FaKey, FaSun, FaCameraRetro } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';

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
  align-items: center;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  padding: 40px 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
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
    technicalSpecifications: [],
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <PageWrapper>
      <FormContainer>
        <Title>Add Car Details</Title>
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
            {formData.images.map((image, index) => (
              <ImageInput key={index}>
                <Input
                  type="text"
                  placeholder={`Image URL ${index + 1}`}
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                />
              </ImageInput>
            ))}
            <Button type="button" onClick={handleAddImage}>
              Add Another Image
            </Button>
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
      </FormContainer>
    </PageWrapper>
  );
};

export default CarForm;
