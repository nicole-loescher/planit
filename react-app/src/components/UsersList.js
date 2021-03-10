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
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.first_name} {user.last_name}</NavLink>
        {console.log(user)}
        <button onClick={addFriend} value={user.id}> add friend</button>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
