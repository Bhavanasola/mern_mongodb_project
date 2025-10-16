import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormRow from './components/FormRow';
import SubmitButton from './components/SubmitButton';
import './EditUser.css';


function EditUser() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        alert('Error fetching users');
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const saveUser = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/users', editingUser);
      alert('User updated successfully');
      window.location.reload(); // reload user list
    } catch (err) {
      console.error(err);
      alert('Error updating user');
    }
  };

  const startEdit = (user) => {
    setEditingUser(user);
  };

  return (
    <div className="table-container">
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.description}</td>
              <td>
                <button onClick={() => startEdit(u)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <FormRow label="Name" name="name" value={editingUser.name} onChange={handleChange} />
          <FormRow label="Email" name="email" value={editingUser.email} onChange={handleChange} disabled />
          <FormRow label="Description" name="description" value={editingUser.description} onChange={handleChange} />
          <SubmitButton onClick={saveUser} />
        </div>
      )}

      <button onClick={() => navigate('/')}>Add New User</button>
    </div>
  );
}

export default EditUser;
