import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { showModal, setCurrentModal } from '../../store/modal'
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import CreatePostModal from '../Posts/CreatePostModal';



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    dispatch(setCurrentModal(LoginFormPage))
    dispatch(showModal())
  }

  const handleSignup = (e) => {
    dispatch(setCurrentModal(SignupFormPage))
    dispatch(showModal())
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
    <>  
      <div className="nav-action-buttons">
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      </div>
      <div className="create-post-modal-container">
        <CreatePostModal />
      </div>
    </>
    );
  } else {
    sessionLinks = (
      <>
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>SignUp</button>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Future Logo</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;

// import React, { useState, useEffect } from "react";
// import { NavLink, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import CreatePostModal from "../Posts/CreatePostModal";
// // import { searchUsers } from "../../store/search";
// import { useDispatch } from "react-redux";
// import "./Navigation.css";
// // import { getAllUserPostsThunk } from "../../store/userPosts";
// import { useHistory } from "react-router";
// import * as sessionActions from '../../store/session';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);
//   const [input, setInput] = useState("");
//   const dispatch = useDispatch();
//   // const searchResults = useSelector((state) => state.search);
//   // const results = Object.values(searchResults);
//   const history = useHistory();

//   // useEffect(() => {
//   //   if (input.length > 0) {
//   //     dispatch(searchUsers(input));
//   //   }
//   // }, [dispatch, input]);

//   // const showSearch = () => {
//   //   document.querySelector(".search-results").classList.remove("hidden");
//   // };
//   // const hideSearch = (e) => {
//   //   if (!e.currentTarget.contains(e.relatedTarget)) {
//   //     document.querySelector(".search-results").classList.add("hidden");
//   //   }
//   // };

//   // const reset = (id) => {
//   //   document.querySelector(".search-results").classList.add("hidden");
//   //   dispatch(getAllUserPostsThunk(id));
//   //   history.push(`/users/${id}`);
//   //   setInput("");
//   // };

//   const logout = (e) => {
//     e.preventDefault();
//     history.push('/')
//     dispatch(sessionActions.logout());
//   };

//   let navBar;
//   if (sessionUser) {
//     navBar = (
//       <div className="navWrapper">
//         <div className="nav">
//           <div className="logoWrapper">
//             <NavLink to="/posts">
//               <img
//                 className="logo"
//                 src={
//                   "https://res.cloudinary.com/dxo7djnid/image/upload/v1637690726/spacestagram/spacestagram_logo_1500x500_e0y2k4.svg"
//                 }
//                 alt=""
//               ></img>
//             </NavLink>
//           </div>
//           {/* <div className="searchBar">
//             <div className="search-container" onBlur={(e) => hideSearch(e)}>
//               <input
//                 className="search-bar"
//                 value={input}
//                 placeholder="Search"
//                 onFocus={() => showSearch()}
//                 onChange={(e) => setInput(e.target.value)}
//               />
//               <div className="search-results hidden">
//                 {results?.length > 0 && input.length > 0 ? (
//                   Object.values(results).map((res) => (
//                     <div key={res.id} className="search-card">
//                       <Link
//                         to={`/users/${res.id}`}
//                         className="search-name"
//                         onClick={() => {
//                           reset(res.id);
//                         }}
//                       >
//                         {res.username}
//                       </Link>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="search-none">No results</div>
//                 )}
//               </div>
//             </div>
//           </div> */}
//           <div className="actionButtons">
//             <NavLink className="homeNav" to="/">
//               {/* <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 homeNav"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 height="1em"
//                 width="1em"
//                 style={{ transform: "rotate(360deg)" }}
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                 />
//               </svg> */}
//               <i className="fas fa-home"></i>
//             </NavLink>
//             <div>
//               <CreatePostModal />
//             </div>
//             {/* <NavLink to={`/users/${sessionUser.id}`}> */}
//             <NavLink to={`/users/${sessionUser.id}`}>
//               <i className="far fa-user-circle profilePageNav"></i>
//             </NavLink>
//             <ProfileButton user={sessionUser} />
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return null;
//   }

//   return <div>{isLoaded && navBar}</div>;
// }

// export default Navigation;