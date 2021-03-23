import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as partyActions from '../../store/party'
import * as itemActions from '../../store/item'
import * as inviteActions from '../../store/guestList'
import './index.css'
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const Party = ({ edit, guests }) => {
    const history = useHistory();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [userList, setUserList] = useState('')
    const items = useSelector(state => Object.values(state.items))
    
    let content;
    let errordiv;
    let nameContent;
    let locationContent;
    let detailsContent;
    let starts_atContent;
    let timeContent;
    let imageContent;
    let itemContent;
    let guestContent;
    
    if(!user){
        history.push('/')
    }
    let host_id
    if(user){
        host_id = user.id;
    }
    
    let submitContent;
    const onEdit = async (e) => {
        e.preventDefault()
        const party = await dispatch(partyActions.updateParty(
            edit.id,
            host_id,
            name,
            details,
            starts_at,
            time,
            image_url,
            location))
        guestList.invites.map(async (user_id) => {
            if (user_id) {
                await dispatch(inviteActions.inviteGuest(party.id, user_id))
            }
        })
        itemList.items.map(async (item)=>{
            if(item.id){
            }
        })
        history.push('/')
    }
    if (edit) {
        nameContent = edit.name
        locationContent = edit.location
        detailsContent = edit.name
        imageContent = edit.image_url
        starts_atContent = edit.starts_at
        timeContent = edit.time
        let item_List = []
        items.map(item => {
            item_List.push({item: item})
        })
        itemContent = { items: item_List }
        let guest_List = []
        if (guests) {
            guests.guest_list.map(guest => {
                guest_List.push(guest.id)
            })
        }
        guestContent = { invites: guest_List}
        submitContent = (
            <button onClick={onEdit} className='button_secondary'>Edit me</button>
            ) 
    }
    if (!edit) {
        nameContent = ''
        locationContent = ''
        detailsContent = 'Come join us for a party! Please bring an item from the list below!'
        starts_atContent = ''
        imageContent = "https://myplanits.s3-us-west-1.amazonaws.com/signup.jpg"
        timeContent = ''
        itemContent = { items: [''] }
        guestContent = { invites: [] }
        submitContent = (
            <button className='button_secondary'>Submit</button>
            )
        }
    const [name, setName] = useState(nameContent);
    const [details, setDetails] = useState(detailsContent);
    const [starts_at, setStarts_at] = useState(starts_atContent);
    const [location, setLocation] = useState(locationContent);
    const [time, setTime] = useState(timeContent);
    const [image_url, setImage_url] = useState(imageContent);
    const [state, setState] = useState(itemContent);
    const [guestList, setGuestList] = useState(guestContent)
    const [itemList, setItemList] = useState(guestContent)

    useEffect(async (e) => {
        async function fetchData() {
            const response = await fetch(`/api/users/me/friends`);
            const responseData = await response.json();
            setUserList(responseData.users);
        }
        fetchData();
    }, [count])

    const onSubmit = async (e) => {
        e.preventDefault();
        const party = await dispatch(partyActions.create(host_id, name, details, starts_at, time, image_url, location))
        if (!party.errors) {
            const party_id = party.id
            const user_id = null
            guestList.invites.map(async (user_id) => {          
                    await dispatch(inviteActions.inviteGuest(party_id, user_id))
            })
            state.items.map(async (name) => await dispatch(itemActions.addOneItem(name, party_id, user_id)))
            history.push('/')
        }
        if (party.errors) {
            errordiv = (
                <div>
                    <h3>Houston we have a problem: </h3>
                    {party.errors.map((error, i) => {
                        return (
                        <div key={i}>{error}</div>
                        )
                    })}
                </div>
            )
        }
    }
    const onInvite = async (e) => {
        e.preventDefault()
        guestList.invites.push(e.currentTarget.value)
        setGuestList({ invites: [...guestList.invites] })
    }
    const removeInvite = async (e) => {
        e.preventDefault()
        let index = guestList.invites.indexOf(e.currentTarget.value)
        guestList.invites.splice(index, 1)
        setGuestList({ invites: guestList.invites })
    } 
    const addItem = (e) => {
        e.preventDefault();
        setState({ items: [...state.items, ''] })
        
    }
    const handleChange = (e, index) => {
        e.preventDefault();
        state.items[index] = e.target.value
        setState({ items: state.items })
        itemList.items[index] = e.target.value
        setItemList({ items: [...itemList] })
    }
    const handleDelete = (e, index) => {
        e.preventDefault();
        state.items.splice(index, 1)
        setState({ items: state.items })
    }
    const onNext = (e) => {
        e.preventDefault();
        window.scrollTo(0, 250)
        setCount(count + 1)
    }
    const onPrev = (e) => {
        e.preventDefault();
        window.scrollTo(0, 250)
        setCount(count - 1)
    }
    if (count === 1) {
        content = (
            <div className='planit__form--div'>
                <h2 className='title'>Tell us about your PlanIt</h2>
                <label>What is the name of your PlanIt?</label>
                <input
                    name='name'
                    type='text'
                    placeholder='Name of your PlanIt'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <label>Where is it located?</label>
                <input
                    name='location'
                    type='text'
                    placeholder='Where is your PlanIt located?'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <label>What day is the PlanIt?</label>
                <input
                    name='starts_at'
                    type='date'
                    value={starts_at}
                    onChange={e => setStarts_at(e.target.value)}
                />
                <label>What time does it start?</label>
                <input
                    name='time'
                    type='time'
                    value={time}
                    onChange={e => setTime(e.target.value)}
                />
                <label>What is your PlanIt for?</label>
                <textarea
                    name='details'
                    placeholder='Tell your galaxy about your PlanIt..'
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                />
                <div className='button__div' style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                    <IconButton  style={{ visibility: 'hidden' }} onClick={onPrev}>
                        <ArrowBackIosIcon style={{display: 'none'}} />
                    </IconButton>
                    <IconButton onClick={onNext}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </div>
            </div>
        )
    }
    if (count === 2) {
        content = (

            <div className='planit__form--div'>
                <h2 className='title'>Tell your galaxy what to bring</h2>
                {state.items.map((item, index) => {
                    return (
                        <div className='party_item--input' key={index}>
                            <input
                                value={item}
                                placeholder='enter item name'
                                onChange={e => handleChange(e, index)}
                            />
                            <IconButton aria-label="delete" onClick={e => handleDelete(e, index)}>
                                <DeleteIcon />
                            </IconButton>
                           
                        </div>
                    )
                })}
                <IconButton aria-label='add' onClick={e => addItem(e)}>
                    <AddCircleOutlineIcon />
                </IconButton>
                <div className='button__div' style={{ flexDirection: 'row', justifyContent:'space-between', width: '100%',}}>
                    <IconButton onClick={onPrev}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <IconButton  onClick={onNext}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </div>
            </div>
        )
    }
    if (count === 3) {
        content = (
            <div className='planit__form--div'>
                <h2 className='title'> Invite your friends to the galaxy </h2>
                {userList.map((user, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <img className='onePlanit--img' src={user.image_url} />
                                {user.first_name} {user.last_name}
                                {console.log(guestList)}
                                {guestList.invites.includes(`${user.id}`) ?
                                    <IconButton className='mdc-icon-button' aria-label='delete' value={user.id} onClick={e => removeInvite(e, index)}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton> :
                                    <IconButton className='mdc-icon-button' aria-label='add' value={user.id} onClick={e => onInvite(e, index)}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                }
                            </div>
                            {/* <button value={user.id} onClick={e => onInvite(e, index)}>invite me</button> */}
                        </div>
                    )
                })}
                <div className='button__div' style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                    <IconButton onClick={onPrev}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton onClick={onNext}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </div>
            </div>
        )
    }
    if (count === 4) {
        content = (
            <div className='planit__form--div'>
                <h2 className='title'>Choose a photo for your party</h2>
                <div className='photo-div'>
                    <img src={image_url} alt='party' className='planit__img'></img>
                </div>
                <select
                    value={image_url}
                    onChange={e => setImage_url(e.target.value)}
                >
                    <option value='https://myplanits.s3-us-west-1.amazonaws.com/newyear.jpg'>New Year</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/valentines.jpg">Valentines</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/stpatrick.jpg">St. Patrick's</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/easter.jpg">Easter</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/mothers.jpg">Mother's Day</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/fathers.jpg">Father's Day</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/july4th.jpg">4th of July</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/halloween.jpg">Halloween</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/thanksgiving.jpg">Thanksgiving</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/christmas.jpg">Christmas</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/birthday.jpg">Birthday</option>
                    <option value="https://myplanits.s3-us-west-1.amazonaws.com/signup.jpg">Other</option>
                    {/* <option value={image_url}>add my own photo</option> */}
                </select>
                {/* <input
                        name='image_url'
                        type='file'
                        onChange={e => setImage_url(e.target.value)}
                        /> */}
                <div className='button__div' style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                    <IconButton onClick={onPrev}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton onClick={onNext}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </div>
            </div>
        )
    }
    if (count === 5) {
        content = (
            <div className='planit__form--div'>
                <h1 className='title'>Prepare to Launch</h1>
                <img src='https://myplanits.s3-us-west-1.amazonaws.com/giphy.gif' style={{ boxShadow: '5px 5px 10px rgb( 0 0 0 / 25%)', maxWidth: '20rem', borderRadius: '4px'}} />
                {errordiv}
                {submitContent}
                <div className='button__div' style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                    <IconButton onClick={onPrev}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton style={{ display: 'none' }} onClick={onNext}>
                        <ArrowForwardIosIcon style={{display:'none'}}/>
                    </IconButton>
                </div>
            </div>
        )

    }
    return (
        <div className='planit__form'>
            <h1 className='title'>Host your PlanIt</h1>
            <form onSubmit={onSubmit} className='planit__form'>
                {content}
            </form>
        </div>
    )
}

export default Party;