// TodoList.js
import React from 'react';
import Home from './Home'; // Import the Home component
import Create from './Create'; // Import the Create component
import '../styles/TodoList.css';

function TodoList() {
  return (
    <div className="todo-list">
      <Home /> {/* Use the Home component */}
      <Create /> {/* Use the Create component */}
    </div>
  );
}

export default TodoList;