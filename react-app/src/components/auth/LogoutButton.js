import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as authActions from "../../store/auth";

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    e.preventDefault()
    await dispatch(authActions.logout());
    setAuthenticated(false);
  };

  // if (!authenticated) {
  //   return <Redirect to="/login" />;
  // }
  return <button className='button_secondary' onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
