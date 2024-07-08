
import { useEffect } from "react";

import Todo from "../Todo/Todo"

function Todos({todos,loading, fetchTodos}) {




 

    return (
        <div className="todos-container">
            {
                (loading && !todos) && <p>Loading...</p>
            }
            {
                (!loading && todos.length === 0) && <p>No todos found, please add one.</p> 
            }
            {
               todos && todos.map((todo,index)=> {
                    return <Todo key={index} todo={todo} index={index} />
                })
            }
        </div>
    )
}

export default Todos