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
      setTodos([...todos, { id: uuidv4(), name: input, is_done: false }]);
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

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.is_done = !todo.is_done;

        const updated_is_done = {todoItem: {is_done: todo.is_done}};
  
        axios.put(`http://127.0.0.1:8000/api/todoItem/${id}`, updated_is_done)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
  
        return todo;
      } 

      return todo;
    }));
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
          <TodoContainer todos={todos} handleDeleteTodo={handleDeleteTodo} handleToggleComplete={handleToggleComplete} />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Create;