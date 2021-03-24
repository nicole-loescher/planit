import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link,  Redirect } from 'react-router-dom';
import * as authActions from '../../store/auth'
import './index.css';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';


const SignUpForm = ({authenticated, setAuthenticated}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      let lowEmail = email.toLowerCase()
      const user = await dispatch(authActions.signUp(first_name, last_name, image, lowEmail, password));
      if (!user.errors) {
        setAuthenticated(true);
      } else {
        setErrors(user.errors);
      }
    }
    else if( password !== repeatPassword){
      setErrors(['Passwords do not match.'])
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
  const updateImage = (e) => {
    setImage(e.target.files[0]);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }
  let errordiv;
  if (errors.length > 0) {
    errordiv = (
      <div>
        <h3>Houston we have a problem: </h3>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
    )
  }

  return (
    <div className='standard__form'>
      <div>
        <img src='https://myplanits.s3-us-west-1.amazonaws.com/signup.jpg' alt='party planets' className='standard__form--img' />
      </div>
      <div className='standard__form--div'>
        <h2>Join the Galaxy</h2>
        <form className='standard__form--form' onSubmit={onSignUp}>
          <div className='errors'>
            {errordiv}
          </div>
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
          <IconButton aria-label="add a photo" style={{borderRadius: '2rem', marginTop: '1rem'}} >
            <PhotoCameraIcon />
            <label
              htmlFor='picupload'
              > Profile Picture
            </label>
            <input
              type="file"
              id='picupload'
              hidden
              onChange={updateImage}
              required={false}
              />
          </IconButton>
          <button className='button_secondary' type="submit">Sign Up</button>
        </form>
        <Link to='/login'>Already have an account?</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
