import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Party from '.';
import { loadAllItems } from '../../store/item';
import {deleteParty, getOneParty} from '../../store/party'

const OneParty = () => {
    const user = useSelector(state => state.auth.user)
    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();
    const [party, setParty] = useState('');
    const items = useSelector(state => state.items.items[0])
    const host = party.host
    
    useEffect(async()=>{
        const newparty = await dispatch(getOneParty(id))
        const allItems = await dispatch(loadAllItems(newparty.id))
        setParty(newparty)
    },[dispatch])
    
    if(!items){
        return null
    }
    if(!host){
        return 'loading'
    }
    const bringItem = async (e) => {
        e.preventDefault();
        
    }
    const onDelete = async (e) =>{
        e.preventDefault();
        dispatch(deleteParty(party.id))
        
    }
    const onEdit = async (e) =>{
        e.preventDefault()
        console.log('working on edit functionality')
    }
    const onRSVP = async (e) =>{
        e.preventDefault()
    }
    let content2;
    if(host.id === user.id){
        content2 = (
            <div>
                <button onClick={onEdit}>edit</button>
                <button onClick={onDelete}>delete</button>
            </div>
        )
    }
    if(host.id !== user.id){
        content2 = (
            <button onClick={onRSVP}>RSVP</button>
        )
    }
 

    return (
        <div className='planit__form'>
                <h1 className='party__title'>{party.name}</h1>
            <div className='party__form--div'>
                <div className='party__div--img'>
                    <div>
                        <img src={party.image_url} alt='party' className='party_pic' />
                        <div>
                            <h3>The Shooting Star:</h3>
                            <p> {host.image_url}
                                {host.first_name}</p>
                        </div>
                    </div>
                    <div className='party__div'>
                        <div>
                            <p className='party__date'>{party.starts_at}</p>
                            <p className='party__time'>start and end time here</p>
                            {/* <p>{party.ends_at}</p> */}
                        </div>
                        <div>
                            <h3 className='party__location'>The Planit location:</h3>
                            <p className='party__location'>{party.location}</p>
                        
                        </div>
                        <div>
                            <h3>A message from the shooting star:</h3>
                            <p>{party.details}</p>
                        </div>
                    </div>
                </div> 
            </div>
                <div className='party__div'>
                    <div>
                        <h3>Supplies needed for the PlanIt:</h3>
                        <p>Sign up by clicking an item below!</p>
                        {items.map((item, i)=>{
                            return ( 
                                <div key={i}>
                                    <button onClick={bringItem}>Bring me</button>
                                    {item.name}
                                </div>
                                )
                            })}
                    </div>
                </div>
                {content2}
        </div>
    )
}
export default OneParty;