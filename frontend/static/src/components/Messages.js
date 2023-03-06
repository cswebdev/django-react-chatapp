import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/esm/Button";
import ChatApp from "./ChatRoom";
import "../styles/App.css";
import Accordion from "react-bootstrap/Accordion";
import { IconTrash } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

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
      }, 1000);

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
               <div className="col-md-3 float-md-end offset-md-9">
                  <Accordion
                     id="chat-accordion"
                     flush
                     className="p-0 bg-transparent"
                  >
                     <Accordion.Item eventKey="0">
                        <Accordion.Header className="p-0 bg-transparent d-flex">
                           <div
                              id="chat-message"
                              key={message.id}
                              className="chat-bubble float-md-end bg-primary m-1"
                           >
                              {message.message}
                           </div>{" "}
                           <h6>{message.author_name}</h6>
                        </Accordion.Header>
                        <AccordionBody className="d-flex justify-content-center p-0">
                           <Button
                              variant="outline-primary"
                              className="me-1"
                              onClick={() => deleteMessage(message.id)}
                           >
                              <IconTrash />
                           </Button>
                           <Button variant="outline-primary" className="ms-1">
                              <IconPencil />
                           </Button>
                        </AccordionBody>
                     </Accordion.Item>
                  </Accordion>
               </div>{" "}
            </div>
         );
      } else {
         return (
            <div className="row g-0" key={message.id}>
               <div className="col-md-3 d-flex">
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
