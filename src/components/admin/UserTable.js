import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import axios from 'axios'; 

// Dummy user data
const dummyUsers = [
  { id: 1, name: 'John Doe', password: 'password123', createdAt: '2024-01-15' },
  { id: 2, name: 'Jane Smith', password: 'password456', createdAt: '2024-02-20' },
  { id: 3, name: 'Michael Brown', password: 'password789', createdAt: '2024-03-10' },
  // Add more users as needed
];

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

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => (props.edit ? '#28a745' : '#dc3545')};
  font-size: 16px;
  margin: 0 5px;
  &:hover {
    opacity: 0.7;
  }
`;

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin: 5px;
  font-size: 16px;
`;

const SaveButton = styled(ModalButton)`
  background: #28a745;
`;

const CancelButton = styled(ModalButton)`
  background: #6c757d;
`;

const DeleteButton = styled(ModalButton)`
  background: #dc3545;
`;

// Modal styles
Modal.setAppElement('#root');

const UserTable = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', password: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        alert('Failed to fetch users. Please try again.');
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, password: user.password });
    setEditModalIsOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteModalIsOpen(true);
  };

  const handleEditModalSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to update user
      await axios.put(`/api/users/${selectedUser.id}`, formData);

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === selectedUser.id
            ? { ...user, ...formData }
            : user
        )
      );
      setEditModalIsOpen(false);
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleDeleteModalConfirm = async () => {
    try {
      // API call to delete user
      await axios.delete(`/api/users/${selectedUser.id}`);

      setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUser.id));
      setDeleteModalIsOpen(false);
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.password.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      <SearchInput
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Password</TableHeader>
            <TableHeader>Date Created</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>
                <ActionButton edit onClick={() => handleEditClick(user)}>
                  <FaEdit />
                </ActionButton>
                <ActionButton onClick={() => handleDeleteClick(user)}>
                  <FaTrashAlt />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Edit User Modal */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        style={{ content: { maxWidth: '500px', margin: 'auto' } }}
      >
        <ModalTitle>Edit User</ModalTitle>
        <UserForm onSubmit={handleEditModalSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleFormChange}
            required
          />
          <SaveButton type="submit">Save Changes</SaveButton>
        </UserForm>
      </Modal>

      {/* Delete User Confirmation Modal */}
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        style={{ content: { maxWidth: '400px', margin: 'auto' } }}
      >
        <ModalTitle>Delete User</ModalTitle>
        <p>Are you sure you want to delete {selectedUser?.name}?</p>
        <DeleteButton onClick={handleDeleteModalConfirm}>
          Delete
        </DeleteButton>
        <CancelButton onClick={() => setDeleteModalIsOpen(false)}>
          Cancel
        </CancelButton>
      </Modal>
    </PageWrapper>
  );
};

export default UserTable;
