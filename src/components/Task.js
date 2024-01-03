import React, { useContext, useState } from 'react';
import { TaskContext } from './TaskContext';
import EditTaskForm from './EditTaskForm';
import TaskDetails from './TaskDetails';
import './Task.css';

const Task = ({ task }) => {
  const {removeTask, updateTask, fetchData } = useContext(TaskContext);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleRemove = async () => {
    await removeTask(task.id);
    fetchData();
    setShowDetails(false);
  };

  const handleEdit = async (formData) => {
    await updateTask(task.id, formData);
    fetchData();
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
        <li onClick={toggleDetails}>
          <div style={{height: "30px"}}>
          <p className="task-title">{task.title}</p>
          </div>
          <p><span style={{ color: "black" }}>Status: </span>{task.status}</p>
        <button className="task-button" onClick={handleRemove} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
        </li>
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
                <div>
                  <button onClick={handleEditClick} className="task-button">Edit</button>
                  <button onClick={handleRemove} className="task-button" style={{ backgroundColor: "red", color: "white" }}>Delete</button>
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
