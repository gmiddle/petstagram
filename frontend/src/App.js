import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
// import { Modal } from './context/Modal';
import Feed from './components/Feed';
import Modal from './components/Modal/Modal'
import Footer from './components/Footer';
import { restoreCSRF } from './store/csrf';



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") restoreCSRF();
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Modal />
      {/* <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          
          <Route path='/signup'>
            <SignupFormPage />
          </Route>

          <Route exact path='/posts' >
            <Feed />
          </Route>

        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
