import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

const SplashPage = () => {

    return (
        <div>
            <div className='home__info'>
                <div className='home__info--tag'>
                    <p>Welcome to PlanIt!
                    The app designed to help 
                    you plan that next
                    potluck without all the fuss!
                    Sign up today and host
                    your first PlanIt!!!</p>
                    <Link to='/sign-up'><button className='button_secondary'>Sign Up Today!</button></Link>
                </div>
                <div >
                    <img className='home__info--img' src='/partyplanit.png' />
                </div>
            </div>
            <div className='home__howto'>
                <h1>How it works</h1>
                <p> 1. Invite your friends to your galaxy.</p>
                <p> 2. Host a party(PlanIt) and tell your galaxy what you need!</p>
                <p> 3. Your galaxy can sign up for the items/dish they are bringing.</p>
                <p> 4. Have fun! Enjoy your PlanIt and know who is bringing what(without the endless group chats!)</p>
                <Link to='/sign-up'><button className='button_primary'>Sign Up Today!</button></Link>
            </div>
        </div>

    )
}

export default SplashPage;