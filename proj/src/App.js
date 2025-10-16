import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormRow from './components/FormRow';
import SubmitButton from './components/SubmitButton';
import './App.css';

function App() {
  const [user, setUser] = useState({ name: '', email: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.name || !nameRegex.test(user.name)) {
      alert('Name must be at least 3 letters and alphabets only');
      return false;
    }
    if (!user.email || !emailRegex.test(user.email)) {
      alert('Enter a valid email');
      return false;
    }
    if (user.description.length > 100) {
      alert('Description cannot exceed 100 characters');
      return false;
    }
    return true;
  };

  const saveUser = async () => {
    if (!validateInput()) return;

    try {
      await axios.post('http://127.0.0.1:5000/users', user);
      setUser({ name: '', email: '', description: '' });
      alert('User saved successfully');
    } catch (err) {
      console.error(err);
      alert('Error saving user');
    }
  };

  return (
    <div className="form-container">
      <h2>Add User</h2>
      <FormRow label="Name" name="name" value={user.name} onChange={handleChange} placeholder="Enter name" />
      <FormRow label="Email" name="email" value={user.email} onChange={handleChange} placeholder="Enter email" />
      <FormRow label="Description" name="description" value={user.description} onChange={handleChange} placeholder="Enter description" />
      <SubmitButton onClick={saveUser} />
      <button onClick={() => navigate('/users')}>View Users</button>
    </div>
  );
}

export default App;
