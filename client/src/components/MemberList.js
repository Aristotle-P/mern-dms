import React, { useState, useEffect } from 'react';

const MemberList = ({ user, key }) => {
  if (user) {
    return <li>{user}</li>;
  } else {
    return null;
  }
};

export default MemberList;
