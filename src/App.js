import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';
import LoginScreen from './pages/LoginScreen';
import UpdateCatalog from './pages/UpdateCatalog';
import UpdateDetail from './pages/UpdateDetail';
import CreateNew from './pages/CreateNew';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={LoginScreen} />
          <Route exact path="/Update-Catalog" component={UpdateCatalog} />
          <Route exact path="/Details/:id" component={Details} />
          <Route exact path="/Update-Catalog/:id" component={UpdateDetail} />
          <Route exact path="/Create-New" component={CreateNew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
