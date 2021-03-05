import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadAllItems } from '../../store/item';
import {getOneParty} from '../../store/party'

const OneParty = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [party, setParty] = useState('');
    const items = useSelector(state => state.items.items[0])
    const host = party.host

    // console.log(items[0]);

    useEffect(async()=>{
        const newparty = await dispatch(getOneParty(id))
        const allItems = await dispatch(loadAllItems(newparty.id))
        // console.log(newparty)
        setParty(newparty)
        // setItems(allItems)
    },[dispatch])

    if(!items){
        return null
    }

    return (
        <div className='planit__form'>
            <h1>{party.name}</h1>
            <div className='party__div'>
                <div>
                    <img src={party.image_url} alt='party' className='party_pic' />
                </div>
                <div>
                    <h3>A message from the shooting star:</h3>
                    <p>{party.details}</p>
                </div>
                <div>
                    <h3>The Planit time:</h3>
                    <p>{party.starts_at}</p>
                    <p>{party.ends_at}</p>
                </div>
                <div>
                    <h3>The Planit location:</h3>
                    <p>{party.location}</p>
                
                </div>
                <div>
                    <h3>The Shooting Star:</h3>
                    <p>{party.host_id}</p>
                </div>
            </div>
            <div className='party__div'>
                <div>
                    <h3>Supplies needed for the PlanIt:</h3>
                    <p>Sign up by clicking an item below!</p>
                    {items.map((item, i)=>{
                        return ( 
                            <div key={i}>
                                {item.name}
                            </div>
                            )
                        })}
                </div>
            </div>
            {/* {host.first_name} */}
        </div>
    )
}
export default OneParty;