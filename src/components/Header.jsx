import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or user session
    localStorage.removeItem('token');
    // Redirect to login or home page
    navigate('/');
  };

  return (
    <header>
      <div className="header-left">
        <h1>BMS</h1>
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={() => navigate('/users')}>Users</button>
        <button onClick={() => navigate('/residents')}>Residents</button>
        <button onClick={() => navigate('/barangay-officials')}>Barangay Officials</button>
      </div>
      <div className="header-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
