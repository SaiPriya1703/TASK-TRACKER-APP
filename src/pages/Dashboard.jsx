// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTaskModal from '../components/AddTaskModal';
import TaskCard from '../components/TaskCard';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);

      const today = new Date().toISOString().slice(0, 10);
      res.data.forEach(task => {
        if (task.status === 'pending') {
          const dueDate = task.dueDate?.slice(0, 10);
          if (dueDate === today) {
            toast.warn(`⏰ Reminder: "${task.title}" is due today!`);
          } else if (dueDate < today) {
            toast.error(`⚠️ Overdue: "${task.title}" was due on ${dueDate}`);
          }
        }
      });
    } catch (err) {
      console.error('❌ Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error('❌ Error deleting task:', err);
    }
  };

  const markAsCompleted = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status: 'completed' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error('❌ Error marking completed:', err);
    }
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true : task.status === filter
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">📋Task Tracker</h2>
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
          <h1>Welcome, {user?.name || 'User'} 👋</h1>
          <button className="add-task-btn" onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}>+ Add Task</button>
        </header>

        <div className="filter-controls">
          <label>Filter: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            
          </select>
        </div>

        <section className="tasks-section">
          {filteredTasks.length === 0 ? (
            <p>No tasks yet. Start by adding one!</p>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onComplete={markAsCompleted}
                onEdit={(task) => {
                  setEditingTask(task);
                  setShowModal(true);
                }}
              />
            ))
          )}
        </section>
      </main>

      <AddTaskModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingTask(null);
        }}
        onSave={fetchTasks}
        task={editingTask}
      />

      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Dashboard;
