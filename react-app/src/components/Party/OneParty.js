import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Party from '.';
import { loadAllItems, claimOneItem, unclaimOneItem } from '../../store/item';
import {deleteParty, getOneParty} from '../../store/party'
import { loadGuests } from '../../store/guestList'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import {realDate, realTime} from '../../services/utils';

const OneParty = () => {
    const user = useSelector(state => state.auth.user)
    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();
    const [party, setParty] = useState('');
    const items = useSelector(state => Object.values(state.items))
    const host = party.host
    const [editForm, setEditForm] = useState(false)
    const [guests, setGuests] = useState('')
    
    let content
    const bringItem = async (e) => {
        e.preventDefault();
        await dispatch(claimOneItem(e.currentTarget.value))
    }
    const cancelBring = async (e) => {
        e.preventDefault();
        await dispatch(unclaimOneItem(party.id, e.target.value))
    }
    useEffect(async()=>{
        const newparty = await dispatch(getOneParty(id))
        const allItems = await dispatch(loadAllItems(newparty.id))
        const loadguestlist = await dispatch(loadGuests(newparty.id))
        setParty(newparty)
        setGuests(loadguestlist)
     
    },[dispatch, deleteParty])
    
    if(!items){
        return null
    }
    let guestContent;
    if(!host){
        guestContent = null
        return 'loading'
    }
    if(!guests){
        return 'loading'
    }
    if(guests){
        guestContent = (
            <div className='guest_content'>
                <h1 style={{textTransform: 'capitalize'}}>{party.name}'s Galaxy</h1>
                {guests.guest_list.map(guest => {
                    return (
                        <div key={guest.id} className='guest_card' >
                            <img src={guest.guest.image_url} style={{width: '4rem', height: '4rem', objectFit: 'cover', borderRadius: '100%'}} />
                            <p>{guest.guest.first_name}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
    const onDelete = async (e) =>{
        e.preventDefault();
        await dispatch(deleteParty(party.id))
        history.push('/')
        
    }
    const onEdit = async (e) =>{
        e.preventDefault()
        setEditForm(true)
        window.scrollTo(0, 0)
    }
    const onRSVP = async (e) =>{
        e.preventDefault()

    }
    
    let imageContent;
    // let initials = user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase()
    // if(!host.image_url){
    //     imageContent = 
    //     <div>
    //         {/* <div className='blank'>
    //         {initials}
    //     </div> */}
    //         <img  className='onePlanit--img' src='https://myplanits.s3-us-west-1.amazonaws.com/Screen+Shot+2021-03-08+at+4.58.09+PM.png' />
    //         </div>
    // }
    if(host.image_url){
        imageContent = <img className='onePlanit--img' alt='host of party' src={host.image_url} />
    }
    let content2;
    if(host.id === user.id){
        content2 = (
            <div className='button__div'>
                <button className='button_secondary' onClick={onEdit}>edit</button>
                <button className='button_secondary' onClick={onDelete}>delete</button>
            </div>
        )
    }
    if(host.id !== user.id){
        // content2 = (
            // <button className='button_secondary' style={{height: 'fit-content'}}onClick={onRSVP}>RSVP</button>
            // )
        }
        
        
        if(editForm){
            content = (
                <Party edit={party}/>
            )
        }
        if(!editForm){
            content = (
                <div>
                <div className='planit__page'>
                    <div>
                        <div className='party__div--img'>
                            <img src={party.image_url} alt='party' className='party_pic' />
                            <div>
                                <h3>The Shooting Star:</h3>
                            <div className='onePlanit--holder'>
                                {imageContent} 
                                <p className='name-tag'>{host.first_name}</p>
                            </div>
                            </div>
                        </div>
                    </div> 
                    <div className='party__div'>
                        <h1 className='party__title'>{party.name}</h1>
                        <div className='planit__info--div'>
                            <p className='party__location'>{realDate(party.starts_at)}</p>
                            <p className='party__time'>{realTime(party.time)}</p>
                    </div>
                        <div className='planit__info--div'>
                            <h3 className='party__location'>The Planit location:</h3>
                            <p className='party__time'>{party.location}</p>
                        </div>
                        <div className='planit__info--div'>
                            <h3 className='party__location'>A message from the shooting star:</h3>
                            <p className='party__time'>{party.details}</p>
                        </div>
                    </div>
                            {content2}
                    </div>
                    <div className='party__div--items'>
                        <div className='item_content'>
                            <h1>Supplies needed for the PlanIt:</h1>
                            <p>Sign up by clicking an item below!</p>
                            {items.map((item, i)=>{
                                return ( 
                                    <div key={i}>
                                        {item.user_id ?
                                            item.user_id === user.id ?
                                            <button value={item.id} style={{
                                                backgroundImage: `url("${item.guest.image_url}")`,
                                                objectFit: 'cover',
                                                borderRadius: '100%',
                                                width: '2rem',
                                                height: '2rem',
                                                outline: 'none',
                                                backgroundSize: 'cover',
                                                margin: '1rem'
                                            }} onClick={cancelBring}>
                                        </button> :
                                                <button style={{
                                                    backgroundImage: `url("${item.guest.image_url}")`,
                                                    borderRadius: '100%',
                                                    objectFit: 'cover',
                                                    width: '2rem',
                                                    height: '2rem',
                                                    outline: 'none',
                                                    backgroundSize: 'cover',
                                                    margin: '1rem'
                                                }} disabled> 
                                                </button>:
                                            <IconButton value={item.id} onClick={bringItem}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        }
                                        {item.name}
                                        {/* {item.user_id === user.id &&  
                                        <p>this claimed by you </p> 
                                        } */}
                                    </div>
                                    )
                                })}
                        </div>
                        {guestContent}
                    </div>
                </div>
            )
        }
        return (
            <div>
                {content}
            </div>
    )
}
export default OneParty;