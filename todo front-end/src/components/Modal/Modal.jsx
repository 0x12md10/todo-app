import "./Modal.css"

function Modal({children , isOpen , onRequestClose}) {

    if(!isOpen) return null;
  
    return (
    <div onClick={onRequestClose} className="modal-background">
        <div className="modal">
            {children}
        </div>
    </div>
  )
}

export default Modal