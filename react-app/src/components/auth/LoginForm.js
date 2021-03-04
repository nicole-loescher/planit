import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as authActions from "../../store/auth";
import './index.css'

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onDemo = async (e) => {
    e.preventDefault();
    const demoUser = await dispatch(authActions.login('demo@aa.io', 'password'))
    setAuthenticated(true)
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(authActions.login(email, password));
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  let errordiv;
  if(errors.length > 0){
    errordiv = (
      <div>
      <h3>Houston we have a problem: </h3>
        {errors.map((error) => (
          <div>{error}</div>
        )) }  
      </div>
    )
  }

  return (
    <div className='standard__form'>

      <div>
          <img src='https://myplanits.s3-us-west-1.amazonaws.com/signup.jpg' alt='party planets' className='standard__form--img' />
      </div>
      <div className='standard__form--div'>
        <h2>Log in and Blast Off!</h2>
        <form className='standard__form--form' onSubmit={onLogin}>
          <div className='errors'>
            {errordiv}
          </div>
          <div>
            {/* <label htmlFor="email">Email</label> */}
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
              />
          </div>
          <div>
            {/* <label htmlFor="password">Password</label> */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              />
          </div>
            <button className='button_primary' type="submit">Log In</button>
        </form>
        <Link to='/sign-up'>Not a member yet?</Link>
        <button type='submit' onClick={onDemo} className='button_secondary'>Demo Log In</button>
      </div>
    </div>
  );
};

export default LoginForm;
