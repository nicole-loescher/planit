import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);
  const current_user = useSelector(state => state.auth.user)
  const addFriend = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/users/me/friends/${e.target.value}`, {method: 'POST'});
    const friend = await response.json();
    console.log(friend)
  }
  console.log(current_user)
  // let buttonContent;
  // if()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    console.log(user.friends)
    return (
      <div  className='friends--content' key={user.id}>
        <div style={{display:'flex', flexDirection: 'column'}}>
          <NavLink style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }} to={`/users/${user.id}`}>
            <img src={`${user.image_url}`} alt='user' className='friends--pic' />
            <div>
              {user.first_name} {user.last_name}
            </div>
          </NavLink>       
          <button className='button_primary' onClick={addFriend} value={user.id}> add friend</button>
        </div>
      </div>
    );
  });

  return (
    <>
      <h1 style={{textAlign:'center'}}>Add your friends to your Galaxy!! </h1>
      <div className='friends--container'>
        {userComponents}
      </div>
    </>
  );
}

export default UsersList;
