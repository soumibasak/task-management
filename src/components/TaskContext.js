import React, { createContext, useReducer } from 'react';

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

  const setTasks = (tasks) => {
    dispatch({ type: 'SET_TASKS', payload: tasks });
  };

  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const removeTask = (taskId) => {
    dispatch({ type: 'REMOVE_TASK', payload: taskId });
  };

  const updateTask = (taskId, formData) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, formData } });
  };

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, setTasks, addTask, removeTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
