// src/components/EditTaskModal.jsx
import React, { useState, useEffect } from 'react';
import './AddTaskModal.css'; // reuse styles

const EditTaskModal = ({ isOpen, onClose, onUpdate, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setDueDate(task.dueDate?.slice(0, 10));
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    onUpdate(task._id, { title, description, dueDate });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
