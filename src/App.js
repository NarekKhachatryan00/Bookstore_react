import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home';
import Basket from './Basket';
import Checkout from './Checkout';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/basket'>
            <Basket />
          </Route>
          <Route path='/checkout'>
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
