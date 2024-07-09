import "./Header.css";
import { memo, useEffect, useState } from "react";

const Header = memo(() => { //memoize the header component since it's static

  const [isFirstRender , setIsFirstRender] = useState(true); // Title animate only on mount.

  useEffect(()=> { // Title animate only on mount.
    setTimeout(()=> { //let animation finish fully
      setIsFirstRender(false);
    },3000);
  
  },[])

  return (
    <div className={`header ${isFirstRender ? "tracking-in-contract-bck shadow-drop-center" : "" }`}> // Title animate only on mount.
        Todo App
    </div>
  )
})



export default Header