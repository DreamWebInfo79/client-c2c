import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FaCar, FaMoneyBill, FaCalendarAlt, FaMapMarkerAlt, FaRoad, FaSnowflake, FaWindowMaximize, FaCogs, FaBluetooth, FaKey, FaSun, FaCameraRetro, FaExclamationCircle } from 'react-icons/fa';
import { MdPhotoCamera, MdDelete, MdAdd } from 'react-icons/md';
import { FaCarBattery, FaGasPump, FaMusic, FaTachometerAlt, FaFan, FaShieldAlt, FaHandsHelping, FaLightbulb, FaChargingStation, FaRulerCombined, FaOilCan, FaLeaf } from 'react-icons/fa';
import Select from 'react-select';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import Indian_states_cities_list from "indian-states-cities-list";
import { v4 as uuidv4 } from 'uuid';
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
  { value: 'Maruti Suzuki', label: 'Maruti Suzuki' },
  { value: 'Tata Motors', label: 'Tata Motors' },
  { value: 'Mahindra', label: 'Mahindra' },
  { value: 'Kia', label: 'Kia' },
  { value: 'Nissan', label: 'Nissan' },
  { value: 'Volkswagen', label: 'Volkswagen' },
  { value: 'Skoda', label: 'Skoda' },
  { value: 'MG Motor', label: 'MG Motor' },
  { value: 'Renault', label: 'Renault' },
  { value: 'Peugeot', label: 'Peugeot' },
  { value: 'Datsun', label: 'Datsun' },
  { value: 'Subaru', label: 'Subaru' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Isuzu', label: 'Isuzu' },
  { value: 'Porsche', label: 'Porsche' },
  { value: 'BMW', label: 'BMW' },
  { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
  { value: 'Audi', label: 'Audi' },
  { value: 'Lexus', label: 'Lexus' },
  { value: 'Jaguar', label: 'Jaguar' },
  { value: 'Land Rover', label: 'Land Rover' },
  { value: 'Volvo', label: 'Volvo' },
  { value: 'Fiat', label: 'Fiat' },
  { value: 'Mitsubishi', label: 'Mitsubishi' },
  { value: 'Chrysler', label: 'Chrysler' },
  { value: 'Rolls-Royce', label: 'Rolls-Royce' },
  { value: 'Add New Brand...', label: 'Add New Brand...' }
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

const iconMapping = {
  FaSnowflake:FaSnowflake,
  FaWindowMaximize:FaWindowMaximize,
  FaCogs:FaCogs,
  FaBluetooth:FaBluetooth,
  FaKey:FaKey,
  FaSun:FaSun,
  FaCameraRetro:FaCameraRetro,
  FaCarBattery:FaCarBattery,
  FaGasPump:FaGasPump,
  FaMusic:FaMusic,
  FaTachometerAlt:FaTachometerAlt,
  FaFan:FaFan,
  FaShieldAlt:FaShieldAlt,
  FaHandsHelping:FaHandsHelping,
  FaLightbulb:FaLightbulb,
  FaChargingStation:FaChargingStation,
  FaRulerCombined:FaRulerCombined
};

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
    carId: uuidv4(),
    brand: '',
    model: '',
    year: '',
    price: '',
    kmDriven: '',
    fuelType: '',
    transmission: '',
    paragraph:'',
    condition: '',
    location: '',
    images: [],
    features: [],
    technicalSpecifications: defaultTechnicalSpecifications,
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(carDetails)
  }, [carDetails]);


  const handleAddSpecification = () => {
    const updatedSpecifications = [...specifications, { label: '', value: '' }];
    setSpecifications(updatedSpecifications);
    setCarDetails({
      ...carDetails,
      technicalSpecifications: updatedSpecifications,
    });
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };
    setSpecifications(updatedSpecs);
    setCarDetails({
      ...carDetails,
      technicalSpecifications: updatedSpecs,
    });
  };

  const handleDeleteSpecification = (index) => {
    const updatedSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecs);
    setCarDetails({
      ...carDetails,
      technicalSpecifications: updatedSpecs,
    });
  };


const toggleFeature = (iconObj) => {
  const isAlreadySelected = selectedFeatures.some(feature => feature.label === iconObj.label);
  console.log()

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

  const handleDrop = (acceptedFiles) => {
    setImageFiles(acceptedFiles);
    // Create image previews
    const previews = acceptedFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleImageDelete = (index) => {
    setCarDetails({
      ...carDetails,
      images: carDetails.images.filter((_, i) => i !== index),
    });
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
  
    try {
      // Function to upload images to Cloudinary and collect URLs
      const uploadImagesToCloudinary = async () => {
        const uploadedImageUrls = [];
  
        for (const file of imageFiles) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
          const customImageName = `${carDetails.brand}-${carDetails.model}-${Date.now()}`;
          formData.append('public_id', customImageName);
  
          try {
            const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
            const imageLink = response.data.secure_url;
            uploadedImageUrls.push(imageLink);
          } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Image upload failed');
          }
        }
  
        return uploadedImageUrls;
      };
  
      // Invoke the Cloudinary image upload function and get URLs
      const uploadedImageUrls = await uploadImagesToCloudinary();

      console.log(carDetails.features);
  
      // Temporarily update carDetails and log the result
// Temporarily update carDetails and log the result
const updatedCarDetails = {
  ...carDetails,
  images: [...carDetails.images, ...uploadedImageUrls],
  features: selectedFeatures.map(feature => {
    const matchedFeature = featureIcons.find(f => f.label === feature.label);
    return {
      label: feature.label,
      iconName: matchedFeature ? matchedFeature.icon.name : 'Unknown Icon' // This adds the icon name
    };
  }),
};


      // console.log(updatedCarDetails);
      
  
      // Update state
      setCarDetails(updatedCarDetails);
  
      // Use a short delay to ensure state is updated (if needed)
      await new Promise(resolve => setTimeout(resolve, 100));
  
      // Prepare carData for submission
      const carData = {
        uniqueId: "1569a6bb-8b4b-43d1-92b6-e46767588bd3", // Assuming uniqueId is available from some state or context
        car: updatedCarDetails // Use updatedCarDetails here
      };
  
      // Log carData to verify its content
  
      // Ensure images are included before submitting
      if (carData.car.images && carData.car.images.length > 0) {
        try {
          const response = await axios.post('http://localhost:3001/cars', carData);
          // const response = await axios.post('https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/cars', carData);
          setCarDetails({
            carId: uuidv4(),
            brand: '',
            model: '',
            year: '',
            price: '',
            kmDriven: '',
            paragraph:'',
            fuelType: '',
            transmission: '',
            condition: '',
            location: '',
            images: [],
            features: [],
            technicalSpecifications: defaultTechnicalSpecifications,
          });
          setImageFiles([]);
          setImagePreviews([]);
          showSnackbar('Car details submitted successfully!');
        } catch (error) {
          showSnackbar('Failed to submit car details. Please try again.', 'error');
          console.error('Error submitting form:', error);
        }
      } else {
        console.error('No images found to submit.');
      }
  
    } catch (error) {
      showSnackbar('Failed to submit car details. Please try again.', 'error');
      console.error('Error uploading images to Cloudinary or submitting form:', error);
    } finally {
      setLoading(false); // Stop loading in both success and failure cases
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

    console.log(uniqueFeatures);

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
      {loading && (
        <div className="loader-overlay">
          <div className="loading-spinner-container">
            <img src="/video/car-loader.gif" alt="car-loader" className="car-loader"/>
            <h1>Loading.....Please wait!!</h1>
          </div>
        </div>
      )}
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
          <div className="form-group">
            <label><FaExclamationCircle /> Description:</label>
            <textarea className="description-textarea" type="text" name="paragraph" value={carDetails.paragraph} onChange={handleInputChange} required />
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
          {/* <button style={{marginTop: '10px', marginBottom: '10px', marginRight: '10px', width:'200px', marginLeft: '10px', height: '40px', borderRadius: '5px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'}} onClick={uploadImagesToCloudinary}>Submit Image</button> */}

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
      <button type="button" onClick={handleAddSpecification} className="add-specification-button">
        <MdAdd size={20} /> Add More
      </button>
    </div>
        </div>

        <button className='add-car-button' type="submit">Submit</button>
      </form>
      <Snackbar
       open={snackbarOpen}
        autoHideDuration={6000}
         onClose={handleSnackbarClose}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
    
  );
};

export default CarForm;
