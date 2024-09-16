// CarTable.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import axios from 'axios';

// Styling components remain the same

const ModalContent = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  margin: auto;
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

const CarTable = ({ carData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editCar, setEditCar] = useState(null); // State for the car to edit
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
  const carsPerPage = 10;

  const allCars = Object.values(carData).flatMap(brandCars => brandCars);

  // Filter car data based on search term
  const filteredCars = carData.filter(
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
    // console.log(foundCar);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setEditCar(null);
    setModalIsOpen(false);
  };

  const handleEdit = async () => {
    try {
      // Directly send editCar and uniqueId in the body
      await axios.put(`http://localhost:3001/cars/${editCar.carId}`, {
        uniqueId: "1569a6bb-8b4b-43d1-92b6-e46767588bd3", // Add uniqueId here
        updateData: editCar // Send editCar directly
      });
      closeModal();
      // Optionally, refresh carData or show a success message
    } catch (error) {
      console.error('Error updating car:', error);
      // Handle error
    }
  };

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`http://localhost:3001/cars/${carId}`, {
        data: {
          uniqueId: "1569a6bb-8b4b-43d1-92b6-e46767588bd3" // Include the uniqueId in the body
        }
      });
      // Optionally, refresh carData or show a success message
      // e.g., fetchCars(); to refresh the list of cars
    } catch (error) {
      console.error('Error deleting car:', error);
      // Handle error
    }
  };
  
  

  return (
    <div>
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
                  <ActionButton delete onClick={() => handleDelete(car.carId)}>
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
          <h2>Edit Car Details</h2>
          {editCar && (
            <div>
              <label>Brand:</label>
              <input
                type="text"
                value={editCar.brand}
                onChange={(e) =>
                  setEditCar({ ...editCar, brand: e.target.value })
                }
              />
              <br />
              <label>Model:</label>
              <input
                type="text"
                value={editCar.model}
                onChange={(e) =>
                  setEditCar({ ...editCar, model: e.target.value })
                }
              />
              <br />
              <label>Year:</label>
              <input
                type="text"
                value={editCar.year}
                onChange={(e) =>
                  setEditCar({ ...editCar, year: e.target.value })
                }
              />
              <br />
              <label>Price:</label>
              <input
                type="text"
                value={editCar.price}
                onChange={(e) =>
                  setEditCar({ ...editCar, price: e.target.value })
                }
              />
              <br />
              <label>KM Driven:</label>
              <input
                type="text"
                value={editCar.kmDriven}
                onChange={(e) =>
                  setEditCar({ ...editCar, kmDriven: e.target.value })
                }
              />
              <br />
              <label>Fuel Type:</label>
              <input
                type="text"
                value={editCar.fuelType}
                onChange={(e) =>
                  setEditCar({ ...editCar, fuelType: e.target.value })
                }
              />
              <br />
              <label>Transmission:</label>
              <input
                type="text"
                value={editCar.transmission}
                onChange={(e) =>
                  setEditCar({ ...editCar, transmission: e.target.value })
                }
              />
              <br />
              <label>Condition:</label>
              <input
                type="text"
                value={editCar.condition}
                onChange={(e) =>
                  setEditCar({ ...editCar, condition: e.target.value })
                }
              />
              <br />
              <label>Location:</label>
              <input
                type="text"
                value={editCar.location}
                onChange={(e) =>
                  setEditCar({ ...editCar, location: e.target.value })
                }
              />
              <br />
              <label>Images (comma separated):</label>
              <input
                type="text"
                value={editCar.images.join(', ')}
                onChange={(e) =>
                  setEditCar({ ...editCar, images: e.target.value.split(', ') })
                }
              />
              <br />
              <label>Features (comma separated):</label>
              <input
                type="text"
                value={editCar.features.map(f => f.label).join(', ')}
                onChange={(e) => {
                  const newFeatures = e.target.value.split(', ').map(label => ({
                    label,
                    // You might want to handle icons as well
                    icon: 'FaQuestionCircle', // default icon if needed
                  }));
                  setEditCar({ ...editCar, features: newFeatures });
                }}
              />
              <br />
              <label>Technical Specifications (label: value):</label>
              <input
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
              <br />
              <button onClick={handleEdit}>Save Changes</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CarTable;
