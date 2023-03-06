import { useState, useEffect } from "react";
import "../styles/RoomListStyles.css";
import Button from "react-bootstrap/esm/Button";
import { IconTrash } from "@tabler/icons-react";
import Cookies from "js-cookie";

function Rooms({ activeRoomID, setActiveRoomID }) {
   const [rooms, setRooms] = useState([]);

   useEffect(() => {
      const getRooms = async () => {
         const response = await fetch("/api_v1/chatrooms");
         if (!response.ok) {
            throw new Error("Network response not ok");
         }
         const data = await response.json();
         setRooms(data);
      };
      getRooms();
      const interval = setInterval(() => {
         getRooms();
      }, 80000);
      return () => clearInterval(interval);
   }, []);

   const deleteRooms = async (id) => {
      console.log(id);
      const response = await fetch(`/api_v1/chatrooms/${id}/`, {
         method: "DELETE",
         headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
      });
      if (!response.ok) {
         throw new Error("Network response not ok");
      }
      const index = rooms.findIndex((room) => room.id === id);
      const updatedRooms = [...rooms];
      updatedRooms.splice(index, 1);
      setRooms(updatedRooms);
   };

   console.log(activeRoomID);

   const roomsHTML = rooms.map((room) => (
      <button
         id="room-btn"
         key={room.id}
         //chat panel will connect with selectedRoom function to switch between chat rooms
         className={activeRoomID === room.id ? "active-room" : null}
         onClick={() => setActiveRoomID(room.id)}
      >
         <Button
            variant="outline-danger p-0 float-start"
            type="submit"
            onClick={() => deleteRooms(room.id)}
         >
            <IconTrash />
         </Button>
         {room.name}
      </button>
   ));

   return (
      <div className="chatRoom" id="chat-room">
         <div className="room-list">{roomsHTML}</div>
      </div>
   );
}

export default Rooms;
