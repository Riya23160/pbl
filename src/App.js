import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Task component
const Task = ({ task, onDelete }) => {
  return (
    <div
      style={{
        background: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <p style={{ margin: '0', fontWeight: 'bold' }}>{task.description}</p>
      <p style={{ margin: '5px 0' }}>{task.start} - {task.end}</p>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          padding: '5px 10px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </div>
  );
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    description: '',
    duration: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addTask = () => {
    if (newTask.description && newTask.duration) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          ...newTask,
          id: Date.now(),
          start: '',
          end: '',
        },
      ]);
      setNewTask({ description: '', duration: '' });
    } else {
      alert('Please fill out both fields.');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const scheduleWithAI = async () => {
    if (tasks.length === 0) {
      alert('Please add some tasks before scheduling.');
      return;
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a smart task scheduler. Given tasks with durations and a 12-hour window (9AM to 9PM), assign each task a suitable time slot. Avoid overlap and try to keep them spaced if possible.',
            },
            {
              role: 'user',
              content: `Tasks: ${JSON.stringify(tasks)}. Start from 9AM to 9PM. Return a schedule in this format: [{description: "...", start: "...", end: "..."}]`,
            },
          ],
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your API key
            'Content-Type': 'application/json',
          },
        }
      );

      const aiSchedule = JSON.parse(response.data.choices[0].message.content);
      setTasks(aiSchedule);
    } catch (error) {
      console.error('AI scheduling failed:', error);
      alert('Failed to schedule with AI.');
    }
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI Scheduler</h1>

      {/* Task Input Area */}
      <div style={{ marginBottom: '20px' }}>
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task description"
          style={{
            width: '100%',
            height: '50px',
            marginBottom: '10px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="number"
          name="duration"
          value={newTask.duration}
          onChange={handleInputChange}
          placeholder="Duration (in minutes)"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <button
        onClick={addTask}
        style={{
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Add Task
      </button>

      {/* Tasks List */}
      <div style={{ marginTop: '30px' }}>
        <h2>Scheduled Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks added yet!</p>
        ) : (
          tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={deleteTask} />
          ))
        )}
      </div>

      {/* AI Schedule Button */}
      <button
        onClick={scheduleWithAI}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Schedule with AI
      </button>

      {/* Footer (Icons) */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          background: '#f5f5f5',
          padding: '10px 0',
          display: 'flex',
          justifyContent: 'space-around',
          borderTop: '1px solid #ccc',
        }}
      >
        <span>🏠 Home</span>
        <span>📅 Schedule</span>
        <span>⚙️ Settings</span>
      </div>
    </div>
  );
}

export default App;
