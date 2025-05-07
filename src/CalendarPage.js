// src/CalendarPage.js
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

function CalendarPage({ user }) {
  const [date, setDate] = useState(new Date());
  const [googleEvents, setGoogleEvents] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadGapiClient = async () => {
      if (window.gapi && user?.token) {
        window.gapi.load('client', async () => {
          await window.gapi.client.init({
            apiKey: '', // Optional (you can leave it empty)
            clientId: 'YOUR_CLIENT_ID', // Replace with your real client ID
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: SCOPES,
          });

          window.gapi.client.setToken({ access_token: user.token });

          // Fetch calendar events here
          const res = await window.gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
          });

          // Set events to state
          setGoogleEvents(res.result.items || []);
        });
      }
    };

    loadGapiClient();
  }, [user]); // The effect will re-run whenever 'user' changes

  const getTasksForDate = (selectedDate) => {
    return tasks.filter((task) => task.date.toDateString() === selectedDate.toDateString());
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>Calendar</h1>

      <Calendar onChange={handleDateChange} value={date} />

      <h2>Tasks for {date.toDateString()}</h2>
      <ul>
        {getTasksForDate(date).map((t, i) => (
          <li key={i}>📝 {t.task}</li>
        ))}
      </ul>

      <h2>Google Calendar Events</h2>
      <ul>
        {googleEvents.map((event, i) => (
          <li key={i}>
            {event.summary} at {new Date(event.start.dateTime || event.start.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarPage;
