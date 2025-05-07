import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';

function GoogleLoginComponent({ setUser }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={credentialResponse => {
          const decoded = jwtDecode(credentialResponse.credential);
          setUser({ token: credentialResponse.credential, email: decoded.email });
          navigate('/calendar');
        }}
        onError={() => {
          alert('Login Failed');
        }}
      />
    </div>
  );
}

export default GoogleLoginComponent;
