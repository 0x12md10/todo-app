import "./Footer.css";
import { TbMail } from "react-icons/tb";
import { FaGithubAlt } from "react-icons/fa";
import { AiOutlineDiscord } from "react-icons/ai";

function Footer() {
  return (
    <div className="footer">
        <div className="social">
            <div className="social-icon"><FaGithubAlt /></div>
            <div className="social-icon"><TbMail/></div>
            <div className="social-icon"><AiOutlineDiscord /></div>

        </div>
        <div className="footer-text"> 
            Made with ❤️ from @0x12md10, Thank you!
        </div>
    </div>
  )
}

export default Footer