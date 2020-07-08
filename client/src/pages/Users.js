import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../components/UserContext';

import axios from 'axios';
import { checkToken } from '../utils/handleToken';
import { Link } from 'react-router-dom';

const Users = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkToken(user, setUser);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get('http://localhost:5000/users', {
        headers: {
          authorization: `bearer ${user.accessToken}`,
        },
        withCredentials: true,
      });
      try {
        if (res.data) {
          setUsers(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();
  }, [user.accessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <li key={user._id}>
              <Link
                to={{
                  pathname: `/user/${user.name
                    .replace(/ /g, '-')
                    .toLowerCase()}`,
                  state: { userId: user._id },
                }}
              >
                {user.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
