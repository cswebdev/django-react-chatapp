import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Cookies from "js-cookie";
import "../App.js";

// const INITAL_REGISTRATION_STATE = {
//    username: "",
//    password1: "",
//    password2: "",
//    email: "",
// };

function RegistrationForm({ setAuth, setPage, ...props }) {
   const [user, setUser] = useState({
      username: "",
      password1: "",
      password2: "",
      email: "",
   });
   // const [state, setState] = useState(INITAL_REGISTRATION_STATE);

   const [err, setError] = useState(null);

   const handleInput = (event) => {
      const { name, value } = event.target;

      setUser((prevState) => ({
         ...prevState,
         [name]: value.trim(),
      }));
   };

   const handleError = (err) => {
      console.warn.log(err);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(handleSubmit);
      const options = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
         },
         body: JSON.stringify(user),
      };

      if (user.password1 !== user.password2) {
         setError("passwords do not match");
         return;
      }

      const response = await fetch(
         "/dj-rest-auth/registration/",
         options
      ).catch(handleError);
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
                     <div className="text-center">
                        <h1>Register</h1>
                     </div>
                  </div>
                  <div className="row align-items-center">
                     <div className="col-12 w-100 mb-1">
                        <label htmlFor="username"></label>
                        <input
                           className="w-100 form-control"
                           id="username"
                           name="username"
                           type="text"
                           placeholder="Username"
                           value={user.username}
                           onChange={handleInput}
                        />
                     </div>
                  </div>
                  <div className="row align-items-center">
                     <div className="col-12 w-100 mb-1">
                        <label htmlFor="email"></label>
                        <input
                           id="email"
                           name="email"
                           className="form-control"
                           type="email"
                           placeholder="Email"
                           value={user.email}
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
                           value={user.password1}
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
                           value={user.password2}
                           onChange={handleInput}
                        />
                     </div>
                  </div>
                  <div>{err}</div>
                  <div className="row justify-content-start mt-4">
                     <div className="col">
                        <Button
                           className="btn btn-primary w-100"
                           type="submit"
                           variant="primary"
                           // onClick={() => {handleSubmit}}
                        >
                           Submit
                        </Button>
                        <p className="text-center mt-3">
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
