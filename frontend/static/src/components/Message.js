import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Message(props) {
  

   const messagesHTML = props.messages.map((message) => (
      <div className="row g-0" key={message.id}>
         <div className="col-md-3 float-md-end offset-md-9">
            <div
               id="chat-message"
               key={message.id}
               className="chat-bubble float-md-end bg-primary"
            >
               <h6>{message.user}</h6>
               {message.message}
            </div>
         </div>
      </div>
   ));

   return <div>{messagesHTML}</div>;
}

export default Message;
