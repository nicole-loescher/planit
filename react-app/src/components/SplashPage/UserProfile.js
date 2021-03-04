/** @jsx jsx */
import {jsx } from '@emotion/react'
import { Link} from 'react-router-dom';
const UserProfile = ({user}) =>{
    if(!user){
        return <h1>Looading...</h1>
    }
    return (
        <div className='home__info'>
            <img className='profile--pic' alt='profile' src='https://myplanits.s3-us-west-1.amazonaws.com/nicolePhoto.jpeg' />
            <h1 className='profile--welcome'> Welcome back, {user.first_name}!</h1>
            <Link to='/planits/create' className='button_secondary'>Host a PlanIt</Link>
        </div>
    )
}
export default UserProfile;