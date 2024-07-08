import { memo, useEffect, useState } from "react";
import "./Header.css";

const Header = memo(() => {

  const [isFirstRender , setIsFirstRender] = useState(true);

  useEffect(()=> {
    setTimeout(()=> {
      setIsFirstRender(false);
    },3000);
  
  },[])

  return (
    <div className={`header ${isFirstRender ? "tracking-in-contract-bck shadow-drop-center" : "" }`}>
        Todo App
    </div>
  )
})



export default Header