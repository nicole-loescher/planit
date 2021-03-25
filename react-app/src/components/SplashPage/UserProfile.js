/** @jsx jsx */
import {jsx } from '@emotion/react'
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link} from 'react-router-dom';
import * as partyActions from '../../store/party'
import * as itemActions from '../../store/item'
import { realDate, realTime } from '../../services/utils';
import * as authActions from '../../store/auth'

const UserProfile = ({user}) =>{
    const [hosted, setHosted] = useState('')
    const [items, setItems] = useState('')
    const dispatch = useDispatch()
    const [image, setImage] = useState('')

    useEffect(async (e) =>{
        if(user){
            const hosting = await dispatch(partyActions.loadParties(user.id))
            const items = await dispatch(itemActions.loadMyItems(user.id))
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
    const updateImage = async(e) => {
        e.preventDefault()
        await dispatch(authActions.updatePhoto(user.id, e.target.files[0]))
    };
    if(user.image_url){
        imageContent = 
            <label htmlFor='photoUpload'> 
                <span
                // style={{
                  //     backgroundImage: `url("${user.image_url}")`,
                  //     borderRadius: '100%',
                  //     width: '8rem',
                  //     height: '8rem',
                  //     outline: 'none',
                  //     backgroundSize: 'cover',
                  //     margin: '1rem',
                  // }} 
                  aria-hidden="true"
                  />
                  <img className='profile--pic' alt='profile' src={user.image_url} />
                <input type='file' id='photoUpload'style={{display: 'none'}} onChange={updateImage} />
            </label>
        {/* imageContent = <img className='profile--pic' alt='profile' src={user.image_url} /> */}
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
                    {hosted.hosted_parties.length < 1 ? 
                            <div>
                            <img src='https://myplanits.s3-us-west-1.amazonaws.com/space-jam-7.gif' style={{ maxHeight: '20rem', borderRadius: '2rem' }} />
                                <p>Your galaxy is lonely</p>
                                <Link to='/planits/create' className='button_primary'>Host a PlanIt</Link>
                            </div>
                            
                            : hosted.hosted_parties.map((party, i) => {
                                return (
                                    <div key={party.id} >
                                        <Link key={i} to={`/planits/${party.id}`} style={{ padding: '1rem', display: 'block', justifyContent:'flex-start'}}>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <img src={party.image_url} className='profile__party-pic'/>
                                                    <div style={{padding: '0rem 1rem', textAlign: 'right'}}>
                                                        <h2 style={{ textTransform: 'capitalize'}}>{party.name}</h2>
                                                        <p>{realDate(party.starts_at)}</p>
                                                        <p>{realTime(party.time)}</p>
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
                    {hosted.visiting_parties.length <= 0 ?
                        <div>
                            <img src='https://myplanits.s3-us-west-1.amazonaws.com/planit.gif' style={{ maxHeight: '16rem', borderRadius: '2rem' }} />
                            <p>It looks like you arent visiting any PlanIts</p>
                        </div>
                        :hosted.visiting_parties.map((party, i) => {
                            {console.log(party, '...............')}
                            return (
                                <div key ={party.id}> 
                                    <Link key={i} to={`/planits/${party.party_id}`} style={{ padding: '1rem', display: 'block', justifyContent: 'flex-start' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <img src={party.image_url} className='profile__party-pic'/>
                                            <h2 style={{ textTransform: 'capitalize' }}>{party.name}</h2>
                                        <div style={{ padding: '0rem 1rem', textAlign: 'right' }}>
                                            <p>{realDate(party.starts_at)}</p>
                                            <p>{realTime(party.time)}</p>
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
                {/* <div className='standard__form--div2'>
                    <h1> for visiting parties </h1>
                </div> */}
                <div className='standard__form--div2'>
                    <h1> Supplies you're bringing </h1>
                    {items.party_items < 1 ?
                        <div>
                            <img src='https://myplanits.s3-us-west-1.amazonaws.com/food.gif' style={{maxHeight:'20rem', borderRadius: '2rem'}} />
                            <p> You arent bringing anything, checkout your PlanIts and sign up!</p>
                        </div>
                        : items.party_items.map((item, i)=>{
                            return (
                                <div key={item.id}>
                                    <Link key={i} to={`/planits/${item.party.id}`} style={{ padding: '1rem', display: 'block', justifyContent: 'flex-start' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <img src={item.party.image_url} className='profile__party-pic'/>
                                        <h2>{item.name}</h2>
                                        <div style={{ padding: '0rem 1rem', textAlign: 'right' }}>
                                        <p style={{textTransform: 'capitalize'}}>{item.party.name}</p>
                                        <p>{realDate(item.party.starts_at)}</p>
                                        <p>{realTime(item.party.time)}</p>
                                        </div>
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