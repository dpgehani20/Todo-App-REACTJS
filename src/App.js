import React, {useState,useEffect} from "react";
import './App.css';

//importing comp
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

  //state
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filterTodos, setFilterTodos] = useState([]);

  //run once app run start
  useEffect(() => {
    getLocalTodos();
  }, []);

    //use effect
    useEffect(() => {
        //functions
  const filterHandler = () => {
    switch (status){
      case 'completed':
        setFilterTodos(todos.filter(todos => todos.completed === true));
      break;
      case 'uncompleted':
        setFilterTodos(todos.filter(todos => todos.completed === false));
      break;
      default: setFilterTodos(todos);
      break;
    }
  };
      filterHandler();
    }, [todos, status]
    );



  //save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  return (
    <div className="App">
      <header>
      <h1>Gehani's Todo List</h1>
      </header>
      <Form 
      inputText = {inputText}
      todos ={todos} 
      setTodos ={setTodos} 
      setInputText={setInputText}
      setStatus={setStatus}
      />
      <TodoList 
      setTodos={setTodos} 
      todos ={todos}
      filterTodos={filterTodos}
      />
    </div>
  );
}
//(todo) => todo
export default App;
