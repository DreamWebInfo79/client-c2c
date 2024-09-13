import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FaCar, FaMoneyBill, FaCalendarAlt, FaMapMarkerAlt, FaRoad, FaSnowflake, FaWindowMaximize, FaCogs, FaBluetooth, FaKey, FaSun, FaCameraRetro } from 'react-icons/fa';
import { MdPhotoCamera, MdDelete } from 'react-icons/md';
import './addCar.css';

// Cloudinary configuration
const CLOUDINARY_UPLOAD_PRESET = 'your_preset'; // Replace with your Cloudinary preset
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/your_cloud_name/upload'; // Replace with your Cloudinary URL

const featureIcons = [
  { icon: FaSnowflake, label: 'Air Conditioning' },
  { icon: FaWindowMaximize, label: 'Power Windows' },
  { icon: FaCogs, label: 'Power Steering' },
  { icon: FaBluetooth, label: 'Bluetooth Connectivity' },
  { icon: FaKey, label: 'Keyless Entry' },
  { icon: FaSun, label: 'Sunroof' },
  { icon: FaCameraRetro, label: 'Backup Camera' },
];

const CarForm = () => {
  const [carDetails, setCarDetails] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    kmDriven: '',
    fuelType: '',
    transmission: '',
    condition: '',
    location: '',
    images: [],
    features: [],
    technicalSpecifications: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleImageUpload = async (files) => {
    const uploadedImageUrls = [];
    const previews = [];

    for (const file of files) {
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        setImagePreviews([...previews]);
      };
      reader.readAsDataURL(file);

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
        uploadedImageUrls.push(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    setCarDetails({
      ...carDetails,
      images: [...carDetails.images, ...uploadedImageUrls],
    });
  };

  const handleDrop = (acceptedFiles) => {
    setImageFiles(acceptedFiles);
    handleImageUpload(acceptedFiles);
  };

  const handleImageDelete = (index) => {
    setCarDetails({
      ...carDetails,
      images: carDetails.images.filter((_, i) => i !== index),
    });
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleFeatureAdd = () => {
    if (selectedFeature) {
      setCarDetails({
        ...carDetails,
        features: [...carDetails.features, selectedFeature],
      });
      setSelectedFeature(null);
    }
  };

  const handleFeatureDelete = (index) => {
    setCarDetails({
      ...carDetails,
      features: carDetails.features.filter((_, i) => i !== index),
    });
  };

  const handleTechnicalSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...carDetails.technicalSpecifications];
    updatedSpecs[index] = {
      ...updatedSpecs[index],
      [field]: value,
    };
    setCarDetails({
      ...carDetails,
      technicalSpecifications: updatedSpecs,
    });
  };

  const handleAddSpecification = () => {
    setCarDetails({
      ...carDetails,
      technicalSpecifications: [...carDetails.technicalSpecifications, { label: '', value: '' }],
    });
  };

  const handleSpecificationDelete = (index) => {
    setCarDetails({
      ...carDetails,
      technicalSpecifications: carDetails.technicalSpecifications.filter((_, i) => i !== index),
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically send carDetails to your backend or use it as needed
    console.log('Car details submitted:', carDetails);
  };

  return (
    <div className="car-form-container">
      <h2>Add Car Details</h2>
      <form onSubmit={handleSubmit} className="car-form">
        <div className="form-section left">
          <div className="form-group">
            <label><FaCar /> Brand:</label>
            <input type="text" name="brand" value={carDetails.brand} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label><FaCar /> Model:</label>
            <input type="text" name="model" value={carDetails.model} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label><FaCalendarAlt /> Year:</label>
            <input type="text" name="year" value={carDetails.year} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label><FaMoneyBill /> Price:</label>
            <input type="text" name="price" value={carDetails.price} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label><FaRoad /> KM Driven:</label>
            <input type="text" name="kmDriven" value={carDetails.kmDriven} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="form-section right">
          <div className="form-group">
            <label><FaCar /> Fuel Type:</label>
            <input type="text" name="fuelType" value={carDetails.fuelType} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label><FaCar /> Transmission:</label>
            <input type="text" name="transmission" value={carDetails.transmission} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label><FaCar /> Condition:</label>
            <input type="text" name="condition" value={carDetails.condition} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label><FaMapMarkerAlt /> Location:</label>
            <input type="text" name="location" value={carDetails.location} onChange={handleInputChange} required />
          </div>
          <div className="form-group images-upload" {...getRootProps()}>
            <input {...getInputProps()} />
            <p><MdPhotoCamera /> Drag & drop images here, or click to select files</p>
            <div className="image-previews">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview-container">
                  <img src={preview} alt={`Preview ${index}`} className="image-preview" />
                  <MdDelete className="delete-icon" onClick={() => handleImageDelete(index)} />
                </div>
              ))}
            </div>
          </div>

          <div className="form-group feature-selection">
            <label>Features:</label>
            <div className="feature-icons">
              {featureIcons.map((iconObj, index) => {
                const Icon = iconObj.icon;
                return (
                  <div key={index} className="feature-icon" onClick={() => setSelectedFeature(iconObj)}>
                    <Icon size={24} />
                    <p>{iconObj.label}</p>
                  </div>
                );
              })}
            </div>
            <button type="button" onClick={handleFeatureAdd}>Add Feature</button>
            <div className="features-list">
              {carDetails.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <feature.icon size={24} />
                  <p>{feature.label}</p>
                  <MdDelete className="delete-icon" onClick={() => handleFeatureDelete(index)} />
                </div>
              ))}
            </div>
          </div>

          <div className="form-group technical-specifications">
            <label>Technical Specifications:</label>
            {carDetails.technicalSpecifications.map((spec, index) => (
              <div key={index} className="technical-specification">
                <input
                  type="text"
                  value={spec.label}
                  placeholder="Label"
                  onChange={(e) => handleTechnicalSpecificationChange(index, 'label', e.target.value)}
                />
                <input
                  type="text"
                  value={spec.value}
                  placeholder="Value"
                  onChange={(e) => handleTechnicalSpecificationChange(index, 'value', e.target.value)}
                />
                <MdDelete
                  className="delete-icon"
                  onClick={() => handleSpecificationDelete(index)}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddSpecification}>Add More</button>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarForm;
