import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import "../App.js";

function LogInForm({ setPage, ...props }) {
   const [user, setUser] = useState({
      username: "",
      password: "",
      email: "",
   });

   const handleInput = (e) => {
      const { name, value } = e.target;
      setUser((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleError = (err) => {
      console.warn.log(err);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const options = {
         method: "POST",
         headers: {
            "content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
         body: JSON.stringify({
            username: user.username,
            password: user.password,
         }),
      };

      //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      // this explains .catch

      const response = await fetch("/dj-rest-auth/login/", options).catch(
         handleError
      );

      if (!response.ok) {
         throw new Error("Network Response was not OK");
      }

      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      setPage("chats");
   };

   return (
      <div className="container" id="log-in-container">
         <div className="row" id="log-in-form">
            <h2 className="text-center" id="login">
               Log In
            </h2>
            <div className="col">
               <form onSubmit={handleSubmit}>
                  <div className="col-12 w-100">
                     <label htmlFor="username"></label>
                     <input
                        className="w-100 form-control"
                        type="text"
                        placeholder="username"
                        name="username"
                        value={user.username}
                        onChange={handleInput}
                     />
                  </div>

                  <div className="col-12 w-100 mb-3">
                     <label htmlFor="password"></label>
                     <input
                        className="w-100 form-control"
                        type="password"
                        placeholder="password"
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                     />
                  </div>

                  <Button
                     variant="primary"
                     className="w-100 mb-3"
                     type="submit"
                     id="log-in"
                     onClick={handleSubmit}
                  >
                     Log In
                  </Button>

                  {/* onclick event here is all that is needed. No need to call a seperate onclick event like in vanilla js */}
                  <p className="text-center">
                     Need an account?<br></br>
                     <button
                        type="button"
                        onClick={() => setPage("register")}
                        id="registration-link"
                     >
                        Register
                     </button>
                  </p>
               </form>
            </div>
         </div>
      </div>
   );
}

export default LogInForm;
