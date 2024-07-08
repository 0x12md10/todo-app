import axios from "axios";
import { useEffect, useState } from "react"
import "./CreateTodo.css";

function CreateTodo({fetchTodos}) {

    const [todo , setTodo] = useState({
        title : "",
        description : ""
    });
    
    const [btnStyle , setBtnStyle] = useState("btn danger-btn");
    const [isFirstRender , setIsFirstRender] = useState(true);

    useEffect(()=> {
        setTimeout(()=> {
            setIsFirstRender(false);
        },3000)
    },[])

    function buttonBehaviour(){
        if(todo.title.length === 0 || todo.description.length === 0) {
            setBtnStyle("btn danger-btn");
        } else {
            setBtnStyle("btn submit-btn");
        }
    }

    function onChangeHandler(e) {
        const value = e.target.value;
        const name = e.target.name;
            setTodo((todo)=> {
                return {
                    ...todo,
                    [name] : value
                }
            })
            buttonBehaviour()

    }

    async function onClickHandler() {

        if(todo.title.length !== 0 || todo.description.length !== 0) {
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
        } else {
            console.log("no input found")
        }
    }


  return (
    <div className={isFirstRender ? "bounce-in-bottom todo-form" : "todo-form"}>
    <h2 className="form-header">Create a new todo</h2>
    <form >
        <div className="title">
            <input onChange={(e)=> onChangeHandler(e)} type="text" required name="title" placeholder="Title"  value = {todo.title}/>
        </div>
        <div className="description">
            <textarea onChange={(e)=> onChangeHandler(e)} name="description" required id="description" placeholder="description" value={todo.description}></textarea>
        </div>
        <button className={btnStyle} onClick={onClickHandler} >Create</button>
    </form>
    </div>
  )
}

export default CreateTodo