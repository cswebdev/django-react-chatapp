import "../styles/ChatRoomStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
function ChatApp() {
   // Brain blast of an idea!
   // this will be the overall container for the chatroom
   //individudal chats will another js file, and like used like js handlebars.

   //similar to this idea:
   //https://codepen.io/dagalti/pen/NQPmaG
   //each chat is their own row!
   //div.row.no-gutters(g-0) > div.chat-bubble!
   return (
      <div className="container d-flex" id="chat-room-container">
         <div className="row g-0 float-start d-block">

            {/* <input className="form-control" id="room-create"></input> */}
            {/* left panel heading */}
            <div className="col-12">
               <div className="settings-tray">
                  <img
                     src="https://source.unsplash.com/random/80x80/?face-closeup"
                     id="personal-img"
                     className="rounded-circle"
                     alt="50x50"
                  />
                  <div>Username`${}`</div>
               </div>
            </div>
            {/* left panel heading end */}
            {/* in this room drawer use room list like handlebars js and plug in room names */}
            <div className="room-drawer">
               {/* <img> you could put an  */}
               <div className="text border-bottom">
                  <div className="h6">Room Name`${}`</div>
               </div>
               <div className="text border-bottom">
                  <div className="h6">Room Name`${}`</div>
               </div>
               <div className="text border-bottom">
                  <div className="h6">Room Name`${}`</div>
               </div>
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
