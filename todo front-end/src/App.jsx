import './App.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import Todos from './components/Todos/Todos';
import Header from './components/Header/Header';
import CreateTodo from './components/CreateTodo/CreateTodo'


function App() {

  const [todos, setTodos]=useState([]); // all todos 
  const [loading , setLoading] = useState(false); // loading state while fetching todos
  const [modalIsOpen , setModalIsOpen] = useState(false); //modal is visible when true



  async function  fetchTodos() { //fetch all todos
    setLoading(loading => !loading)

    const todos =await axios.get("http://localhost:3000/todos");
    setTodos(todos.data.todos);
    setLoading(loading => !loading)
}




// fetch on intial mount
  useEffect(()=> {

    fetchTodos()

  },[])


  return (
  
    <div className='body-wrapper'> {/* app wrapper */}
      <Header />
      <div className='main'>
        <CreateTodo fetchTodos={fetchTodos} /> {/* form*/}
        <div className='separator'></div> {/*separator line*/}
        <Todos todos = {todos} loading={loading}  fetchTodos={fetchTodos} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/> {/* list todos*/}
      </div>
     
</div>


  )
}

export default App
