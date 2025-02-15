import "./Todo.css";
import axios from "axios";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { FaUndo } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoInformationCircle } from "react-icons/io5";

function Todo({todo,index,fetchTodos,modalIsOpen,setModalIsOpen}) {

  //For now modalIsOpen and setModalIsOpen is in App.jsx.Will help in future if we blur the background.


  // assign random color to Todo
  const colors = ["#10b1fe" , "#ce9887","#f9c859" , "#ff78f8","#9f7efe","#3691ff" , "#ff936a", "#7a82da"];

  // todo style state to animate while delete action
  const [currentlyDeleting,setCurrentlyDeleting] = useState("");

  //To show modal, set isModalOpen state in the App.jsx to true.
  function openModal(todo) {
    console.log(todo)
    setModalIsOpen(true);

  }

  //To close modal, set isModalOpen state in the App.jsx to false.
  function closeModal() {
    setModalIsOpen(false);
  }
  

// choose random color function
  function assignColor() { 
    let availableColors = colors.length;
    let currentColor = index % availableColors;
    return {"color" : colors[currentColor]};

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
      <>
        <div  className={currentlyDeleting === todo._id ? "todo-item bounce-out-right" : "todo-item"}>
          <h1 style={assignColor()} className={todo.isDone ? "todo-item--title strike-title" : "todo-item--title"}>{todo.title}</h1>{ /* assign different color */}
          <div className="todo-item--icon">
            <div onClick={(e,currentTodoRef)=>openModal(currentTodoRef)} className="todo-item--icon---info"><IoInformationCircle /></div>
            <div onClick={(e)=>markAsComplete(e)} className="todo-item--icon---finished">{todo.isDone ? <FaUndo />:<MdDone /> }</div>
            <div onClick={(e)=>deleteTodo(e)} className="todo-item--icon---delete"><RiDeleteBin6Fill /></div> 
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <button onClick={closeModal} className='modal-btn'>X</button>
        <div className="modal-content">
          <p className="modal-description-title">Description:</p>
          <p className="modal-description">{todo.description}</p>
        </div>
      </Modal>
    </>
  )
}

export default Todo