import './App.css'
import CreateTodo from './components/CreateTodo/CreateTodo'
import Todos from './components/Todos/Todos'
import { useEffect, useState } from 'react';
import axios from "axios";
import Header from './components/Header/Header';

function App() {

  const [todos, setTodos]=useState([]);
  const [loading , setLoading] = useState(false);

  async function  fetchTodos() {
    setLoading(loading => !loading)

    const todos =await axios.get("http://localhost:3000/todos");
    setTodos(todos.data.todos);
    setLoading(loading => !loading)
}



  useEffect(()=> {

    fetchTodos()

  },[])


  return (
    <div className='body-wrapper'>

      <Header />

      <div className='main'>
      <CreateTodo fetchTodos={fetchTodos} />
      <div className='separator'></div>
      <Todos todos = {todos} loading={loading}  fetchTodos={fetchTodos} />
      </div>
    </div>
  )
}

export default App
