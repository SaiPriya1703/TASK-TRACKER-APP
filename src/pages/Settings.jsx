// src/pages/Settings.jsx
import React from 'react';
import './Settings.css';

const Settings = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="settings-page">
      <h2>⚙️ Settings</h2>
      <button onClick={toggleDarkMode}>🌓 Toggle Dark Mode</button>
      <button onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
};

export default Settings;