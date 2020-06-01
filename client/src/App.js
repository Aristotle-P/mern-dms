import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import cookie from 'js-cookie';

import UserContext from './components/UserContext';
import Login from './components/Login';
import Home from './components/Home';

import './App.css';

const App = () => {
  const [user, setUser] = useState({ name: '', id: null, cookie: null });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!user.cookie) {
      setUser({ cookie: cookie.get('refresh-token') });
    }
  }, [user.cookie]);

  // useEffect(() => {
  //   const refreshToken = async () => {
  //     if (!user.cookie) {
  //       await axios.post('/graphql', {
  //         query: `{
  //           me {
  //             name
  //           }
  //         }`
  //       });
  //       setUser({ cookie: cookie.get('access-token') });
  //     }
  //   };
  //   refreshToken();
  // }, [user.cookie]);

  useEffect(() => {
    if (user.cookie) {
      setLoggedIn(true);
    }
  }, [user.cookie]);

  // const authRoute = () => {
  //   if (!user.cookie) {
  //     return <Redirect to="/login" />;
  //   }
  // };

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
              {/* {authRoute()} */}
              <Home />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
