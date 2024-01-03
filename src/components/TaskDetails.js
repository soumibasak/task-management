// TaskDetails.js
import React from 'react';
import PropTypes from 'prop-types';
import './TaskDetails.css';
const TaskDetails = ({ task }) => {
  return (
    <div>
      <h2>Task Details</h2>
      <p><label>Title: </label> {task.title}</p>
      <p><label>Description: </label> {task.description}</p>
      <p><label>Status:</label> {task.status}</p>
    </div>
  );
};

TaskDetails.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskDetails;
