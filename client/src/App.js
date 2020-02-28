import React, { useState } from 'react';

import UserContext from './components/UserContext';
import Login from './components/Login';
import Home from './components/Home';

import './App.css';

const App = () => {
  const [user, setUser] = useState({ name: '', id: null });
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <h1>Hello World</h1>
        {user.id ? <Home /> : <Login />}
      </UserContext.Provider>
    </div>
  );
};

export default App;
