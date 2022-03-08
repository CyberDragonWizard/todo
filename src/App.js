import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const firstRender = useRef(true);

  const addTodo = (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') return;

    setTodos([...todos, {
      text: inputValue,
      id: uuidv4()
    }]);

    setInputValue('');
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  useEffect(() => {
    console.log('true')
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      localStorage.setItem('Todo', JSON.stringify([...todos]));
      console.log('Not first page load.')
    }
  }, [todos]);

  useEffect(() => {
    if (localStorage.getItem('Todo') !== null) {
    const newTodos = localStorage.getItem('Todo');
    setTodos(JSON.parse([...todos, newTodos]))
    }

  }, [])

  return (
    <div className="App">
       <div className='container'>
          <form onSubmit={addTodo}>
            <input 
            autoFocus
            type='text'
            placeholder='Add a todo...'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            />
            <button type='submit'>Add</button>
          </form>
          {todos.map(todo => (
            <div key={todo.id} className='todo'>
              <p>{todo.text}</p>
              <i onClick={() => removeTodo(todo.id)} className="fa-solid fa-trash-can"></i>
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;
