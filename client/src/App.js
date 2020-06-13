import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

import UserContext from './components/UserContext';
import Login from './components/Login';
import Home from './components/Home';

import './App.css';

const App = () => {
  const [user, setUser] = useState({ name: '', id: null, cookie: null });
  const [loggedIn, setLoggedIn] = useState(false);

  const getCookie = (title) => {
    try {
      const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(title))
        .split('=')[1];
      return cookieValue;
    } catch (err) {}
  };

  useEffect(() => {
    if (user.cookie) {
      setLoggedIn(true);
    }
  }, [user.cookie]);

  useEffect(() => {
    if (!user.cookie) {
      try {
        const cookie = getCookie('access-token');
        if (!cookie) {
          try {
            const refreshCookie = getCookie('refresh-token');
            const { userId } = jwtDecode(refreshCookie);
            const refresh = async () => {
              await axios.post(
                '/graphql',
                {
                  query: `query me($id: ID!) {
                    me(id: $id) {
                      id
                    }
                  }`,
                  variables: {
                    id: userId,
                  },
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  withCredentials: true,
                }
              );
              const cookie = getCookie('access-token');
              setUser({ cookie: cookie });
            };
            refresh();
          } catch (err) {
            console.error(err);
          }
        }
        setUser({ cookie: cookie });
      } catch (err) {
        console.error(err);
      }
    }
  }, [user.cookie]);

  const authRoute = () => {
    if (!user.cookie) {
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
