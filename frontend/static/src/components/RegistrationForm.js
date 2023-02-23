import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Cookies from "js-cookie";
import "../App.js";

const INITAL_REGISTRATION_STATE = {
   username: "",
   password1: "",
   password2: "",
   email: "",
};

function RegistrationForm({ setAuth, setPage }) {
   const [state, setState] = useState(INITAL_REGISTRATION_STATE);

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

      console.log(handleSubmit);
      const options = {
         method: "POST",
         headers: {
            "content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
         body: JSON.stringify(state),
      };

      const response = await fetch("/dj-rest-auth/login/", options).catch(
         handleError
      );
      if (!response.ok) {
         throw new Error(
            "Network is im not okay im not okayyyyy you wear me out"
         );
      }
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      setAuth(true);
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="container" id="registration-form">
            <div className="row justify-content-center">
               <div className="col-12 col-md-8 w-100 mt-4 mb-3">
                  <div className="row">
                     <div className="col text-center">
                        <h1>Register</h1>
                     </div>
                  </div>
                  <div className="row align-items-center">
                     <div className="col-12 w-100 mb-3">
                        <label htmlFor="username"></label>
                        <input
                           className="w-100 form-control"
                           id="username"
                           name="username"
                           type="text"
                           placeholder="Username"
                           value={state.username}
                           onChange={handleInput}
                        />
                     </div>
                  </div>
                  <div className="row align-items-center">
                     <div className="col-12 w-100 mb-3">
                        <label htmlFor="email"></label>
                        <input
                           id="email"
                           name="email"
                           className="form-control"
                           type="email"
                           placeholder="Email"
                           value={state.email}
                           onChange={handleInput}
                        />
                     </div>
                  </div>
                  <div className="row align-items-center mb-3">
                     <div className="col">
                        <label htmlFor="password1"></label>
                        <input
                           id="password1"
                           name="password1"
                           className="form-control"
                           type="password"
                           placeholder="Password"
                           value={state.password1}
                           onChange={handleInput}
                        />
                     </div>
                     <div className="col">
                        <label htmlFor="password2"></label>
                        <input
                           id="password2"
                           name="password2"
                           type="password"
                           className="form-control"
                           placeholder="Confirm Password"
                           value={state.password2}
                           onChange={handleInput}
                        />
                     </div>
                  </div>
                  <div className="row justify-content-start mb-4">
                     <div className="col">
                        <Button
                           className="btn btn-primary w-100"
                           type="submit"
                           variant="primary"
                        >
                           Submit
                        </Button>
                        <p className="text-center mt-3 mb-4">
                           <button
                              type="button"
                              onClick={() => setPage("login")}
                              id="login-link"
                           >
                              Login
                           </button>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </form>
   );
}

export default RegistrationForm;
