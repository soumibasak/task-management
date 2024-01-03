import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
import { TaskProvider } from './components/TaskContext';

function App() {
  return (
    <TaskProvider>
      <main className='App'>
        <h1>Task Management App</h1>
        <TaskForm />
        <TaskList />
      </main>
    </TaskProvider>
  );
}

export default App;
