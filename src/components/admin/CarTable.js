import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import axios from 'axios';
import { Snackbar, Alert, TextareaAutosize } from '@mui/material';


const ModalContent = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  margin: auto;
  margin-top: 20px;
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
  color: ${(props) => (props.delete ? 'red' : '#007bff')};
  margin: 0 5px;
  font-size: 18px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? '#007bff' : '#f9f9f9')};
  color: ${(props) => (props.active ? 'white' : '#007bff')};
  border: 1px solid #007bff;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const ModalHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* justify-content: space-between; */
  margin-top: 20px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #c82333;
  }
`;

const ConfirmationModalContent = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  text-align: center;
  /* width: 80%; */
  height: 150px;
  margin-top: 70px;
`;

const ConfirmationText = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
`;


const CarTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editCar, setEditCar] = useState(null); // State for the car to edit
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false); // State for delete confirmation modal
  const [carToDelete, setCarToDelete] = useState(null); // Track car to delete
  const [carData, setCarData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [loading, setLoading] = useState(false)
  const carsPerPage = 10;

    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/all-cars'); // Adjust the API URL as per your backend
        const fetchedCars = response.data.cars || [];
        const allCars = Object.values(fetchedCars).flat();
        setLoading(false);
        setCarData(allCars);
      } catch (error) {
        setLoading(false);
        console.error('Failed to fetch car data', error);
      }
    };

  useEffect(() => {
    fetchCars();
  },[])

  const allCars = Object.values(carData).flatMap(brandCars => brandCars);

  // Filter car data based on search term
  const filteredCars = allCars.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm) ||
      car.price.toString().includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (carEditId) => {
    const foundCar = allCars.find(car => car.carId === carEditId);
    setEditCar(foundCar);
    setModalIsOpen(true);
  };

    const openDeleteModal = (carId) => {
    const foundCar = allCars.find(car => car.carId === carId);
    setCarToDelete(foundCar);
    setDeleteModalIsOpen(true);
  };

  const closeModal = () => {
    setEditCar(null);
    setModalIsOpen(false);
  };

  const handleEdit = async () => {
    try {
      // Directly send editCar and uniqueId in the body
      await axios.put(`https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/cars/${editCar.carId}`, {
        uniqueId: "1569a6bb-8b4b-43d1-92b6-e46767588bd3", // Add uniqueId here
        updateData: editCar // Send editCar directly
      });
      closeModal();
      fetchCars();
      showSnackbar('Car details updated successfully', 'success'); 
    } catch (error) {
      console.error('Error updating car:', error);
      showSnackbar('Failed to update car details', 'error'); 
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/cars/${carToDelete.carId}`, {
        data: {
          uniqueId: "1569a6bb-8b4b-43d1-92b6-e46767588bd3" // Include the uniqueId in the body
        }
      });
      setDeleteModalIsOpen(false);
      fetchCars();
      showSnackbar('Car deleted successfully', 'success'); 
    } catch (error) {
      showSnackbar('Failed to delete car', 'error');
      console.error('Error deleting car:', error);
    }
  };

    const closeDeleteModal = () => {
    setCarToDelete(null);
    setDeleteModalIsOpen(false);
  };
  
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  
  // Function to close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
    {loading && (
        <div className="loader-overlay">
          <div className="loading-spinner-container">
            <img src="/video/car-loader.gif" alt="car-loader" className="car-loader"/>
            <h1>Loading.....Please wait!!</h1>
          </div>
        </div>
      )}
      <h2>Car List</h2>
      <SearchInput
        type="text"
        placeholder="Search by brand, model, year, or price..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
          {currentCars.length > 0 ? (
            currentCars.map((car, index) => (
              <TableRow key={index}>
                <TableData>{car.brand}</TableData>
                <TableData>{car.model}</TableData>
                <TableData>{car.year}</TableData>
                <TableData>{car.price}</TableData>
                <TableData>
                  <ActionButton onClick={() => openModal(car.carId)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton delete onClick={() => openDeleteModal(car.carId)}>
                    <FaTrashAlt />
                  </ActionButton>
                </TableData>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableData colSpan="5" style={{ textAlign: 'center' }}>
                No cars found.
              </TableData>
            </TableRow>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index}
              onClick={() => paginate(index + 1)}
              active={index + 1 === currentPage}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      )}

      {/* Edit Car Modal */}
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Car Modal"
      ariaHideApp={false}
    >
  <ModalContent>
    <ModalHeader>Edit Car Details</ModalHeader>
    {editCar && (
      <ModalForm>
        <Label>Brand:</Label>
        <Input
          type="text"
          value={editCar.brand}
          onChange={(e) =>
            setEditCar({ ...editCar, brand: e.target.value })
          }
        />

        <Label>Model:</Label>
        <Input
          type="text"
          value={editCar.model}
          onChange={(e) =>
            setEditCar({ ...editCar, model: e.target.value })
          }
        />

        <Label>Year:</Label>
        <Input
          type="number"
          value={editCar.year}
          onChange={(e) =>
            setEditCar({ ...editCar, year: e.target.value })
          }
        />

        <Label>Price:</Label>
        <Input
          type="number"
          value={editCar.price}
          onChange={(e) =>
            setEditCar({ ...editCar, price: e.target.value })
          }
        />

        <Label>KM Driven:</Label>
        <Input
          type="number"
          value={editCar.kmDriven}
          onChange={(e) =>
            setEditCar({ ...editCar, kmDriven: e.target.value })
          }
        />

        <Label>Description:</Label>
        <TextareaAutosize
          value={editCar.paragraph}
          onChange={(e) =>
            setEditCar({ ...editCar, paragraph: e.target.value })
          }
        />

        <Label>Fuel Type:</Label>
        <Input
          type="text"
          value={editCar.fuelType}
          onChange={(e) =>
            setEditCar({ ...editCar, fuelType: e.target.value })
          }
        />

        <Label>Transmission:</Label>
        <Input
          type="text"
          value={editCar.transmission}
          onChange={(e) =>
            setEditCar({ ...editCar, transmission: e.target.value })
          }
        />

        <Label>Condition:</Label>
        <Input
          type="text"
          value={editCar.condition}
          onChange={(e) =>
            setEditCar({ ...editCar, condition: e.target.value })
          }
        />

        <Label>Location:</Label>
        <Input
          type="text"
          value={editCar.location}
          onChange={(e) =>
            setEditCar({ ...editCar, location: e.target.value })
          }
        />

        <Label>Images (comma separated):</Label>
        <Input
          type="text"
          value={editCar.images.join(', ')}
          onChange={(e) =>
            setEditCar({ ...editCar, images: e.target.value.split(', ') })
          }
        />

        <Label>Features (comma separated):</Label>
        <Input
          type="text"
          value={editCar.features.map(f => f.label).join(', ')}
          onChange={(e) => {
            const newFeatures = e.target.value.split(', ').map(label => ({
              label,
              icon: 'FaQuestionCircle',
            }));
            setEditCar({ ...editCar, features: newFeatures });
          }}
        />

        <Label>Technical Specifications (label: value):</Label>
        <Input
          type="text"
          value={editCar.technicalSpecifications.map(ts => `${ts.label}: ${ts.value}`).join(', ')}
          onChange={(e) => {
            const newSpecs = e.target.value.split(', ').map(spec => {
              const [label, value] = spec.split(': ');
              return { label, value };
            });
            setEditCar({ ...editCar, technicalSpecifications: newSpecs });
          }}
        />

        <ButtonContainer>
          <SaveButton onClick={handleEdit}>Save Changes</SaveButton>
          <CancelButton onClick={closeModal}>Cancel</CancelButton>
        </ButtonContainer>
      </ModalForm>
    )}
  </ModalContent>
</Modal>

    <div style={{ height: '100px', width: '100%',marginTop: '30px' }}>
       <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation Modal"
        ariaHideApp={false}
      >
        <ConfirmationModalContent>
          <ConfirmationText>
            Are you sure you want to delete {carToDelete?.brand} {carToDelete?.model}?
          </ConfirmationText>
          <ButtonContainer>
            <SaveButton onClick={handleDelete}>Yes</SaveButton>
            <CancelButton onClick={closeDeleteModal}>No</CancelButton>
          </ButtonContainer>
        </ConfirmationModalContent>
      </Modal>
    </div>
    <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <Alert onClose={handleCloseSnackbar} sx={{ width: '100%' }} severity={snackbarSeverity}>
    {snackbarMessage}
  </Alert>
</Snackbar>

  </div>
  );
};

export default CarTable;
