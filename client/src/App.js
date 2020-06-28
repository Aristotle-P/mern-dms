import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { refreshToken } from './utils/handleToken';

import UserContext from './components/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';

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
            <button>
              <Link to="/">Home</Link>
            </button>
            <button>
              <Link to="/login">Login</Link>
            </button>
            <button>
              <Link to="/users">Users</Link>
            </button>
            <button>
              <Link to="/dashboard">Dashboard</Link>
            </button>
            <button>
              <Link to="/sales">Sales</Link>
            </button>
          </header>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <AdminRoute exact path="/users" component={Users} />
            <ProtectedRoute exact path="/sales" component={Sales} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
