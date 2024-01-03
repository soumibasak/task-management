// TaskContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  tasks: [],
  taskIdCounter: 1,
};

const TaskContext = createContext(initialState);

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ADD_TASK':
      const newTask = { ...action.payload, id: state.taskIdCounter };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        taskIdCounter: state.taskIdCounter + 1,
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload.formData } : task
        ),
      };
    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/posts');
      console.log(response,"here")
      dispatch({ type: 'SET_TASKS', payload: response.data.posts });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:8080/posts', task);
      dispatch({ type: 'ADD_TASK', payload: response.data.posts });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/posts/${taskId}`);
      dispatch({ type: 'REMOVE_TASK', payload: taskId });
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const updateTask = async (taskId, formData) => {
    try {
      const response = await axios.put(`http://localhost:8080/posts/${taskId}`, formData);
      dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, formData: response.data.posts } });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, addTask, removeTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
