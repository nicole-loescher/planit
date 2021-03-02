import React from "react";
import { logout } from "../../services/auth";

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <button className='button_secondary' onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
