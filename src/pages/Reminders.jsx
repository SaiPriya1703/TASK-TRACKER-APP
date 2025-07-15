import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import './Dashboard.css';

const Reminders = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  const fetchReminders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const today = new Date().toISOString().split('T')[0];
      const filtered = res.data.filter(task => {
        const due = new Date(task.dueDate).toISOString().split('T')[0];
        return task.status === 'pending' && due <= today;
      });

      setTasks(filtered);
    } catch (err) {
      console.error('❌ Error fetching reminders:', err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReminders();
  };

  const markAsCompleted = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      status: 'completed',
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReminders();
  };

  const handleEdit = (task) => {
    alert(`Edit clicked for: ${task.title}`);
    // Or trigger modal logic
  };

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
          <h1>📅 Reminders</h1>
        </header>

        <section className="tasks-section">
          {tasks.length === 0 ? (
            <p>No reminders due today or overdue.</p>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={() => handleDelete(task._id)}
                onComplete={() => markAsCompleted(task._id)}
                onEdit={() => handleEdit(task._id)}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Reminders;
