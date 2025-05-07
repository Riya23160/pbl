// Settings.js
import React, { useState } from 'react';
import GoogleLoginComponent from './GoogleLoginComponent';

function Settings() {
  const [user, setUser] = useState(null);

  const handleGoogleCalendarLink = () => {
    if (!user) {
      alert("Please login first.");
      return;
    }
    alert("Google Calendar integration coming soon.");
  };

  return (
    <div style={settingsContainerStyle}>
      <h1>Settings</h1>

      {!user ? (
        <GoogleLoginComponent setUser={setUser} />
      ) : (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={() => setUser(null)} style={buttonStyle}>Logout</button>
        </div>
      )}

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
  marginTop: 30,
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
