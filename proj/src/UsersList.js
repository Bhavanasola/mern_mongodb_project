import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function UsersList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching users');
    }
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.description}</td>
              <td>
                <button onClick={() => navigate(`/edit/${u.email}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: '20px' }} onClick={() => navigate('/')}>
        Add New User
      </button>
    </div>
  );
}

export default UsersList;
