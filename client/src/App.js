import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import UserContext from './components/UserContext';
import Home from './components/Home';
import NewHome from './components/NewHome';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Hello World</h1>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" component={NewHome} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
