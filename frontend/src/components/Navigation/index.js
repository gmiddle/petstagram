import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { showModal, setCurrentModal } from '../../store/modal'
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';



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
    sessionLinks = <ProfileButton user={sessionUser} />;
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
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;