// Task.js
import React, { useContext, useState } from 'react';
import { TaskContext } from './TaskContext';
import EditTaskForm from './EditTaskForm';
import TaskDetails from './TaskDetails';
import './Task.css';

const Task = ({ task }) => {
  const { tasks, setTasks, updateTask } = useContext(TaskContext);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleRemove = () => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    setShowDetails(false);
  };

  const handleEdit = (formData) => {
    updateTask(task.id, formData);
    setShowDetails(false);
    setIsEditing(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowDetails(true);
  };

  return (
    <div className="task">
      <div className="task-list">
                <li>
                    <p className="task-title">{task.title}</p>
                    <p><span style={{ color: "black" }}>Status: </span>{task.status}</p>
                </li>
                <button className="task-button" onClick={toggleDetails}>Details</button>
                <button className="task-button" onClick={handleRemove} style={{ backgroundColor: "red" }}>Remove</button>
            </div>

      {showDetails && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleDetails}>
              &times;
            </span>
            {isEditing ? (
              <EditTaskForm task={task} onEdit={handleEdit} onClose={toggleDetails} />
            ) : (
              <div>
                <TaskDetails task={task} />
                <div className="button-container">
                  <button onClick={handleEditClick}>Edit</button>
                  <button onClick={handleRemove}>Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
