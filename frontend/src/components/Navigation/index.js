// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import ProfileButton from './ProfileButton';
// // import LoginFormModal from '../LoginFormModal';
// import './Navigation.css';
// import { showModal, setCurrentModal } from '../../store/modal'
// import LoginFormPage from '../LoginFormPage';
// import SignupFormPage from '../SignupFormPage';
// import CreatePostModal from '../Posts/CreatePostModal';



// function Navigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);
//   const dispatch = useDispatch()

//   const handleLogin = (e) => {
//     dispatch(setCurrentModal(LoginFormPage))
//     dispatch(showModal())
//   }

//   const handleSignup = (e) => {
//     dispatch(setCurrentModal(SignupFormPage))
//     dispatch(showModal())
//   }

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//     <>  
//       <div className="nav-action-buttons">
//         <div>
//           <NavLink to="/">Home</NavLink>
//         </div>
//         <div>
//           <ProfileButton user={sessionUser} />
//         </div>
//       </div>
//       <div className="create-post-modal-container">
//         <CreatePostModal />
//       </div>
//     </>
//     );
//   } else {
//     sessionLinks = (
//       <>
//         {/* <button className="btn btn-primary" onClick={handleLogin}>Login</button> */}
//         {/* <button onClick={handleSignup}>Sign Up</button> */}
//       </>
//     );
//   }

//   return (
//     <div>
//       <div>
//         <NavLink exact to="/">Future Logo</NavLink>
//         {isLoaded && sessionLinks}
//       </div>
//     </div>
//   );
// }

// export default Navigation;

import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import CreatePostModal from "../Posts/CreatePostModal";
// import { searchUsers } from "../../store/search";
import { useDispatch } from "react-redux";
import "./Navigation.css";
// import { getAllUserPostsThunk } from "../../store/userPosts";
import { useHistory } from "react-router";
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  // const searchResults = useSelector((state) => state.search);
  // const results = Object.values(searchResults);
  const history = useHistory();

  // useEffect(() => {
  //   if (input.length > 0) {
  //     dispatch(searchUsers(input));
  //   }
  // }, [dispatch, input]);

  // const showSearch = () => {
  //   document.querySelector(".search-results").classList.remove("hidden");
  // };
  // const hideSearch = (e) => {
  //   if (!e.currentTarget.contains(e.relatedTarget)) {
  //     document.querySelector(".search-results").classList.add("hidden");
  //   }
  // };

  // const reset = (id) => {
  //   document.querySelector(".search-results").classList.add("hidden");
  //   dispatch(getAllUserPostsThunk(id));
  //   history.push(`/users/${id}`);
  //   setInput("");
  // };

  const logout = (e) => {
    e.preventDefault();
    history.push('/')
    dispatch(sessionActions.logout());
  };

  let navBar;
  if (sessionUser) {
    navBar = (
      <div className="navWrapper">
        <div className="nav">
          <div className="logoWrapper">
            <NavLink to="/">
              <img
                className="logo"
                src={
                  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637690726/spacestagram/spacestagram_logo_1500x500_e0y2k4.svg"
                }
                alt=""
              ></img>
            </NavLink>
          </div>
          {/* <div className="searchBar">
            <div className="search-container" onBlur={(e) => hideSearch(e)}>
              <input
                className="search-bar"
                value={input}
                placeholder="Search"
                onFocus={() => showSearch()}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="search-results hidden">
                {results?.length > 0 && input.length > 0 ? (
                  Object.values(results).map((res) => (
                    <div key={res.id} className="search-card">
                      <Link
                        to={`/users/${res.id}`}
                        className="search-name"
                        onClick={() => {
                          reset(res.id);
                        }}
                      >
                        {res.username}
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="search-none">No results</div>
                )}
              </div>
            </div>
          </div> */}
          <div className="actionButtons">
            {/* <NavLink className="homeNav" to="/">
              <i className="fas fa-home"></i>
            </NavLink> */}
            <div>
              <CreatePostModal />
            </div>
            {/* <NavLink to={`/users/${sessionUser.id}`}> */}
            {/* <NavLink to={`/users/${sessionUser.id}`}>
              <i className="far fa-user-circle profilePageNav"></i>
            </NavLink> */}
            {/* <ProfileButton user={sessionUser} /> */}
            {/* <NavLink className="logoutNav" to="/logout">
              <i className="fas fa-home"></i>
            </NavLink> */}
            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }

  return <div>{isLoaded && navBar}</div>;
}

export default Navigation;