import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import Header from './components/Header';
import Nav from './components/Nav';
// pages
import Main from './pages/Main';
// stylesheets
import './App.css';

class App extends Component {

  state = {
    authed: true,
  }

  auth = () => {
    console.log("clicked");
  };

  render() {
    return (
      <div className="container p-3">
        <Header />
        <Nav auth={() => this.auth()} authed={this.state.authed} />
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
