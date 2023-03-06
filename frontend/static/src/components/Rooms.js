import { useState, useEffect } from "react";
import "../styles/RoomListStyles.css";

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

   console.log(activeRoomID);

   const roomsHTML = rooms?.map((room) => (
      <button
         id="room-btn"
         key={room.id}
         //chat panel will connect with selectedRoom function to switch between chat rooms
         className={activeRoomID === room.id ? "active-room" : null}
         onClick={() => setActiveRoomID(room.id)}
      >
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
