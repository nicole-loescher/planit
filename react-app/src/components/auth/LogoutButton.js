import React from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/auth";

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch();
  
  const onLogout = async (e) => {
    await dispatch(authActions.logout());
    setAuthenticated(false);
  };

  return <button className='button_secondary' onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
