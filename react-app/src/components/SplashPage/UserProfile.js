/** @jsx jsx */
import {jsx } from '@emotion/react'
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link} from 'react-router-dom';
import * as partyActions from '../../store/party'
import * as itemActions from '../../store/item'
const UserProfile = ({user}) =>{
    const [hosted, setHosted] = useState('')
    const [items, setItems] = useState('')
    console.log(items, '-------')
    const dispatch = useDispatch()

    useEffect(async(e)=>{
        const hosting = await dispatch(partyActions.loadParties(user.id))
        const items = await dispatch(itemActions.loadMyItems(user.id))
        
        setHosted(hosting)
        setItems(items)
    },[dispatch])
    if(!user ){
        return <h1>Loading...</h1>
    }
    if(!hosted ){
        return null
    }
    if(!items ){
        return null
    }
    return (
        <div className='home__info'>
            <div>
                <img className='profile--pic' alt='profile' src='https://myplanits.s3-us-west-1.amazonaws.com/nicolePhoto.jpeg' />
            </div>
            <div className='profile--welcome'>
                <p className='profile--welcome'> Welcome back, {user.first_name}!</p>
                <Link to='/planits/create' className='button_primary'>Host a PlanIt</Link>
            </div>    
            
            <div className='standard__form--container'>
                <div className='standard__form--div2'>
                    <h1> PlanIts hosted by you </h1>
                    {hosted.hosted_parties.map((party, i) => {
                       return ( <Link key={i} to={`/planits/${party.id}`} className='party-tag'>
                           <img src={party.image_url} className='profile__party-pic'/>
                           {party.name} : {party.starts_at}
                        </Link>
                       )
                    })}
                    <Link className='button_primary' to={`/user/${user.id}/planits`}> View all my PlanIts </Link>
                </div>
                {/* <div className='standard__form--div2'>
                    <h1> for visiting parties </h1>
                </div> */}
                <div className='standard__form--div2'>
                    <h1> Supplies you're bringing </h1>
                    {items.party_items.map((item, i)=>{
                        return (
                            <Link key={i} to={`/planits/${item.party.id}`} className='party-tag'>
                                <img src={item.party.image_url} className='profile__party-pic'/>
                                {item.name}
                                {item.party.name}
                                </Link>
                        )
                    })}
                    <Link className='button_primary' to={`/user/${user.id}/items`}> View all my Items </Link>
                </div>
            </div>
        </div>
    )
}
export default UserProfile;