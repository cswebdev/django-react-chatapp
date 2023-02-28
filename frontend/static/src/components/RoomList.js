import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ChatApp from "./ChatRoom";
import { Button } from "bootstrap";
import "../styles/RoomListStyles.css";

function RoomList() {
   const [rooms, setRooms] = useState([]);
   const [selectedRoom, setSelectedRoom] = useState(null);

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

   const handleRoomSelect = (roomId) => {
      setSelectedRoom(roomId);
   };

   const roomsHTML = rooms.map((room) => (
      <button
         id="room-btn"
         key={room.id}
         //chat panel will connect with selectedRoom function to switch between chat rooms
         className={selectedRoom === room.id ? "selected" : ""}
         onClick={() => setSelectedRoom(room.id)}
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

export default RoomList;

// old code

// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import ChatApp from "./ChatRoom";
// import { Button } from "bootstrap";
// import "../styles/RoomListStyles.css";

// function RoomList(room, setrooms, roomName) {
//    const [rooms, setRooms] = useState([]);

//    useEffect(() => {
//       const getRooms = async () => {
//          const response = await fetch("/api_v1/chats/chatrooms");

//          if (!response.ok) {
//             throw new Error("Network response not ok");
//          }

//          const data = await response.json();
//          setRooms(data);
//       };

//       getRooms();
//       console.log(rooms);
//    }, []);

//    const addRoom = async () => {
//       const room = {
//          name: "",
//       };

//       const options = {
//          method: "POST",
//          headers: {
//             "content-type": "application/json",
//             "X-CSRFToken": Cookies.get("csrftoken"),
//          },
//          body: JSON.stringify(room),
//       };

//       const response = await fetch("/api_v1/chats/chatrooms/", options);

//       if (!response.ok) {
//          throw new Error("Network response not ok");
//       }

//       const data = await response.json();
//       console.log({ data });
//       setRooms([...rooms, data]);
//    };

//    const roomsHTML = rooms.map((room) => (
//       <button id="room-btn" key={room.id}>
//          {room.name}
//       </button>
//    ));

//    return (
//       <div className="chatRoom" id="chat-room">
//          {roomsHTML}
//       </div>
//    );
// }

// export default RoomList;
