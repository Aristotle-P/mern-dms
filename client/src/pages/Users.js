import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../components/UserContext';

import axios from 'axios';

const Users = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const res = await axios.get('http://localhost:5000/users', {
      headers: {
        authorization: `bearer ${user.accessToken}`,
      },
      withCredentials: true,
    });
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {users.map((user) => {
          return <li key={user._id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Users;
