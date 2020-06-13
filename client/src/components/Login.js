import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import cookie from 'js-cookie';

import UserContext from './UserContext';

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/graphql',
        {
          query: `mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              name
              id
            }
          }`,
          variables: {
            email: input.email,
            password: input.password,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const { name, id } = res.data.data.login;
      setUser({ name, id, cookie: cookie.get('access-token') });
    } catch (err) {
      console.error(err);
    }
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
