import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { refreshToken } from './utils/handleToken';

import UserContext from './components/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/Users';

import './App.css';

const App = () => {
  const [user, setUser] = useState({
    name: '',
    id: null,
    accessToken: null,
    admin: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshToken(setUser);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <header>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/users">Users</Link>
          </header>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/users" component={Users} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
