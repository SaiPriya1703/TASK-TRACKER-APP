// src/components/AddTaskModal.jsx
import React, { useState, useEffect } from 'react';
import './AddTaskModal.css';
import axios from 'axios';

const AddTaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const token = localStorage.getItem('token');

  // Prefill form when editing
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : '');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    try {
      if (task) {
        // ✏️ Update Task
        await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
          title,
          description,
          dueDate,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // ➕ Create Task
        await axios.post('http://localhost:5000/api/tasks', {
          title,
          description,
          dueDate,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSave();
      onClose();
    } catch (err) {
      console.error('❌ Error saving task:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
