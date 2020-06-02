import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import UserContext from './components/UserContext';
import Login from './components/Login';
import Home from './components/Home';

import './App.css';

const App = () => {
  const [user, setUser] = useState({ name: '', id: null });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user.id) {
      setLoggedIn(true);
    }
  }, [user.id]);

  const authRoute = () => {
    if (!user.id) {
      return <Redirect to="/login" />;
    }
  };

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <h1>Hello World</h1>
          <Switch>
            <Route path="/login">
              {loggedIn ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/">
              {authRoute()}
              <Home />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
