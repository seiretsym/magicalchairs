import React, { Component } from 'react';
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
    display: <Main />
  }

  auth = () => {
    var password = prompt("Enter Password:");
    if (password === "farley") {
      this.setState({
        authed: true,
      })
    }
  };

  changeDisplay = (page) => {
    this.setState({
      display: page,
    })
  }

  render() {
    return (
      <div className="container p-3">
        <Header />
        <Nav auth={() => this.auth()} changeDisplay={this.changeDisplay} authed={this.state.authed} />
        {this.state.display}
      </div>
    );
  }
}

export default App;
