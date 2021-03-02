/** @jsx jsx */
import React from 'react';
import { jsx, css } from "@emotion/react";
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../index.css'

const NavBar = ({ setAuthenticated, authenticated }) => {
 
  let content;
  if(authenticated){
    content = (
      <div>
        <LogoutButton setAuthenticated={setAuthenticated} />
      </div>
    )
  }

  else if(!authenticated){
    content = (
      <div className='links'>
        <div>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active"><button className='button_secondary'>
            Sign Up
          </button>
          </NavLink>
        </div>
      </div>
    )
  }

  return (
      <nav className='nav'>
        <div>
            <NavLink to="/" exact={true} activeClassName="active" className='logo'>
              PlanIt
            </NavLink>
        </div>
        <div>
          {content}
        </div>
      </nav>
  );
}

export default NavBar;