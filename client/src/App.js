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
import Teams from './pages/Teams';

const App = () => {
  const [user, setUser] = useState({
    name: '',
    id: null,
    accessToken: null,
    currentBonus: null,
    admin: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshToken(setUser);
    setLoading(false);
  }, []);

  // useEffect(() => {

  // }, [user.accessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className='App'>
          <header>
            <button>
              <Link to='/'>Home</Link>
            </button>
            <button>
              <Link to='/login'>Login</Link>
            </button>
            <button>
              <Link to='/users'>Users</Link>
            </button>
            <button>
              <Link to='/teams'>Teams</Link>
            </button>
          </header>
          <Switch>
            <ProtectedRoute
              exact
              path='/'
              component={Dashboard}
            />
            <Route exact path='/login' component={Login} />
            <AdminRoute exact path='/users' component={Users} />
            <AdminRoute exact path='/user/:userId' component={User} />
            <AdminRoute
              exact
              path='/teams'
              component={Teams}
            />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
