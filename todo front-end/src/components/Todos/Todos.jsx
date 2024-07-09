import { useEffect, useState } from "react"
import Todo from "../Todo/Todo"
import "./Todos.css"

function Todos({todos,loading, fetchTodos}) {

    // when no todos and loading show loading
    // when not loading and no todos show "No todos found"

    const [className,setClassName] = useState("todos-container");

    useEffect(()=> {
        setClassName("todos-container bounce-in-fwd ");
        setTimeout(()=> {
            setClassName("todos-container")
        },1000)
    },[todos])
    
    return (
        <div className={className}>
            {
                (loading && !todos) && <p>Loading...</p>
            }
            {
                (!loading && todos.length === 0) && <p>No todos found, please add one.</p> 
            }
            {
               todos && todos.map((todo,index)=> {
                    return <Todo key={index} todo={todo} index={index} fetchTodos={fetchTodos} />
                })
            }
        </div>
    )
}

export default Todos