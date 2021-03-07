/** @jsx jsx */
import {jsx } from '@emotion/react'
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link} from 'react-router-dom';
import * as partyActions from '../../store/party'
const UserProfile = ({user}) =>{
    const [hosted, setHosted] = useState('')
    console.log(hosted, '-------')
    const dispatch = useDispatch()

    useEffect(async(e)=>{
        const hosting = await dispatch(partyActions.loadParties(user.id))
        console.log(hosting)
        setHosted(hosting)
    },[dispatch])
    if(!user ){
        return <h1>Loading...</h1>
    }
    if(!hosted ){
        return null
    }
    return (
        <div className='home__info'>
            <div>
                <img className='profile--pic' alt='profile' src='https://myplanits.s3-us-west-1.amazonaws.com/nicolePhoto.jpeg' />
                <Link to='/planits/create' className='button_secondary'>Host a PlanIt</Link>
            </div>
            {/* <div className='profile--welcome'>
                <p className='profile--welcome'> Welcome back, {user.first_name}!</p>
            </div>     */}
            
            <div className='standard__form--container'>
                <div className='standard__form--div2'>
                    <h1> for hosted parties </h1>
                    {hosted.hosted_parties.map((party, i) => {
                       return ( <div key={i}>
                            {party.name} : {party.starts_at}
                        </div>
                       )
                    })}
                </div>
                <div className='standard__form--div2'>
                    <h1> for visiting parties </h1>
                </div>
                <div className='standard__form--div2'>
                    <h1> for items </h1>
                </div>
            </div>
        </div>
    )
}
export default UserProfile;