// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="698528159487-f7qdofmhtced8m1f9gn581cq9hie1kp0.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
