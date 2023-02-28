import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Message(props) {
   const [messages, setMessages] = useState([]);

   useEffect(() => {
      const getMessages = async () => {
         const response = await fetch("/api_v1/chats/");
         if (!response.ok) {
            throw new Error("Network response not ok");
         }
         const data = await response.json();
         setMessages(data);
      };
      getMessages();
   }, []);

   const addMessage = async () => {
      const message = {
         text: "",
         author: "",
      };

      const options = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
         body: JSON.stringify(message),
      };

      const response = await fetch("/api_v1/chats/", options);
      if (!response.ok) {
         throw new Error("Network response not ok");
      }
      const data = await response.json();
      console.log({ data });
      setMessages([...messages, data]);
   };

   const messagesHTML = messages.map((message) => (
      <div className="row g-0" key={message.id}>
         <div className="col-md-3 float-md-end offset-md-9">
            <div
               id="chat-message"
               key={message.id}
               className="chat-bubble float-md-end bg-primary"
            >
               <h6>{messages.author}</h6>
               {messages.text}
            </div>
         </div>
      </div>
   ));

   return <div>{messagesHTML}</div>;
}

export default Message;
