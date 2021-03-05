import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadAllItems } from '../../store/item';
import {getOneParty} from '../../store/party'

const OneParty = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [party, setParty] = useState('');
    const [items, setItems] = useState('')
    const host = party.host
    // console.log(party);

    useEffect(async()=>{
        const newparty = await dispatch(getOneParty(id))
        const allItems = await dispatch(loadAllItems(newparty.id))
        // console.log(newparty)
        setParty(newparty)
        setItems(allItems)
    },[dispatch])

    console.log(host)

    return (
        <div className='standard__form'>
            <h1>Single Party resource</h1>
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
            {/* {host.first_name} */}
        </div>
    )
}
export default OneParty;