import React, { useContext, useState } from 'react';
import useTaskForm from './useTaskForm';
import { TaskContext } from './TaskContext';
import './TaskForm.css';

const TaskForm = () => {
  const { addTask, fetchData } = useContext(TaskContext);
  const [formData, handleChange, resetForm] = useTaskForm({
    title: '',
    description: '',
    status: 'Pending',
  });
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(formData);
    fetchData();
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="task-form-container">
      <header className="header">
        <p>
          <button onClick={handleToggleForm} className="button">New Post</button>
        </p>
      </header>
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleToggleForm}>
              &times;
            </span>
            <form className="form" onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
              <div className="actions" style={{ marginTop: "16px" }}>
                <button type="submit">Save</button>
                <button type="button" onClick={handleToggleForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
