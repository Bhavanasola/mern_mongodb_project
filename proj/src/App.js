import React, { useState, useEffect } from 'react';
import FormRow from './components/FormRow';
import SubmitButton from './components/SubmitButton';
import EditButton from './components/EditButton';
import './App.css';

function App() {
  const [user, setUser] = useState({ name: '', email: '', description: '' });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.name || !nameRegex.test(user.name)) {
      alert('Name must be at least 3 letters and contain only alphabets');
      return false;
    }

    if (!user.email || !emailRegex.test(user.email)) {
      alert('Enter a valid email address');
      return false;
    }

    if (user.description.length > 100) {
      alert('Description cannot exceed 100 characters');
      return false;
    }

    return true;
  };

  const saveUser = () => {
    if (!validateInput()) return;

    let updatedUsers = [...users];
    const existingIndex = updatedUsers.findIndex(u => u.email === user.email);

    if (existingIndex !== -1) {
      updatedUsers[existingIndex] = user;
    } else {
      updatedUsers.push(user);
    }

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser({ name: '', email: '', description: '' });
  };

  return (
    <div className="form-container">
      <h2>User Information</h2>

      <FormRow label="Name" name="name" value={user.name} onChange={handleChange} placeholder="Enter name" />
      <FormRow label="Email" name="email" value={user.email} onChange={handleChange} placeholder="Enter email" />
      <FormRow label="Description" name="description" value={user.description} onChange={handleChange} placeholder="Enter description" />

      <SubmitButton onClick={saveUser} />
      <EditButton onClick={() => alert('Click the Edit button beside a user to modify')} />
    </div>
  );
}

export default App;
