import './Splash.css'
import { NavLink } from 'react-router-dom'
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { hideModal } from "../../store/modal";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Splash() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()

  // if (sessionUser) return <Redirect to="/" />;

  if (sessionUser){
    dispatch(hideModal())
    return <Redirect to="/posts" />;
  } 


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // dispatch(hideModal())
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  // const demoUser = async () => {
  //   history.push('/posts')
  //     dispatch(hideModal())
  //   return dispatch(sessionActions.login({credential: "Demo-lition", password: 'password'}))
  // }

  const demoUser = async (e) => {
    e.preventDefault();
    setCredential("Demo-lition");
    setPassword("password");
    const demo = dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
    return demo;
  };
  
//   return (
    
//     <div className='splashBox'>
//         <div className="loginSignUp-container">
//             <div className="bio-container">
//                 <h4 className='bio'>Spacestagram is a place to share and interact with pictures of all things space.</h4>
//             </div>
//             <div className='signup-container'>
//             <SignupFormPage />
//             {/* <LoginFormPage /> */}
//             <NavLink to="/login" className='signup-button'>Already a member?  Click Here to Log In</NavLink>
//             </div>
//         </div>
//     </div>
    
//   )

return (
    <div className="formLoginPage">
      <div className="tagline-wrapper">
        <span>
        Spacestagram is a place to share and interact with pictures of all things space
        </span>
      </div>
      <div className="mainLoginPage">
        <div className="formWrapper">
          <div className="imageWrapper">
            <img
              className="countableLogo"
              src="https://res.cloudinary.com/dxo7djnid/image/upload/v1638267087/spacestagram/Black_Vintage_Moonlight_Yoga_Spa_Logo_1500_x_500_px_100_x_100_px_1500_x_500_px_wqeoxl.png"
              alt=""
            ></img>
          </div>
          <form className="loginForm" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <input
              className="loginFormInput"
              placeholder="Email"
              type="email"
              autoComplete="off"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              //   required
            />
            <input
              className="loginFormInput"
              placeholder="Password"
              autoComplete="off"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //   required
            />
            <button className="loginButton" type="submit">
              Log In
            </button>
            <button className="loginButton" onClick={demoUser}>
              Demo User
            </button>
          </form>
          <div className="signUpForm">
              {" "}
              Want to create an account?&nbsp;
              <Link className="link" to="/signup">
                Sign up
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splash;