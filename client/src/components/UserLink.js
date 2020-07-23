import React from 'react';
import { Link } from 'react-router-dom';

const UserLink = ({ userStats }) => {
  const {
    userId,
    name,
    newSales,
    usedSales,
    frontGross,
    backGross,
  } = userStats;
  return (
    <div className="user-link-container">
      <div key={userId}>
        <Link to={{ pathname: `/user/${userId}` }}>{name}</Link>
      </div>
      <div>New Sales: {newSales}</div>
      <div>Used Sales: {usedSales}</div>
      <div>Front Gross: {frontGross / 100}</div>
      <div>Back Gross: {backGross / 100}</div>
    </div>
  );
};

export default UserLink;
