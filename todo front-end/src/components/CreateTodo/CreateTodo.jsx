import axios from "axios";
import { useState } from "react"

function CreateTodo({fetchTodos}) {

    const [todo , setTodo] = useState({
        title : "",
        description : ""
    });

    function onChangeHandler(e) {
        const value = e.target.value;
        const name = e.target.name;
            setTodo((todo)=> {
                return {
                    ...todo,
                    [name] : value
                }
            })

    }

    async function onClickHandler() {
        await axios.post("http://localhost:3000/todo",
                                        {
                                            title : todo.title,
                                            description : todo.description
                                        }
                                        )
        fetchTodos()
        setTodo({
            title : "",
            description : ""
        })
    }

  return (
    <div className="todo-form">
    <h2>Create a new todo: </h2>
    <form >
    <div>
            <label htmlFor="title">Title </label><br /><br />
            <input onChange={(e)=> onChangeHandler(e)} type="text" required name="title" placeholder="Title"  value = {todo.title}/>
        </div>
        <div>
            <label htmlFor="description">description </label><br /><br />
            <textarea onChange={(e)=> onChangeHandler(e)} name="description" required id="description" placeholder="description" value={todo.description}></textarea>
        </div>
        <button onClick={onClickHandler} >Create</button>
    </form>
    </div>
  )
}

export default CreateTodo