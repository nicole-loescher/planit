import React, { useState } from "react";
import { Link,  Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import './index.css'

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image_url, setImageUrl] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(first_name, last_name, image_url, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  const updateImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className='standard__form'>
      <div>
        <img src='https://myplanits.s3-us-west-1.amazonaws.com/signup.jpg' alt='party planets' className='standard__form--img' />
      </div>
      <div className='standard__form--div'>
        <h2>Join the Galaxy</h2>
        <form className='standarm__form-form' onSubmit={onSignUp}
        css={{
          backgroundColor: 'red'
        }}>
          <div>
            {/* <label>First Name</label> */}
            <input
              type="text"
              placeholder='First Name'
              name="firstName"
              onChange={updateFirstName}
              value={first_name}
              ></input>
          </div>
          <div>
            {/* <label>Last Name</label> */}
            <input
              type="text"
              placeholder='Last Name'
              name="lastName"
              onChange={updateLastName}
              value={last_name}
              ></input>
          </div>
          {/* <div>
          </div> */}
          <div>
            {/* <label>Email</label> */}
            <input
              type="text"
              placeholder='Email'
              name="email"
              onChange={updateEmail}
              value={email}
              ></input>
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              type="password"
              placeholder='Password'
              name="password"
              onChange={updatePassword}
              value={password}
              ></input>
          </div>
          <div>
            {/* <label>Repeat Password</label> */}
            <input
              type="password"
              placeholder='Re-enter Password'
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              ></input>
          </div>
          <div>
            <label>Upload a profile picture</label>
          </div>
          <div>
              <input
                type="file"
                name="image_url"
                onChange={updateImageUrl}
                value={image_url}
                required={false}
                />
          </div>
          <button className='button_secondary' type="submit">Sign Up</button>
        </form>
        <Link to='/login'>Already have an account?</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
