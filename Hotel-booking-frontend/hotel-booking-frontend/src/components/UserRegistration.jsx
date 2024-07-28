import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/ServiceConfig';

const UserRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password }); 
      if (response.status === 200) {
        alert('Registration successful');
        navigate('/login');
      }
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="form-container d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name"
              className="form-control"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              className="form-control"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password"
              className="form-control"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
