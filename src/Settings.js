// Settings.js
import React from 'react';

function Settings() {
  const handleGoogleLogin = () => {
    alert("Login with Google functionality will go here.");
  };

  const handleGoogleCalendarLink = () => {
    alert("Link Google Calendar functionality will go here.");
  };

  return (
    <div style={settingsContainerStyle}>
      <h1>Settings</h1>

      <div style={buttonContainerStyle}>
        <button onClick={handleGoogleLogin} style={buttonStyle}>Login with Google</button>
      </div>

      <div style={buttonContainerStyle}>
        <button onClick={handleGoogleCalendarLink} style={buttonStyle}>Link to Google Calendar</button>
      </div>
    </div>
  );
}

const settingsContainerStyle = {
  padding: 20,
  textAlign: 'center',
};

const buttonContainerStyle = {
  marginBottom: 20,
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: 16,
  borderRadius: 8,
  background: '#4285F4',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  width: '200px',
};

export default Settings;
