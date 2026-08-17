import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://todo-dashboard-zjld.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Don't have an account? <Link to="/register" style={{ color: '#007bff' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

// Inline CSS styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '24px',
  width: '320px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const inputGroupStyle = {
  marginBottom: '12px',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '8px',
  marginTop: '4px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#efefef',
  border: '1px solid #999',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default Login;