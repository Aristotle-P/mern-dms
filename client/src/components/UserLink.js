import React from 'react';
import { Link } from 'react-router-dom';

const UserLink = ({ userStats }) => {
  const { userId, name, sales, frontGross, backGross } = userStats;
  return (
    <div className="user-link-container">
      <div key={userId}>
        <Link to={{ pathname: `/user/${userId}` }}>{name}</Link>
      </div>
      <div>{sales}</div>
      <div>{frontGross}</div>
      <div>{backGross}</div>
      <div>{frontGross + backGross}</div>
    </div>
  );
};

export default UserLink;
