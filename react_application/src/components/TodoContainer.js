// TodoContainer.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Todo from './Todo';
import '../styles/Create.css';

function TodoContainer({ todos, handleDeleteTodo, handleToggleComplete }) {
    return (
      <Droppable droppableId="todos">
        {(provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? 'dragging-over' : ''}`} {...provided.droppableProps} ref={provided.innerRef}>
            {todos.length === 0 ? (
              <div>The todo list is empty.</div>
            ) : (
              todos.map((todo, index) => (
                <Todo key={todo.id} todo={todo} index={index} handleDeleteTodo={handleDeleteTodo} handleToggleComplete={handleToggleComplete} />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  );
}

export default TodoContainer;