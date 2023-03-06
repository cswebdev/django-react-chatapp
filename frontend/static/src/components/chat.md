import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/esm/Button";
import ChatApp from "./ChatRoom";
import "../styles/App.css";
import { IconTrash } from "@tabler/icons-react";

//edit button will need to be conditional rendering. 
//add edit save button (inject )

function Messages({ activeRoomID, activeUser }) {
   const [messages, setMessages] = useState([]);

   useEffect(() => {
      const getMessages = async () => {
         const response = await fetch(`/api_v1/chats/${activeRoomID}`);
         if (!response.ok) {
            throw new Error("Network response not ok");
         }
         const data = await response.json();
         console.log(data);
         setMessages(data);
      };
      getMessages();

      const interval = setInterval(() => {
         getMessages();
      }, 9000);

      return () => clearInterval(interval);
   }, [activeRoomID]);

   const deleteMessage = async (id) => {
      console.log(id);
      const response = await fetch(`/api_v1/chats/delete/${id}/`, {
         method: "DELETE",
         headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
      });
      if (!response.ok) {
         throw new Error("Network response not ok");
      }
      const index = messages.findIndex((message) => message.id === id);
      const updatedMessages = [...messages];
      updatedMessages.splice(index, 1);
      setMessages(updatedMessages);
   };

   const messagesHTML = messages.map((message) => {
      if (message.author_name === activeUser.username) {
         return (
            <div className="row g-0" key={message.id}>
               <div className={`col-md-3 float-md-end offset-md-9`}>
                  <h6>{message.author_name}</h6>
                  <div
                     id="chat-message"
                     key={message.id}
                     className={`chat-bubble float-md-end bg-primary`}
                  >
                     {message.message}
                     <Button onClick={() => deleteMessage(message.id)}>
                        <IconTrash />
                     </Button>
                  </div>
               </div>
            </div>
         );
      } else {
         return (
            <div className="row g-0" key={message.id}>
               <div className="col-md-3">
                  <h6>{message.author_name}</h6>
                  <div className="chat-bubble float-md-start bg-secondary">
                     {message.message}
                  </div>
               </div>
            </div>
         );
      }
   });

   return <div>{messagesHTML}</div>;
}

export default Messages;
