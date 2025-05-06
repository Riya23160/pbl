import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [freeStart, setFreeStart] = useState('09:00');
  const [freeEnd, setFreeEnd] = useState('17:00');
  const [schedule, setSchedule] = useState([]);
  const [warning, setWarning] = useState('');

  const addTask = () => {
    if (description && duration && !isNaN(duration)) {
      setTasks([...tasks, { description, duration: parseInt(duration) }]);
      setDescription('');
      setDuration('');
    }
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
    setSchedule([]);
    setWarning('');
  };

  const generateSchedule = () => {
    const totalAvailable =
      getMinutesFromTime(freeEnd) - getMinutesFromTime(freeStart);
    const totalNeeded = tasks.reduce((sum, t) => sum + t.duration, 0);

    if (totalNeeded > totalAvailable) {
      setWarning(
        `⚠️ You only have ${totalAvailable} minutes, but tasks need ${totalNeeded} minutes.`
      );
      setSchedule([]);
      return;
    }

    let currentTime = getMinutesFromTime(freeStart);
    const scheduled = tasks.map((task) => {
      const start = currentTime;
      const end = start + task.duration;
      currentTime = end;

      return {
        ...task,
        start: getTimeFromMinutes(start),
        end: getTimeFromMinutes(end),
      };
    });

    setSchedule(scheduled);
    setWarning('');
  };

  const getMinutesFromTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getTimeFromMinutes = (mins) => {
    const h = Math.floor(mins / 60)
      .toString()
      .padStart(2, '0');
    const m = (mins % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  return (
    <div className="App" style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧠 AI Scheduler</h1>

      {/* Input Section */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ flex: 2, padding: '8px' }}
        />
        <input
          type="number"
          placeholder="Duration (min)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ width: '130px', padding: '8px' }}
        />
        <button onClick={addTask} style={{ padding: '8px 16px' }}>
          Add
        </button>
      </div>

      {/* Free Time Input */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Free from:
          <input
            type="time"
            value={freeStart}
            onChange={(e) => setFreeStart(e.target.value)}
            style={{ marginLeft: '10px', marginRight: '20px' }}
          />
        </label>
        <label>
          to:
          <input
            type="time"
            value={freeEnd}
            onChange={(e) => setFreeEnd(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <button onClick={generateSchedule} style={{ marginLeft: '20px', padding: '6px 14px' }}>
          Generate Schedule
        </button>
      </div>

      {/* Tasks Display */}
      {tasks.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2>Your Tasks</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tasks.map((task, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: '#fafafa',
                }}
              >
                <span>
                  {task.description} – {task.duration} min
                </span>
                <button onClick={() => deleteTask(index)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning */}
      {warning && <div style={{ color: 'red', marginBottom: '20px' }}>{warning}</div>}

      {/* Scheduled Output */}
      {schedule.length > 0 && (
        <div>
          <h2>⏳ Your Timetable</h2>
          {schedule.map((task, idx) => (
            <div
              key={idx}
              style={{
                background: '#e0f7fa',
                border: '1px solid #00acc1',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <strong>{task.start} - {task.end}</strong>: {task.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
