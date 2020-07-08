import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import UserContext from '../components/UserContext';

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      'http://localhost:5000/login',
      {
        email: input.email,
        password: input.password,
      },
      {
        withCredentials: true,
      }
    );

    setUser({
      name: res.data.user.name,
      id: res.data.user._id,
      accessToken: res.data.accessToken,
      admin: res.data.user.admin,
    });
  };

  if (user.id) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
