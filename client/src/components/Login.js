import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/graphql', {
        query: `
          {
            user(name: $name, password: $password) {
              name
              email
            }
          }`,
        variables: {
          name: username,
          password: password
        }
      });
      const { name, email } = res.data.data.users[0];
      console.log(name, email);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          onChange={e => setUsername({ username: e.target.value })}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={e => setPassword({ password: e.target.value })}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
