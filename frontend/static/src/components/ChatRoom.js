import "../styles/ChatRoomStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Cookies from "js-cookie";
import "../App.js";
import { useState } from "react";

import RoomList from "./RoomList";

function ChatApp({ setPage, roomsHTML }) {
   const [rooms, setRooms] = useState([]);

   const handleError = (err) => {
      console.warn.log(err);
   };

   //similar to this idea:
   //https://codepen.io/dagalti/pen/NQPmaG
   //each chat is their own row!
   //div.row.no-gutters(g-0) > div.chat-bubble!

   // *********** Log Out Section ***********//
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

   const handleSubmit = async (event) => {
      event.preventDefault();
   };

   //*********** END LOG OUT SECTION *********** //

   // *********** Chat Room Creation *********** //

   // const inputRoomName = (event) => {
   //    setRoomName(event.target.value);
   // };

   const handleRoomInput = async (e) => {
      const { name, value } = e.target;
      setRooms((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleRoomSubmit = async (e) => {
      e.preventDefault();

      const options = {
         method: "POST",
         headers: {
            "content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
         body: JSON.stringify({
            rooms: rooms.name,
         }),
      };

      const response = await fetch("/api_v1/chats/chatrooms/", options).catch(
         handleError
      );
      if (!response.ok) {
         throw new Error("Network Response was not OK");
      }
   };

   // const handleDeleteRoom = () => {
   //    //insert logic to delete index from room []
   //    console.log("delete room");
   // };

   //********** End Section ****************/

   return (
      <div className="container d-flex" id="chat-room-container">
         {/* Left panel  */}
         <div className="row g-0 float-start d-block">
            {/* <input className="form-control" id="room-create"></input> */}
            {/* left panel heading */}
            <div className="col-12">
               <div className="settings-tray p-0 m-0">
                  <Accordion>
                     <Accordion.Item eventKey="0">
                        <Accordion.Header>
                           <img
                              src="https://source.unsplash.com/random/70x70/?face-closeup"
                              id="personal-img"
                              className="rounded-circle pe-2"
                              alt="80x80"
                           />
                           <div> username:`${}`</div>
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
            <div className="room-drawer">
               <RoomList />
               {/* <img> you could put an  */}
            </div>
            <div id="menu-container">
               <Accordion>
                  <Accordion.Item eventKey="0">
                     <Accordion.Header>Room Edit</Accordion.Header>
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
                              {" "}
                              <Button
                                 className="d-inline-block w-50"
                                 id="delete-btn"
                                 variant="outline-danger"
                                 // onClick={handleDeleteRoom}
                              >
                                 {" "}
                                 Delete
                              </Button>
                              <Button
                                 className="d-inline-block w-50"
                                 variant="outline-success"
                                 type="submit"
                                 // onClick={handleSaveRoom}
                              >
                                 Save
                              </Button>{" "}
                           </li>
                        </ul>
                     </Accordion.Body>
                  </Accordion.Item>
               </Accordion>
            </div>
         </div>
         {/* right panel */}
         <div className="row g-0  w-100 " id="right-side-panel-header">
            <div className="col-md-8 w-100">
               {/* chat container */}
               <div className="chat-panel">
                  <div className="row g-0">
                     <div className="col-md-3">
                        {/* float left - other ppls chats */}
                        <div className="chat-bubble float-md-start  bg-secondary">
                           Hola!
                        </div>
                     </div>
                     {/* personal chat */}
                     <div className="row g-0">
                        <div className="col-md-3 float-md-end offset-md-9">
                           <div className="chat-bubble float-md-end bg-primary">
                              Wrong number!
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="button-tray d-inline-flex w-100">
                     <input
                        className="form-control me-1 "
                        placeholder="enter message here"
                        type="text"
                        id="chat-input"
                     />
                     <Button
                        type="button"
                        variant="outline-primary"
                        className="me-1 p-3"
                     >
                        send
                     </Button>{" "}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ChatApp;
