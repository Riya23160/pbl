// GoogleLoginComponent.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // ✅ make sure it's the default import
import { useNavigate } from 'react-router-dom';

function GoogleLoginComponent({ setUser }) {
  const navigate = useNavigate();

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("User decoded:", decoded);
            setUser({ token: credentialResponse.credential, email: decoded.email });
            navigate('/calendar');
          } catch (err) {
            console.error("JWT Decode Error:", err);
            alert("Login failed. Check console.");
          }
        }}
        onError={(error) => {
          console.error("Google Login Error:", error);
          alert("Google Login failed. Check the console for details.");
        }}
      />
    </div>
  );
}

export default GoogleLoginComponent;
