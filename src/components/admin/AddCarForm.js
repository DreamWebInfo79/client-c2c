import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FaCar, FaMoneyBill, FaCalendarAlt, FaMapMarkerAlt, FaRoad, FaSnowflake, FaWindowMaximize, FaCogs, FaBluetooth, FaKey, FaSun, FaCameraRetro, FaCamera } from 'react-icons/fa';
import { MdPhotoCamera, MdDelete, MdAdd } from 'react-icons/md';
import { FaCarBattery, FaGasPump, FaMusic, FaTachometerAlt, FaFan, FaShieldAlt, FaHandsHelping, FaLightbulb, FaChargingStation, FaRulerCombined, FaOilCan, FaLeaf } from 'react-icons/fa';
import Select from 'react-select';
import { Snackbar, Alert } from '@mui/material';
import Indian_states_cities_list from "indian-states-cities-list";
import './addCar.css';

const CLOUDINARY_UPLOAD_PRESET = 'oaniufcx';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dn3x0cm7f/upload';

const fuelOptions = [
  { value: 'Petrol', label: 'Petrol' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Hybrid', label: 'Hybrid' },
];

const carBrandOptions = [
  { value: 'Toyota', label: 'Toyota' },
  { value: 'Honda', label: 'Honda' },
  { value: 'Hyundai', label: 'Hyundai' },
  { value: 'Ford', label: 'Ford' },
  { value: 'custom', label: 'Add New Brand...' }
];

const yearOptions = Array.from({ length: 30 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

const transmissionOptions = [
  { value: 'Manual', label: 'Manual' },
  { value: 'Automatic', label: 'Automatic' },
];

const conditionOptions = [
  { value: 'New', label: 'New' },
  { value: 'Used', label: 'Used' },
];

// const locationOptions = [
//   { value: 'Hyderabad, Telangana', label: 'Hyderabad, Telangana' },
//   { value: 'Bangalore, Karnataka', label: 'Bangalore, Karnataka' },
//   { value: 'Mumbai, Maharashtra', label: 'Mumbai, Maharashtra' },
//   // Add more locations as needed
// ];

const locationOptions=Indian_states_cities_list.STATES_OBJECT

const featureIcons = [ 
  { icon: FaSnowflake, label: 'Air Conditioning' },
  { icon: FaWindowMaximize, label: 'Power Windows' },
  { icon: FaCogs, label: 'Power Steering' },
  { icon: FaBluetooth, label: 'Bluetooth Connectivity' },
  { icon: FaKey, label: 'Keyless Entry' },
  { icon: FaSun, label: 'Sunroof' },
  { icon: FaCameraRetro, label: 'Backup Camera' },
  { icon: FaCarBattery, label: 'Battery Saver Mode' },
  { icon: FaGasPump, label: 'Fuel Efficient' },
  { icon: FaMusic, label: 'Premium Sound System' },
  { icon: FaTachometerAlt, label: 'Tachometer' },
  { icon: FaFan, label: 'Ventilated Seats' },
  { icon: FaShieldAlt, label: 'Anti-Lock Brakes (ABS)' },
  { icon: FaHandsHelping, label: 'Parking Assistance' },
  { icon: FaLightbulb, label: 'LED Headlights' },
  { icon: FaChargingStation, label: 'Electric Charging Port' },
  { icon: FaRulerCombined, label: 'Adjustable Steering' }
];

const defaultTechnicalSpecifications = [
  { label: 'Touchscreen Display', value: 'Yes' },
  { label: 'Number of Doors', value: '4' },
  { label: 'Number of Seats', value: '5' },
  { label: 'Body Type', value: 'Sedan' },
  { label: 'Parking Sensors', value: 'Yes' },
  { label: 'Child Safety Locks', value: 'Yes' }
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [specifications, setSpecifications] = useState(defaultTechnicalSpecifications);
  const [customBrand, setCustomBrand] = useState('');
  const [isCustomBrand, setIsCustomBrand] = useState(false);


  const handleAddSpecification = () => {
    setSpecifications([...specifications, { label: '', value: '' }]);
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };
    setSpecifications(updatedSpecs);
  };

  const handleDeleteSpecification = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };


const toggleFeature = (iconObj) => {
  const isAlreadySelected = selectedFeatures.some(feature => feature.label === iconObj.label);

  if (isAlreadySelected) {
    // If already selected, remove it from the selected features
    setSelectedFeatures(selectedFeatures.filter(feature => feature.label !== iconObj.label));
  } else {
    // Otherwise, add the feature to the selected list
    setSelectedFeatures([...selectedFeatures, iconObj]);
  }
};



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
    // Create image previews
    const previews = acceptedFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const uploadImagesToCloudinary = async () => {
    const uploadedImageUrls = [];
    
    for (const file of imageFiles) {
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
    setImageFiles([]); // Clear selected files after upload
    setImagePreviews([]); // Clear previews
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

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming validation is successful
    if (carDetails.brand && carDetails.model && carDetails.year) {
      showSnackbar('Car details added successfully!', 'success');
      console.log('Car details submitted:', carDetails);
    } else {
      showSnackbar('Error adding car details. Please fill all required fields.', 'error');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSelectChange = (selectedOption, field) => {
    setCarDetails({
      ...carDetails,
      [field]: selectedOption.value,
    });
  };

  const handleAddSelectedFeatures = () => {
    const uniqueFeatures = selectedFeatures.filter(feature => 
      !carDetails.features.some(existingFeature => existingFeature.label === feature.label)
    );

    setCarDetails({
      ...carDetails,
      features: [...carDetails.features, ...uniqueFeatures],
    });
    setSelectedFeatures([]);
  };

  const handleBrandChange = (selectedOption) => {
    if (selectedOption.value === 'custom') {
      setIsCustomBrand(true);
    } else {
      setCarDetails({
        ...carDetails,
        brand: selectedOption.value
      });
      setIsCustomBrand(false);
    }
  };

  const handleCustomBrandSubmit = () => {
    if (customBrand.trim()) {
      setCarDetails({
        ...carDetails,
        brand: customBrand.trim()
      });
      setIsCustomBrand(false);
      setCustomBrand('');
    }
  };
  

  return (
    <div className="car-form-container">
      <h2>Add Car Details</h2>
      <form onSubmit={handleSubmit} className="car-form">
        <div className="form-section left">
        <div className="form-group">
            <label><FaCar /> Brand:</label>
            <Select
              options={carBrandOptions}
              onChange={handleBrandChange}
              placeholder="Select Brand"
            />
            {isCustomBrand && (
              <div className="custom-brand-input">
                <input
                  type="text"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  placeholder="Enter new brand"
                />
                <button type="button" onClick={handleCustomBrandSubmit}>Add Brand</button>
              </div>
            )}
          </div>
          <div className="form-group">
            <label><FaCar /> Model:</label>
            <input type="text" name="model" value={carDetails.model} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label><FaCalendarAlt /> Year:</label>
            <Select
              options={yearOptions}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'year')}
              placeholder="Select Year"
            />
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
            <Select
              options={fuelOptions}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'fuelType')}
              placeholder="Select Fuel Type"
            />
          </div>
          <div className="form-group">
            <label><FaCar /> Transmission:</label>
            <Select
              options={transmissionOptions}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'transmission')}
              placeholder="Select Transmission"
            />
          </div>
          <div className="form-group">
            <label><FaCar /> Condition:</label>
            <Select
              options={conditionOptions}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'condition')}
              placeholder="Select Condition"
            />
          </div>
          <div className="form-group">
            <label><FaMapMarkerAlt /> Location:</label>
            <Select
              options={locationOptions}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'location')}
              placeholder="Select Location"
            />
          </div>
          <div className="form-group images-upload" {...getRootProps()}>
          {/* <label><FaCamera /> images:</label> */}
            <input {...getInputProps()} />
            <p><MdPhotoCamera /> Drag & drop images here, or click to select files</p>
            </div>
            <div className="image-previews">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview-container">
                  <img src={preview} alt={`Preview ${index}`} className="image-preview" />
                  <MdDelete className="delete-icon" onClick={() => handleImageDelete(index)} />
                </div>
              ))}
          </div>
          <button style={{marginTop: '10px', marginBottom: '10px', marginRight: '10px', width:'200px', marginLeft: '10px', height: '40px', borderRadius: '5px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'}} onClick={uploadImagesToCloudinary}>Submit Image</button>

          <div className="form-group feature-selection">
            <label>Features:</label>
            <div className="feature-icons">
              {featureIcons.map((iconObj, index) => {
                const Icon = iconObj.icon;
                const isSelected = selectedFeatures.some(feature => feature.label === iconObj.label);
                return (
                  <div
                    key={index}
                    className={`feature-icon ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleFeature(iconObj)}
                  >
                    <Icon size={24} />
                    <p>{iconObj.label}</p>
                  </div>
                );
              })}
            </div>
            <button className='add-car-button' type="button" onClick={handleAddSelectedFeatures}>Add Features</button>
            <div className="features-list">
              {carDetails.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <feature.icon size={24} />
                  <p>{feature.label}</p>
                  <MdDelete size={24} className="delete-icon" onClick={() => handleFeatureDelete(index)} />
                </div>
              ))}
            </div>

          </div>

          <div className="technical-specifications">
      <h3>Technical Specifications</h3>
      {specifications.map((spec, index) => (
        <div key={index} className="technical-specification">
          <input
            type="text"
            value={spec.label}
            placeholder="Label"
            onChange={(e) => handleSpecificationChange(index, 'label', e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <input
            type="text"
            value={spec.value}
            placeholder="Value"
            onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <MdDelete
            className="delete-icon"
            onClick={() => handleDeleteSpecification(index)}
            style={{ cursor: 'pointer', color: 'red' }}
          />
        </div>
      ))}
      <button onClick={handleAddSpecification} className="add-specification-button">
        <MdAdd size={20} /> Add More
      </button>
    </div>
        </div>

        <button className='add-car-button' type="submit">Submit</button>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
    
  );
};

export default CarForm;
