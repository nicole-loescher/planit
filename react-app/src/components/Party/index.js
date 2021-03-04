import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as partyActions from '../../store/party'
import * as itemActions from '../../store/item'
import './index.css'

const Party = () => {
    const user = useSelector(state => state.auth.user)
    const host_id = user.id
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [starts_at, setStarts_at] = useState('');
    const [ends_at, setEnds_at] = useState('');
    const [image_url, setImage_url] = useState('');
    const [location, setLocation] = useState('');
    const [state, setState] = useState({items: []})

    const onSubmit = async (e) => {
        e.preventDefault();
        const party = await dispatch(partyActions.create(host_id, name, details, starts_at, ends_at, image_url, location))
        if(party){
            const party_id = party.id
            const user_id = null
            state.items.map(async(name)=> await dispatch(itemActions.addOneItem(name, party_id, user_id)))
        }
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

    return(
        <div className='planit__form'>
            {/* <div> */}
            <h1 className='title'>Host your PlanIt</h1>
            <form onSubmit={onSubmit} className='planit__form'>
                <div className='planit__form--div'>
                    <h2>Tell us about your PlanIt</h2>
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
                    onChange={e=> setLocation(e.target.value)}
                    />
                    <label>When does it start?</label>
                    <input
                    name='starts_at'
                    type='date'
                    value={starts_at}
                    onChange={e => setStarts_at(e.target.value)}
                    />
                    <label>When does it end?</label>
                    <input
                    name='ends_at'
                    type='date'
                    value={ends_at}
                    onChange={e => setEnds_at(e.target.value)}
                    />
                    <label>What is your PlanIt for?</label>
                    <textarea
                    name='details'
                    placeholder='Tell your galaxy about your PlanIt..'
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    />
                </div>
                <div className='planit__form--div'>
                    <h3>Tell your galaxy what to bring</h3>
                    {state.items.map((item, index)=>{
                        return (
                            <div key={index}>
                                <input 
                                value={item}
                                placeholder='enter item name' 
                                onChange={e => handleChange(e, index)}
                                />
                                <button onClick={e => handleDelete(e, index)}>Delete</button>
                            </div>
                        )
                    })}
                    <button onClick={e => addItem(e)}>Add more items</button>
                </div>
                <div className='planit__form--div'>
                    <h1>upload a photo for your party</h1>
                    <h3> or choose from ours!</h3>
                    <div className='photo-div'>
                        <img src={image_url} alt='party'></img>
                    </div>
                    <select
                    value={image_url}
                    onChange={e => setImage_url(e.target.value)}
                    >
                    <option value='https://myplanits.s3-us-west-1.amazonaws.com/signup.jpg'>New Year</option>
                    <option value="">Valentines</option>
                    <option value="mercedes">St. Patrick's</option>
                    <option value="">Easter</option>
                    <option value="">Mother's Day</option>
                    <option value="">Father's Day</option>
                    <option value="">4th of July</option>
                    <option value="">Halloween</option>
                    <option value="">Thanksgiving</option>
                    <option value="">Christmas</option>
                    <option value="">Birthday</option>
                    <option value={image_url}>add my own photo</option>
                    </select>
                    <input
                        name='image_url'
                        type='file'
                        onChange={e => setImage_url(e.target.value)}
                        />
                        </div>
<button className='button_secondary'>Submit</button>
                </form>
            {/* </div> */}
        </div>
    )
}
export default Party;