import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../components/UserContext';

import axios from 'axios';

const TeamModal = ({ showModal, handleModalDisplay, teamId, members }) => {
  const [users, setUsers] = useState();
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get('http://localhost:5000/users', {
        headers: {
          authorization: `bearer ${user.accessToken}`,
        },
        withCredentials: true,
      });
      setUsers(res.data);
    }
    getUsers();
  }, [])

  const handleClick = e => {
    // e.preventDefault();
    // const selectedUser = users.filter(user => user._id === e.target.id);
    // console.log(selectedUser);
    // const formattedUser = { id: selectedUser[0]._id, name: selectedUser[0].name, email: selectedUser[0].email, onlineSales: selectedUser[0].onlineSales }
    // members.push(formattedUser);
    // axios.put(`http://localhost:5000/team/${teamId}`, {
    //   members: members
    // });
    // handleModalDisplay();
    console.log(teamId);
  }

  if (!showModal) {
    return <React.Fragment />;
  }
  let markup
  if (users) {
    markup = users.map(user =>
      <div key={user._id}>
        <button onClick={handleClick} id={user._id}>Add Member</button>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li>{user.onlineSales ? "Online Sales Memmber" : "Floor Sales Member"}</li>
      </div>
    )
  }

  return (
    <div
      className="sale-modal"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button className="modal-close" onClick={handleModalDisplay}>
        X
      </button>
      {markup}
    </div>
  );
};

export default TeamModal;
