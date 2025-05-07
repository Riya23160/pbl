// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GoogleLoginComponent from './GoogleLoginComponent';
import CalendarPage from './CalendarPage';
import Settings from './Settings';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GoogleLoginComponent setUser={setUser} />} />
          <Route path="/calendar" element={<CalendarPage user={user} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        <div className="bottom-nav">
          <Link to="/">🏠</Link>
          <Link to="/calendar">📅</Link>
          <Link to="/settings">⚙️</Link>
        </div>
      </div>
    </Router>
  );
}

export default App;