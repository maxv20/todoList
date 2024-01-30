// Todo.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaTrash } from 'react-icons/fa';
import '../styles/Create.css'; // Import the CSS file

function Todo({ todo, index, handleDeleteTodo }) {
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
            {todo.name}
            <FaTrash className="trashcan" onClick={() => handleDeleteTodo(todo.id)} />
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Todo;