// src/components/TaskCard.jsx
import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onDelete, onComplete, onEdit, isCompletedPage }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p><strong>Due:</strong> {task.dueDate?.slice(0, 10)}</p>
      <p><strong>Status:</strong> {task.status}</p>

      {!isCompletedPage && (
        <div className="task-actions">
          <button onClick={() => onEdit(task)}>✏️ Edit</button>
          <button onClick={() => onDelete(task._id)}>🗑️ Delete</button>
          {task.status !== 'completed' && (
            <button onClick={() => onComplete(task._id)}>✅ Complete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
