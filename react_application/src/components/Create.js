// Create.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal';
import { DragDropContext } from 'react-beautiful-dnd';
import TodoContainer from './TodoContainer';
import '../styles/Create.css';
import '../styles/Modal.css';

function Create() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/todoItems')
      .then(response => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleAddTodo = () => {
    setModalIsOpen(false);
    setTimeout(() => {
      setTodos([...todos, { id: uuidv4(), name: input }]);
      setInput('');

      const newTodo = {todoItem: {name: input}};
      axios.post('http://127.0.0.1:8000/api/todoItem/store', newTodo)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }, 400); // Delay the addition of the new todo item
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);

    // If you also want to delete the todo item from the backend:
    axios.delete(`http://127.0.0.1:8000/api/todoItem/${id}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="create-todo">
      <button className="todo-button" onClick={() => setModalIsOpen(true)}>Add Todo</button>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        className="modal-content"
        closeTimeoutMS={300}
      >
        <input className="todo-input" value={input} onChange={e => setInput(e.target.value)} />
        <button className="todo-button" onClick={handleAddTodo}>Add Todo</button>
      </Modal>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="todo-container">
          <TodoContainer todos={todos} handleDeleteTodo={handleDeleteTodo} />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Create;