// CarTable.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

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

const CarTable = ({ carData, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

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
                  <ActionButton>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton delete onClick={() => handleDelete(index)}>
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
    </div>
  );
};

export default CarTable;
