import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { hideModal } from "../../store/modal";
import { useHistory } from "react-router-dom";


function LoginFormPage() {
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

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* <button type="submit">Log In</button> */}
        <button className="buttonClass" onClick={handleSubmit}>Log In</button>
        <button onClick={demoUser}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormPage;
