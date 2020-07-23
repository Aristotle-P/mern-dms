import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { refreshToken } from './utils/handleToken';

import UserContext from './components/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import User from './pages/User';

import './App.css';

const App = () => {
  const [user, setUser] = useState({
    name: '',
    id: null,
    accessToken: null,
    admin: null,
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleModalDisplay = () => {
    setShowModal(!showModal);
  };

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
        <div
          className="App"
          onClick={() => {
            if (showModal === true) {
              setShowModal(false);
            }
          }}
        >
          <header>
            <button>
              <Link to="/">Home</Link>
            </button>
            <button>
              <Link to="/login">Login</Link>
            </button>
            <button>
              <Link to="/users">Users</Link>
            </button>
          </header>
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Dashboard}
              handleModalDisplay={handleModalDisplay}
              showModal={showModal}
            />
            <Route exact path="/login" component={Login} />
            <AdminRoute exact path="/users" component={Users} />
            <AdminRoute exact path="/user/:userId" component={User} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
