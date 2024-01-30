// Todo.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaTrash, FaCheck } from 'react-icons/fa';
import '../styles/Create.css';

function Todo({ todo, index, handleDeleteTodo, handleToggleComplete }) {
  return (
    <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.5 : 1 }}
        >
            <div className={`todo-item ${snapshot.isDragging ? 'dragging' : ''}`}>
            <FaCheck className={`check ${todo.is_done ? 'completed' : ''}`} onClick={() => handleToggleComplete(todo.id)} />
            <span className={`todo-name ${todo.is_done ? 'completed' : ''}`}>{todo.name}</span>
            <FaTrash className="trashcan" onClick={() => handleDeleteTodo(todo.id)} />
            </div>
        </div>
      )}
    </Draggable>
  );
}

export default Todo;