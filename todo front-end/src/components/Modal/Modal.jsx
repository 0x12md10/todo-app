import "./Modal.css"

function Modal({children , isOpen , onRequestClose}) {
    //gets isopen , toClose function as props and also children to render
    if(!isOpen) return null; //only show when modal state is true. which is in App.JSX
  
    return (
    <div onClick={onRequestClose} className="modal-background">
        <div className="modal">
            {children}
        </div>
    </div>
  )
}

export default Modal