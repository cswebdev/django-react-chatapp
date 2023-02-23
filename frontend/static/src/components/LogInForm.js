// LogInForm.js
// import "./styles/App.css";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.js";

const INITIAL_STATE = {
   username: "",
   password: "",
   email: "",
};
//props can't be wrapped in {}. LoginForm(props) was changed to LoginForm({ setAuth }),

function LogInForm({ setPage }) {
   const [state, setState] = useState(INITIAL_STATE);

   const handleInput = (e) => {
      const { name, value } = e.target;

      setState((prevState) => ({
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
            "X-CSRFToken": Cookies.get("crsftoken"),
         },
         body: JSON.stringify(state),
      };

      //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      // this explains .catch

      const responses = await fetch("/dj-rest-auth/login/", options).catch(
         handleError
      );
      if (!responses.ok) {
         throw new Error("Network Response was not OK");
      }
      const data = await responses.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      setPage("chats");
   };

   //clickable link event listnener to send user to RegistrstionForm
   //*no workie*
   //frustration imprissiong me all I can see is absolute horror

   // useEffect(() => {
   //    const registrationLink = document.getElementById("registration-link");
   //    registrationLink.addEventListener("click", function (event) {
   //       event.preventDefault();
   //       alert("click")

   //    });
   // }, );

   //
   //
   // FUDGING FUDGE

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
                        placeholder="Username"
                        name="username"
                        value={state.username}
                        onChange={handleInput}
                     />
                  </div>

                  <div className="col-12 w-100 mb-3">
                     <label htmlFor="password"></label>
                     <input
                        className="w-100 form-control"
                        type="password"
                        placeholder="password"
                     />
                  </div>

                  <Button
                     variant="primary"
                     className="w-100 mb-3"
                     type="submit"
                     id="log-in"
                  >
                     Log In
                  </Button>

                  {/* onclick event here is all that is needed. No need to call a seperate onclick event like in vanilla js */}
                  <p className="text-center">
                     Need an account?<p></p>
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
