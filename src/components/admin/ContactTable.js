import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';
import Select from 'react-select';

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
  const contactsPerPage = 10;

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (selectedOption, contactId) => {
    // Update the status of the contact in the state
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId ? { ...contact, status: selectedOption } : contact
      )
    );
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber.includes(searchTerm)
  );
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  const options = [
    { value: 'contact', label: 'Contact' },
    { value: 'ended', label: 'Ended' },
    { value: 'purchased', label: 'Purchased' },
    { value: 'in_touch', label: 'In Touch' },
  ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <PageWrapper>
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
            <TableHeader>Phone Number</TableHeader>
            <TableHeader>Status</TableHeader>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>
                <SelectWrapper>
                  <Select
                    options={options}
                    value={contact.status}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, contact.id)}
                  />
                </SelectWrapper>
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
