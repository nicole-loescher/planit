import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.css'
import UserProfile from './UserProfile';

const SplashPage = ({ authenticated }) => {
    let content;
    const user = useSelector(state => state.auth.user)
    if(authenticated){
       
        content =(
            <UserProfile user={user} />
        )
    }
    else{
        content = (
        <div>
            <div className='home__info'>
                <div className='home__info--tag'>
                    <h1 className='home__info--welcome'>Welcome to PlanIt!</h1>
                    <p>The app designed to help
                    you plan that next
                    potluck without all the fuss!
                    </p>
                    <Link to='/sign-up'><button className='button_secondary'>Sign Up Today!</button></Link>
                </div>
                <div >
                    <img className='home__info--img' src='https://myplanits.s3-us-west-1.amazonaws.com/partyplanit.png' alt='planit banner' />
                </div>
            </div>
            <div className='home__howto'>
                    <h1 className='home__info--welcome' >How it works</h1>
                <p> 1. Invite your friends to your galaxy.</p>
                <p> 2. Host a party (PlanIt) and tell your galaxy what you need!</p>
                <p> 3. Your galaxy can sign up for the items/dish they are bringing.</p>
                <p> 4. Know who is bringing what (without the endless group chats!).</p>
                <p> 5. Have fun and Enjoy your PlanIt!</p>
                <Link to='/sign-up'><button className='button_secondary'>Sign Up Today!</button></Link>
            </div>
        </div>)
    }
    return (
        <div>
            {content}
        </div>
    )
}

export default SplashPage;