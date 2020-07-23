import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../components/UserContext';
import UserLink from '../components/UserLink';

import axios from 'axios';
import { checkToken } from '../utils/handleToken';

const Users = () => {
  const { user, setUser } = useContext(UserContext);
  const [userStats, setUserStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkToken(user, setUser);
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const usersRes = axios.get('http://localhost:5000/users', {
        headers: {
          authorization: `bearer ${user.accessToken}`,
        },
        withCredentials: true,
      });
      const salesRes = axios.get(`http://localhost:5000/sales`);
      const res = [await usersRes, await salesRes];
      res[0].data.forEach((user) => {
        const stats = {
          name: user.name,
          userId: user._id,
          newSales: 0,
          usedSales: 0,
          frontGross: 0,
          backGross: 0,
        };
        res[1].data.forEach((sale) => {
          if (sale.salesperson === user._id) {
            stats.frontGross += sale.frontGross;
            stats.backGross = +sale.backGross;
            if (sale.used === true) {
              stats.usedSales++;
            }
            stats.newSales++;
          }
        });
        setUserStats((currentStats) => [...currentStats, stats]);
        setLoading(false);
      });
    };

    getUserData();
  }, [user.accessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userStats.map((user) => {
        return <UserLink key={user.userId} userStats={user} />;
      })}
    </div>
  );
};

export default Users;
