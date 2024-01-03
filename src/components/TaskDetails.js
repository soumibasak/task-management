// TaskDetails.js
import React from 'react';
import PropTypes from 'prop-types';

const TaskDetails = ({ task }) => {
  return (
    <div>
      <h2>Task Details</h2>
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
    </div>
  );
};

TaskDetails.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskDetails;
