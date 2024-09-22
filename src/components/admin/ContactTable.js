import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';
import Select from 'react-select';
import { FaTrash } from 'react-icons/fa';

// Styled Components
const PageWrapper = styled.div`
  padding: 20px;
  background: #f8f9fa;
  max-width: 1200px;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background: #007bff;
  color: #fff;
  padding: 12px;
  text-align: left;
  font-size: 16px;
  border-bottom: 2px solid #0056b3;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

const TableRow = styled.tr`
  &:hover {
    background: #f1f1f1;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

const SelectWrapper = styled.div`
  margin: 10px 0;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const contactsPerPage = 10;

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/carsBooked/bookings');

      // const response = await axios.get('https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/contacts');
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Failed to fetch contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = async (selectedOption, contactId) => {

    // Make an API call to update the status
    try {
      await axios.put(`https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/carsBooked/bookings/${contactId}`, {
        status: selectedOption.value,
      });
      fetchContacts();
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(`https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/carsBooked/bookings/${contactId}`);
      fetchContacts();
      console.log('Contact deleted successfully');
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };

 

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber.includes(searchTerm)
  );
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  const options = [
    {value:'pending', label:'pending'},
    { value: 'ended', label: 'Ended' },
    { value: 'purchased', label: 'Purchased' },
    { value: 'in_touch', label: 'In Touch' },
  ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function extractDate(dateString) {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date)) {
        return 'Invalid date';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

  return (
    <PageWrapper>
    {loading && (
        <div className="loader-overlay">
          <div className="loading-spinner-container">
            <img src="/video/car-loader.gif" alt="car-loader" className="car-loader"/>
            <h1>Loading.....Please wait!!</h1>
          </div>
        </div>
      )}
      <SearchInput
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Car Name</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Phone Number</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Delete</TableHeader>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.username}</TableCell>
              <TableCell>{contact.carName}</TableCell>
              <TableCell>{extractDate(contact.createdAt)}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>
                <SelectWrapper>
                  <Select
                    options={options}
                    value={options.find(option => option.value === contact.status)}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, contact.carId)}
                  />
                </SelectWrapper>
              </TableCell>
              <TableCell>
                <FaTrash 
                  style={{ cursor: 'pointer', color: 'red' }} 
                  onClick={() => handleDelete(contact.carId)} 
                />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <PageButton
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
        <PageButton
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastContact >= filteredContacts.length}
        >
          Next
        </PageButton>
      </Pagination>
    </PageWrapper>
  );
};

export default ContactTable;
