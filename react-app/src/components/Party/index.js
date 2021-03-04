import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as partyActions from '../../store/party'

const Party = () => {
    const user = useSelector(state => state.auth.user)
    const host_id = user.id
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [starts_at, setStarts_at] = useState('');
    const [ends_at, setEnds_at] = useState('');
    const [image_url, setImage_url] = useState('');
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [location, setLocation] = useState('');
    const [guest, setGuest] = useState([]);

    const [state, setState] = useState({items: []})

    const onSubmit = async (e) => {
        e.preventDefault();
        const party = await dispatch(partyActions.create(host_id, name, details, starts_at, ends_at, image_url, location))
    }
    const itemSubmit = async (e) => {
        e.preventDefault();
        // const items = await dispatch(partyActions.addItem(name, quantity, party_id))
    }
    const guestSubmit = async (e) => {
        e.preventDefault();
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
        console.log(state.items, '...................')
        setState({items: state.items})
    }

    return(
        <div className='standard__form'>
            <div className='standard__form--div'>
                <h1>
                    Host your PlanIt
                </h1>
                <form onSubmit={onSubmit}>
                    <input
                    name='name'
                    type='text'
                    placeholder='Name of your PlanIt'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input
                    name='location'
                    type='text'
                    placeholder='Where is your PlanIt'
                    value={location}
                    onChange={e=> setLocation(e.target.value)}
                    />
                    <input
                    name='starts_at'
                    type='date'
                    value={starts_at}
                    onChange={e => setStarts_at(e.target.value)}
                    />
                    <input
                    name='ends_at'
                    type='date'
                    value={ends_at}
                    onChange={e => setEnds_at(e.target.value)}
                    />
                    <textarea
                    name='details'
                    placeholder='Tell your galaxy about your PlanIt..'
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    />
                    <button>Submit</button>
                   {/* </form> */}
                   {/* <form onSubmit={itemSubmit}> */}
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
                    {/* <input
                    name='item'
                    placeholder='Add supplies to your list'
                    type='text'
                    value={item}
                    onChange={e => setItem(e.target.value)}
                    />
                    <input
                    name='quantity'
                    type='number'
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    />
                    <button>add more items</button>
                    </form>
                    <form onSubmit={guestSubmit}>
                    <input
                    name='guest'
                    placeholder='Add friends to your galaxy'
                    type='text'
                    value={guest}
                    onChange={e => setGuest(e.target.value)}
                    />
                    <button>Add more guests</button> */}
                </form> 
            </div>
            <div className='photo_selector'>
                <h1>upload a photo for your party</h1>
                <h3> or choose from ours!</h3>
                <div className='photo-div'>
                    <img src={image_url} alt='party'></img>
                </div>
                <form>
                    <select
                    name='image_url'
                    >
                        <option value='image'>Christmas</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                    </select>
                    <input
                        name='image_url'
                        type='file'
                        value={image_url}
                        onChange={e => setImage_url(e.target.value)}
                    />
                </form>
            </div>
        </div>
    )
}
export default Party;