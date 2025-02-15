import axios from "axios";
import "./CreateTodo.css";
import { useEffect, useState } from "react";

function CreateTodo({fetchTodos}) {

    const [todo , setTodo] = useState({ // new todo state
        title : "",
        description : ""
    });
    
    const [btnStyle , setBtnStyle] = useState("btn danger-btn"); //set btn to red and green based on input
    const [isFirstRender , setIsFirstRender] = useState(true);  //Pop in animation only on first render 

    useEffect(()=> { //Pop in animation only on first render 
        setTimeout(()=> { // give some time to let the animation finish fully.
            setIsFirstRender(false);
        },1000)
    },[])

    function buttonBehaviour(){  //set btn to red and green based on input
        if(todo.title.length === 0 || todo.description.length === 0) {
            setBtnStyle("btn  danger-btn");
        } else {
            setBtnStyle("btn submit-btn");
        }
    }

    function onChangeHandler(e) { //controlled inputs (controller)
        const value = e.target.value;
        const name = e.target.name;
            setTodo((todo)=> {
                return {
                    ...todo,
                    [name] : value
                }
            })
            buttonBehaviour() // check and change btn color after every change.

    }

    // submit to db handler
    async function onClickHandler(e) { 
        e.preventDefault();
        if(todo.title.length !== 0 || todo.description.length !== 0) { // input validator
            setBtnStyle("btn  submit-btn submit-btn-animate");
            setTimeout(()=>setBtnStyle("btn  submit-btn") , 1000);
            await axios.post("http://localhost:3000/todo",
                {
                    title : todo.title,
                    description : todo.description
                }
                )
            fetchTodos() // once posted to db fetch all todos again so list will get updated.
            setTodo({
            title : "",
            description : ""
            })
        } else {
            setBtnStyle("btn  danger-btn danger-btn-animate");
            setTimeout(()=>setBtnStyle("btn  danger-btn") , 1000);
            console.log("no input found");
        }
    }


  return (
    <div className={isFirstRender ? "slide-in-bck-center todo-form" : "todo-form"}> {/* apply animation on mount */}
        <h2 className="form-header">Create a new todo</h2>
        <form >
            <div className="title">
                <input onChange={(e)=> onChangeHandler(e)} type="text" required  maxLength={50} name="title" placeholder="Title"  value = {todo.title}/>
            </div>
            <div className="description">
                <textarea onChange={(e)=> onChangeHandler(e)} name="description" required  maxLength={200} id="description" placeholder="description" value={todo.description}></textarea>
            </div>
            <button className={btnStyle} onClick={(e)=>onClickHandler(e)} >Create</button>
        </form>
    </div>
  )
}

export default CreateTodo