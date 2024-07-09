import axios from "axios";
import "./Todo.css";
import { MdDone } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaUndo } from "react-icons/fa";
import { useEffect, useState } from "react";

function Todo({todo,index,fetchTodos}) {

  // assign random color to Todo
  const colors = ["#10b1fe" , "#ce9887","#f9c859" , "#ff78f8","#9f7efe","#3691ff" , "#ff936a", "#7a82da"];

  // todo style state to animate while delete action
  const [currentlyDeleting,setCurrentlyDeleting] = useState("");



// choose random color function
  function assignColor() { 
    let availableColors = colors.length;
    let currentColor = index % availableColors;
    return {"backgroundColor" : colors[currentColor]};

  }

  // delete todo
  async function deleteTodo(e) {
    e.preventDefault();
    await axios.delete(`http://localhost:3000/todo/d/${todo._id}`);
    setCurrentlyDeleting(todo._id);
    setTimeout(()=>fetchTodos(),1500);
  }

  //Mark as complete
  async function markAsComplete(e) {
    e.preventDefault();
    await axios.put(`http://localhost:3000/todo/${todo._id}`);
    fetchTodos()
    
  }

  return (
    <div style={assignColor()} className={currentlyDeleting === todo._id ? "todo-item bounce-out-right" : "todo-item"}>{ /* assign different color */}
      <h1 className={todo.isDone ? "todo-item--title strike-title" : "todo-item--title"}>{todo.title}</h1>
      <div className="todo-item--icon">
        <div onClick={(e)=>markAsComplete(e)} className="todo-item--icon---finished">{todo.isDone ? <FaUndo />:<MdDone /> }</div>
        <div onClick={(e)=>deleteTodo(e)} className="todo-item--icon---delete"><RiDeleteBin6Fill /></div> 
      </div>
    </div>
  )
}

export default Todo