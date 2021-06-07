import React, {useState, useEffect} from 'react';
import './App.css';
//Importing components
import Form from './components/Form';
import TodoList from './components/TodoList';



function App() {


  //state stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.flter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.flter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }



  //save local
  const saveLocalTodos = () => {
    if (localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  //run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  //use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  return (
    <div className="App">
      <header>
        <h1> George's To-Do list!</h1>
        <Form 
          inputText={inputText} 
          todos={todos} 
          setTodos={setTodos} 
          setInputText={setInputText}  
          setStatus={setStatus}
          
        />
        <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
      </header>
    </div>
  );
}

export default App;
