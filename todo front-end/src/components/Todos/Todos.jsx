
import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "../Todo/Todo"

function Todos() {

    const [todos, setTodos]=useState([]);
    const [loading , setLoading] = useState(false);


    useEffect(()=> {

        async function  fetchTodos() {
            setLoading(loading => !loading)

            const todos =await axios.get("http://localhost:3000/todos");
            console.log(todos.data.todos)
            setTodos(todos.data.todos);
            setLoading(loading => !loading)
        }
        fetchTodos()
    
    },[])

    return (
        <div>
            {
                (loading && !todos) && <p>Loading...</p>
            }
            {
                (!loading && todos.length === 0) && <p>No todos found, please add one.</p> 
            }
            {
               todos && todos.map((todo,index)=> {
                    return <Todo key={index} todo={todo} />
                })
            }
        </div>
    )
}

export default Todos