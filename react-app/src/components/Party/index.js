import React, { useState } from 'react';

const Party = () => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const [image_url, setImage_url] = useState('');
    const [item, setItem] = useState([]);
    const [location, setLocation] = useState('');
    const [guest, setGuest] = useState([]);
    const items = [...item]

    return(
        <div className='standard__form'>
            <div className='standard__form--div'>
                <h1>
                    Host your PlanIt
                </h1>
                <form>
                    <input
                    name='name'
                    type='text'
                    placeholder='Name of your PlanIt'
                    value={name}
                    onChange={e=> setName(e.target.value)}
                    />
                    <input
                    name='location'
                    type='text'
                    placeholder='Where is your PlanIt'
                    value={location}
                    onChange={e=> setLocation(e.target.value)}
                    />
                    <input
                    name='date'
                    type='datetime-local'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    />
                    <textarea
                    name='details'
                    placeholder='Tell your galaxy about your PlanIt..'
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    />
                   
                    <input
                    name='item'
                    placeholder='Add supplies to your list'
                    type='text'
                    value={item}
                    onChange={e => setItem(e.target.value)}
                    />
                    <input
                    name='guest'
                    placeholder='Add friends to your galaxy'
                    type='text'
                    value={guest}
                    onChange={e => setGuest(e.target.value)}
                    />
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