import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/ServiceConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/form.css'

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.status === 200) {
        const user = response.data; 
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login successful');
        navigate(user.role === 'admin' ? '/hotelManagement' : '/hotelList');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Login failed');
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div className="form-container d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <a href="/welcome" style={{textDecoration: "none"}}>Back to home</a>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
