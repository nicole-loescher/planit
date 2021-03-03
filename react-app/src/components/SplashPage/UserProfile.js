/** @jsx jsx */
import React from 'react';
import {jsx } from '@emotion/react'
import { Redirect } from 'react-router-dom';
const UserProfile = ({user}) =>{
    if(!user){
        return <h1>Looading...</h1>
    }
    return (
        <div className='home__info'>
            <img className='profile--pic' alt='profile picture' src='https://myplanits.s3-us-west-1.amazonaws.com/nicolePhoto.jpeg' />
         <h1> welcome, {user.first_name}</h1>
    

        </div>
    )
}
export default UserProfile;