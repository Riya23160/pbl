import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Google OAuth client ID
const clientId = '698528159487-f7qdofmhtced8m1f9gn581cq9hie1kp0.apps.googleusercontent.com'; // Replace with real client ID

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
