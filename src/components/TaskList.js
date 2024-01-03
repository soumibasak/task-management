// TaskList.js
import React, { useContext } from 'react';
import Task from './Task';
import { TaskContext } from './TaskContext';
import './TaskList.css';

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
        
      ) :
        <ul className="posts">
                {tasks.map((task) => <Task key={task.id} task={task} />)}
            </ul>}
    </>
    
  );
};

export default TaskList;
