import "../styles/App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Message() {
   const [message, setMessage] = useState(null);

   return <div className="chat-bubble float-md-start  bg-secondary">Hola!</div>;
}

export default Message;
