import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ChatApp from "./ChatRoom";

function RoomList(room, setrooms, roomName) {
   const [rooms, setRooms] = useState([]);

   useEffect(() => {
      const getRooms = async () => {
         const response = await fetch("/api_v1/chats/chatrooms");

         if (!response.ok) {
            throw new Error("Network response not ok");
         }

         const data = await response.json();
         setRooms(data);
      };

      getRooms();
      console.log(rooms);
   }, []);

   const addRoom = async () => {
      const room = {
         name: "",
      };

      const options = {
         method: "POST",
         headers: {
            "content-type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
         body: JSON.stringify(room),
      };

      const response = await fetch("/api_v1/chats/chatrooms/", options);

      if (!response.ok) {
         throw new Error("Network response not ok");
      }

      const data = await response.json();
      console.log({ data });
      setRooms([...rooms, data]);
   };

   const roomsHTML = rooms.map((room) => <h6 key={room.id}>{room.name}</h6>);

   return (
      <div className="chatRoom" id="chat-room">
         {roomsHTML}
      </div>
   );
}

export default RoomList;
