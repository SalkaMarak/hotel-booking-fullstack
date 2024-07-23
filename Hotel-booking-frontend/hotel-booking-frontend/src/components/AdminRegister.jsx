import React, { useState } from 'react';
import axios from 'axios';

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAdmin = { name, email, password };
    try {
      const response = await axios.post('http://localhost:8080/api/admin/register', newAdmin);
      if (response.status === 200) {
        alert('Admin registered successfully');
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      alert('Registration failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
