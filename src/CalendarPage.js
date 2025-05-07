// src/CalendarPage.js
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

function CalendarPage({ user }) {
  const [date, setDate] = useState(new Date());
  const [googleEvents, setGoogleEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', duration: '', deadline: '' });

  useEffect(() => {
    const loadGapiClient = async () => {
      if (window.gapi && user?.token) {
        window.gapi.load('client', async () => {
          await window.gapi.client.init({
            apiKey: '',
            clientId: '698528159487-f7qdofmhtced8m1f9gn581cq9hie1kp0.apps.googleusercontent.com',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: SCOPES,
          });

          window.gapi.client.setToken({ access_token: user.token });

          const res = await window.gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 20,
            orderBy: 'startTime',
          });

          setGoogleEvents(res.result.items || []);
        });
      }
    };

    loadGapiClient();
  }, [user]);

  const getTasksForDate = (selectedDate) =>
    tasks.filter(task => new Date(task.scheduledDate).toDateString() === selectedDate.toDateString());

  const handleDateChange = (newDate) => setDate(newDate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const scheduleTask = () => {
    const deadline = new Date(newTask.deadline);
    const now = new Date();
    let current = new Date(now);

    while (current <= deadline) {
      const isBusy = googleEvents.some(event => {
        const start = new Date(event.start.dateTime || event.start.date);
        const end = new Date(event.end.dateTime || event.end.date);
        return current >= start && current < end;
      });

      const alreadyScheduled = tasks.some(task => {
        const scheduledTime = new Date(task.scheduledDate);
        return current.toISOString() === scheduledTime.toISOString();
      });

      if (!isBusy && !alreadyScheduled) {
        const scheduledTask = {
          task: newTask.name,
          duration: parseInt(newTask.duration),
          scheduledDate: new Date(current),
        };

        setTasks(prev => [...prev, scheduledTask]);
        alert(`Task "${newTask.name}" scheduled on ${current.toLocaleString()}`);
        return;
      }

      current.setMinutes(current.getMinutes() + 30); // Try next 30-minute slot
    }

    alert('No available time slot before deadline.');
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>📅 Calendar</h1>

      <Calendar onChange={handleDateChange} value={date} />

      <h2>📌 Tasks for {date.toDateString()}</h2>
      <ul>
        {getTasksForDate(date).map((t, i) => (
          <li key={i}>📝 {t.task} at {new Date(t.scheduledDate).toLocaleTimeString()}</li>
        ))}
      </ul>

      <h2>📤 Add Task</h2>
      <input
        type="text"
        name="name"
        placeholder="Task Name"
        value={newTask.name}
        onChange={handleInputChange}
        style={{ margin: '5px' }}
      />
      <input
        type="number"
        name="duration"
        placeholder="Duration (min)"
        value={newTask.duration}
        onChange={handleInputChange}
        style={{ margin: '5px' }}
      />
      <input
        type="datetime-local"
        name="deadline"
        value={newTask.deadline}
        onChange={handleInputChange}
        style={{ margin: '5px' }}
      />
      <button onClick={scheduleTask} style={{ margin: '10px', padding: '5px 15px' }}>Auto-Schedule</button>

      <h2>📆 Google Calendar Events</h2>
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
