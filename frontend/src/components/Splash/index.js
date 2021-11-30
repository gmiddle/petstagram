import './Splash.css'
import { NavLink } from 'react-router-dom'
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

function Splash() {

  
  return (
    <>
      <div className='splashBox'>
        <div className="loginSignUp-container">
            <div className="bio-container">
                <h4 className='bio'>Spacestagram is a place to share and interact with pictures of all things space.</h4>
            </div>
            <div className='signup-container'>
            <SignupFormPage />
            {/* <LoginFormPage /> */}
            <NavLink to="/login" className='signup-button'>Already a member?  Click Here to Log In</NavLink>
            </div>
        </div>
      </div>
    </>
  )
}

export default Splash;