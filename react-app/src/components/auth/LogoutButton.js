import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as authActions from "../../store/auth";

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    e.preventDefault();
    history.push('/');
    await dispatch(authActions.logout());
    setAuthenticated(false);

  };

  return <button className='button_secondary' onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
