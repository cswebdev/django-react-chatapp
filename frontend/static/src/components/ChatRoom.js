import "../styles/ChatRoomStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Cookies from "js-cookie";
import "../App.js";
import { useState, useEffect } from "react";
import Rooms from "./Rooms";
import Messages from "./Messages";
import { IconTrash } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";

function ChatApp({ setPage }) {
   const [rooms, setRooms] = useState({});
   const [messages, setMessages] = useState([]);
   const [text, setText] = useState("");
   const [activeRoomID, setActiveRoomID] = useState(1);
   const [activeUser, setActiveUser] = useState({});

   const handleError = (err) => {
      console.warn.log(err);
   };

   // *** Log Out Section *** //
   const handleLogout = async () => {
      const response = await fetch("/dj-rest-auth/logout/", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
         body: "",
      });
      const data = await response.json();
      Cookies.remove("Authorization", `Token ${data.key}`);
      setPage("login");
   };

   const handleRoomInput = async (e) => {
      const { name, value } = e.target;
      setRooms((prevState) => ({
         ...prevState,
         [name]: value,
         name,
      }));
   };

   // *** Create Room *** //
   const handleRoomSubmit = async () => {
      const options = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
         body: JSON.stringify({ name: rooms.name }),
      };

      const response = await fetch(`/api_v1/chatrooms/`, options).catch(
         handleError
      );

      if (!response.ok) {
         throw new Error("Network Response was not OK");
      }
      const data = await response.json();
      //needs to write code for room submit
      setRooms(data);
   };

   //*** Create A Message ***/
   const handleTextSubmit = async (e) => {
      e.preventDefault();
      const options = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
         body: JSON.stringify({
            message: text,
            room: activeRoomID,
         }),
      };

      const response = await fetch(
         `/api_v1/chats/${activeRoomID}`,
         options
      ).catch(handleError);

      if (!response.ok) {
         throw new Error("Network response was not OK");
      }
      setText("");
   };

   //******** username fetch ******** */
   useEffect(() => {
      const getActiveUser = async () => {
         const response = await fetch(`/dj-rest-auth/user`);
         if (!response.ok) {
            throw new Error("Network response not okay - user not found");
         }
         const data = await response.json();
         console.log(data);
         setActiveUser(data);
      };
      getActiveUser();
   }, []);
   console.log("this is", activeUser.username);

   return (
      <div
         className="container d-flex overflow-auto bg-white"
         id="chat-room-container"
      >
         {/* Left panel  */}
         <div className="row g-0 float-start d-block  overflow-auto">
            {/* <input className="form-control" id="room-create"></input> */}
            {/* left panel heading */}
            <div className="col-12 ">
               <div className="settings-tray p-0 m-0 ">
                  <Accordion>
                     <Accordion.Item eventKey="0">
                        <Accordion.Header>
                           <img
                              src="https://source.unsplash.com/random/70x70/?face-closeup"
                              id="personal-img"
                              className="rounded-circle pe-2"
                              alt="80x80"
                           />

                           <h6>{activeUser.username}</h6>
                        </Accordion.Header>
                        <Accordion.Body className="d-flex justify-content-center">
                           <Button
                              className="m-0"
                              variant="outline-danger"
                              type="button"
                              onClick={handleLogout}
                           >
                              Log Out
                           </Button>
                        </Accordion.Body>
                     </Accordion.Item>
                  </Accordion>
               </div>
            </div>

            {/* left panel heading end */}
            {/* in this room drawer use room list like handlebars js and plug in room names */}
            <div className="room-drawer overflow-hidden ">
               <Rooms
                  activeRoomID={activeRoomID}
                  setActiveRoomID={setActiveRoomID}
               />
               {/* <img> you could put an  */}
            </div>
            <Accordion id="accord-room">
               <Accordion.Item eventKey="0">
                  <Accordion.Header>Room Menu</Accordion.Header>
                  <Accordion.Body className="d-block align-content-center p-0 ">
                     <ul className="m-0 p-0">
                        <li>
                           <h6 className="text-center text-muted mt-0 mb-0">
                              Create Room
                           </h6>
                           <form
                              onSubmit={handleRoomSubmit}
                              className="align-items-center"
                           >
                              <label htmlFor="room-name"></label>
                              <input
                                 type="text"
                                 name="room-name"
                                 className="form-control"
                                 placeholder="Room Name"
                                 value={rooms.name}
                                 onChange={handleRoomInput}
                              ></input>
                           </form>
                        </li>
                        <li className="d-flex justify-content-evenly">
                           <Button
                              className="d-inline-block w-50"
                              type="submit"
                              variant="outline-primary"
                              onClick={handleRoomSubmit}
                           >
                              <IconPlus />
                           </Button>
                        </li>
                     </ul>
                  </Accordion.Body>
               </Accordion.Item>
            </Accordion>
            <div id="menu-container"></div>
         </div>
         {/* right panel */}
         {/* messages go here */}
         <div
            className="row g-0 w-100 position-relative bg-lighter "
            id="right-side-panel-header"
         >
            <div className="col-md-8 w-100 m-100 ">
               {/* chat container */}
               <div className="chat-panel h-50 position-relative ">
                  {/* * */}
                  {/* chat bubbles */}
                  {/* float left - other ppls chats */}
                  <div className="row g-0 ">
                     <Messages
                        activeRoomID={activeRoomID}
                        activeUser={activeUser}
                     />
                  </div>
               </div>
            </div>
            <div className="button-tray d-inline position-absolute end-0 bottom-0">
               <form
                  onSubmit={handleTextSubmit}
                  className="w-100 d-inline-flex"
               >
                  <label htmlFor="message"></label>
                  <input
                     type="text"
                     name="message"
                     className="form-control me-1"
                     placeholder="enter message here"
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                  />
                  <Button
                     type="submit"
                     variant="outline-primary"
                     className="me-1 p-3 end-0 d-inline "
                  >
                     send
                  </Button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default ChatApp;
