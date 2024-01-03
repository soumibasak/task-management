import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const EditTaskForm = ({ task, onEdit, onClose }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedTask = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    onEdit(editedTask);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" defaultValue={task.title} ref={titleRef} required />
      </label>
      <label>
        Description:
        <textarea defaultValue={task.description} ref={descriptionRef} />
      </label>
      <label>
        Status:
        <select defaultValue={task.status} ref={statusRef}>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

EditTaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditTaskForm;
