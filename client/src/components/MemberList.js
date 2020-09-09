import React from 'react';

const MemberList = ({ user, updateInput }) => {
  if (user) {
    return (
      <li>
        <button onClick={updateInput} value={user.name}>
          {user.name}
        </button>
      </li>
    );
  } else {
    return null;
  }
};

export default MemberList;
