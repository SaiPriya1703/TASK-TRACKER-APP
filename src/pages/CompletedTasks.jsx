// src/pages/CompletedTasks.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import './Dashboard.css';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchCompletedTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const completed = res.data.filter(task => task.status === 'completed');
      setTasks(completed);
    } catch (err) {
      console.error('❌ Error fetching completed tasks:', err);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">📋 Tracker</h2>
        <nav>
          <ul>
            <li><a href="/dashboard">🏠 Dashboard</a></li>
            <li><a href="/reminders">📅 Reminders</a></li>
            <li><a href="/completed">✅ Completed</a></li>
          </ul>
        </nav>
        <div className="logout-section">
          <button className="logout-btn" onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>✅ Completed Tasks</h1>
        </header>

        <section className="tasks-section">
          {tasks.length === 0 ? (
            <p>No completed tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                isCompletedPage={true} // Optional prop to disable Edit/Delete if needed
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default CompletedTasks;
