// src/Home.js
import React, { useState } from 'react';

function Home({ tasks, setTasks }) {
  const [availableTime, setAvailableTime] = useState('');
  const [freeTime, setFreeTime] = useState('');
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = () => {
    if (!availableTime || !freeTime || !task || !deadline) {
      return alert("Please fill all fields.");
    }

    // Add task with deadline
    const newTask = { 
      availableTime, 
      freeTime, 
      task, 
      deadline: new Date(deadline) 
    };
    setTasks([...tasks, newTask]);

    // Reset the form
    setAvailableTime('');
    setFreeTime('');
    setTask('');
    setDeadline('');
  };

  // Sort tasks by deadline (ascending)
  const sortedTasks = [...tasks].sort((a, b) => a.deadline - b.deadline);

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Scheduler</h1>

      <input
        placeholder="When you're free (e.g. 2 PM - 5 PM)"
        value={freeTime}
        onChange={(e) => setFreeTime(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="How long is your work window? (e.g. 1 hour)"
        value={availableTime}
        onChange={(e) => setAvailableTime(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="What task do you want to do?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ ...inputStyle, height: 80 }}
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleSubmit} style={buttonStyle}>Add Task</button>

      <div style={{ marginTop: 30 }}>
        <h2>Tasks</h2>
        {sortedTasks.map((t, index) => (
          <div key={index} style={taskBoxStyle}>
            <strong>{t.task}</strong><br />
            ⏰ {t.freeTime} | Duration: {t.availableTime}<br />
            🗓️ Deadline: {t.deadline.toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: 10,
  margin: '10px 0',
  fontSize: 16,
  borderRadius: 8,
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: 16,
  borderRadius: 8,
  background: '#4caf50',
  color: 'white',
  border: 'none',
  cursor: 'pointer'
};

const taskBoxStyle = {
  background: '#f0f8ff',
  padding: 15,
  borderRadius: 10,
  marginBottom: 10,
  border: '1px solid #ddd'
};

export default Home;
