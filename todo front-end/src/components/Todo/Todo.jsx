import "./Todo.css";
import { MdDone } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

function Todo({todo,index}) {

  // assign random color to Todo
  const colors = ["#10b1fe" , "#ce9887","#f9c859" , "#ff78f8","#9f7efe","#3691ff" , "#ff936a", "#7a82da"];

  function assignColor() { // choose random color function
    let availableColors = colors.length;
    let currentColor = index % availableColors;
    return {"backgroundColor" : colors[currentColor]};

  }

  return (
    <div style={assignColor()} className="todo-item">{ /* assign different color */}
      <h1 className="todo-item--title">{todo.title}</h1>
      <div className="todo-item--icon">
        <div className="todo-item--icon---finished"><MdDone /></div>
        <div className="todo-item--icon---delete"><RiDeleteBin6Fill /></div> 
      </div>
    </div>
  )
}

export default Todo