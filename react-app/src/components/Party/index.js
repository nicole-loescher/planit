import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as partyActions from '../../store/party'
import * as itemActions from '../../store/item'
import './index.css'
import { useHistory } from 'react-router-dom';

const Party = ({edit, items}) => {
    const history = useHistory();
    const user = useSelector(state => state.auth.user);
    const host_id = user.id;
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    
    let content;
    let errordiv;
    let nameContent;
    let locationContent;
    let detailsContent;
    let starts_atContent;
    let timeContent;
    let imageContent;
    let itemContent;
    
    if(edit){
        nameContent = edit.name
        locationContent = edit.location
        detailsContent = edit.name
        imageContent = edit.image_url
        starts_atContent = edit.starts_at
        timeContent = edit.time
        let itemList=[]
        items.map(item=>{
            itemList.push(item.name)
        })
        itemContent = {items: itemList}
        
    }
    if(!edit){
        nameContent = ''
        detailsContent = 'Come join us for a party! Please bring an item from the list below!'
        starts_atContent = ''
        imageContent = "https://myplanits.s3-us-west-1.amazonaws.com/signup.jpg"
        timeContent = ''
        itemContent = { items: [''] }
    }
    
    const [name, setName] = useState(nameContent);
    const [details, setDetails] = useState(detailsContent);
    const [starts_at, setStarts_at] = useState(starts_atContent);
    const [location, setLocation] = useState(locationContent);
    const [time, setTime] = useState(timeContent);
    const [image_url, setImage_url] = useState(imageContent);
    const [state, setState] = useState(itemContent);
    
    useEffect(async (e) => {
        
    },[count])

    const onSubmit = async (e) => {
        e.preventDefault();
        const party = await dispatch(partyActions.create(host_id, name, details, starts_at, time, image_url, location))
        if(!party.errors){
            const party_id = party.id
            const user_id = null
            state.items.map(async(name)=> await dispatch(itemActions.addOneItem(name, party_id, user_id)))
            history.push('/')
        }
        if(party.errors) {
            return errordiv = (
                <div>
                    <h3>Houston we have a problem: </h3>
                    {party.errors.map((error, i) => (
                        <div key={i}>{error}</div>
                        ))}
                        {console.log(party.errors)}
                </div>
            )
        }
    }
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
        history.push('/')
    }
    const addItem = (e) =>{
        e.preventDefault();
        setState({items: [...state.items, '']})
    }
    const handleChange = (e, index) =>{
        e.preventDefault();
        state.items[index] = e.target.value
        setState({items: state.items})
    }
    const handleDelete = (e, index)=>{
        e.preventDefault();
        state.items.splice(index, 1)
        setState({items: state.items})
    }
    const onNext = (e) => {
        e.preventDefault();
        setCount(count + 1)
    }
    const onPrev = (e) => {
        e.preventDefault();
        setCount(count - 1)
    }
    if(count === 1){
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
                    type='text'
                    placeholder='What time is your PlanIt?'
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
                <button className='button_primary' onClick={onNext}>Next</button>
            </div>
        )
    }
    if(count === 2){
        content = (
            
                <div className='planit__form--div'>
                <h2 className='title'>Tell your galaxy what to bring</h2>
                    {state.items.map((item, index)=>{
                        return (
                            <div key={index}>
                                <input 
                                value={item }
                                placeholder='enter item name' 
                                onChange={e => handleChange(e, index)}
                                />
                                <button onClick={e => handleDelete(e, index)}>Delete</button>
                            </div>
                        )
                    })}
                    <button className='button_secondary' onClick={e => addItem(e)}>Add items</button>
                    <div className='button__div'>
                        <button className='button_primary' onClick={onNext}>next</button>
                        <button className='button_primary' onClick={onPrev}>Previous</button>
                    </div>
                </div>
        )
    }
    if(count === 3){
        content = (
            <div className='planit__form--div'>
                <h2 className='title'>Choose a photo for your party</h2>
                <div className='photo-div'>
                    <img src={image_url} alt='party' className='planit__img'></img>
                </div>
                <select
                    value={image_url }
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
                <button className='button_primary' onClick={onNext}>next</button>
                <button className='button_primary' onClick={onPrev}>Previous</button>
            </div>
        )
    }
    if(count === 4){
        if(edit){
            content = <button onClick={onEdit} > submit changes </button>
        }
        else{

            content = (
                <div className='planit__form--div'>
                    <h1 className='title'>Prepare to Launch</h1>
                    {errordiv}
                    <button className='button_secondary'>Submit</button>
                    <button className='button_primary' onClick={onPrev}>Previous</button>
                </div>
            )
        }
    }
    return(
        <div className='planit__form'>
            <h1 className='title'>Host your PlanIt</h1>
            <form onSubmit={onSubmit} className='planit__form'>
                {content}
            </form>  
        </div>
    )
}
export default Party;