import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LogInForm from "./components/LogInForm";
//import Cookies from "js-cookie";
import RegistrationForm from "./components/RegistrationForm";
import ChatApp from "./components/ChatRoom";
import { useState } from "react";






function App() {

   const [page, setPage] = useState('login');
 
  
  
  

   return (
      


      <div className="col-md-12">
            {page === 'login' && <LogInForm setPage={setPage}/>}

            {page === 'register' && <RegistrationForm setPage={setPage}/>}

            {page === 'chats' && <ChatApp setPage={setPage}/>} 


      </div>

         
   );
}

export default App;
