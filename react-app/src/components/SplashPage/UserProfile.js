/** @jsx jsx */
import {jsx } from '@emotion/react'
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link} from 'react-router-dom';
import * as partyActions from '../../store/party'
import * as itemActions from '../../store/item'
import { realDate, realTime } from '../../services/utils';

const UserProfile = ({user}) =>{
    const [hosted, setHosted] = useState('')
    const [items, setItems] = useState('')
    const dispatch = useDispatch()

    useEffect(async (e) =>{
        if(user){
            const hosting = await dispatch(partyActions.loadParties(user.id))
            const items = await dispatch(itemActions.loadMyItems(user.id))
            // const visiting = await dispatch(partyActions.loadParties(user.id))
            setHosted(hosting)
            setItems(items)

        }
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
    let imageContent;
    let initials = user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase()
    if(!user.image_url){
        imageContent = 
            <div>
            <div className='blank'>
            {initials}
            </div>
            <img className='profile--pic' src='https://myplanits.s3-us-west-1.amazonaws.com/Screen+Shot+2021-03-08+at+4.58.09+PM.png' />
            </div>
    }
    if(user.image_url){
        imageContent = <img className='profile--pic' alt='profile' src={user.image_url} />
    }
    return (
        <div className='home__info2'>
            <div className='img-container'>
                {imageContent}
            </div>
            <div className='profile--welcome'>
                <p className='profile--welcome'> Welcome back, {user.first_name}!</p>
                <Link to='/planits/create' className='button_primary'>Host a PlanIt</Link>
                <Link to='/users' className='button_secondary'> Find my friends </Link>
            </div>    
            
            <div className='standard__form--container'>
                <div className='standard__form--div2'>
                    <h1> PlanIts hosted by you </h1>
                    {hosted.hosted_parties.map((party, i) => {
                       return (
                           <div key={party.id} >
                               <Link key={i} to={`/planits/${party.id}`} className='party-tag' style={{ padding: '1rem', display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                                        <img src={party.image_url} className='profile__party-pic'/>
                                        <div style={{padding: '0rem 1rem'}}>
                                            <h2 style={{ textTransform: 'capitalize'}}>{party.name}</h2>
                                            <p>{realDate(party.starts_at)}</p>
                                            <p style={{margin: '2rem'}}>{realTime(party.time)}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div key={i+party.id}>
                                    <hr /> 
                                </div>
                            </div>
                        )
                        })}
                    {/* <Link className='button_primary' to={`/user/${user.id}/planits`}> View all my PlanIts </Link> */}
                </div>
                <div className='standard__form--div2'>
                    <h1> PlanIts to visit </h1>
                    {hosted.visiting_parties.map((party, i) => {
                        console.log(party, '===========')
                       return (
                           <div key ={party.id}> 
                                <Link key={i} to={`/planits/${party.party.id}`} className='party-tag'>
                                    <img src={party.party.image_url} className='profile__party-pic'/>
                                    <h2>{party.party.name}</h2>
                                    <div>
                                       <p>{realDate(party.party.starts_at)}</p>
                                        <p>{realTime(party.party.time)}</p>
                                    </div>
                                </Link>
                                <div key={i+party.id}>
                                    <hr /> 
                                </div>
                            </div>
                        )
                        })}
                    {/* <Link className='button_primary' to={`/user/${user.id}/planits`}> View all my PlanIts </Link> */}
                </div>
                {/* <div className='standard__form--div2'>
                    <h1> for visiting parties </h1>
                </div> */}
                <div className='standard__form--div2'>
                    <h1> Supplies you're bringing </h1>
                    {items.party_items.map((item, i)=>{
                        return (
                            <div key={item.id}>
                                <Link key={i} to={`/planits/${item.party.id}`} className='party-tag'>
                                    <img src={item.party.image_url} className='profile__party-pic'/>
                                    <h2>{item.name}</h2>
                                    <div>
                                    <p>{item.party.name}</p>
                                    <p>{realDate(item.party.starts_at)}</p>
                                    <p>{realTime(item.party.time)}</p>
                                    </div>
                                </Link>
                                    <div key={i+item.id}>
                                        <hr /> 
                                    </div>
                            </div>
                        )
                    })}
                    {/* <Link className='button_primary' to={`/user/${user.id}/items`}> View all my Items </Link> */}
                </div>
            </div>
        </div>
    )
}
export default UserProfile;