import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';
import 'bulma/css/bulma.min.css';
// import Table from './components/Table';
// OPENING PR

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/wallet" component={ Wallet } />
      {/* <Route path="/Table" component={ Table } /> */}
    </Switch>
  );
}

export default App;
