import React, { Component } from "react";

class Nav extends Component {
  render() {
    let Admin = () => {
      if (this.props.authed) {
        return (
          <div className="dropdown">
            <button className="btn btn-clear dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Admin
            </button>
            <div className="dropdown-menu bg-secondary" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item bg-secondary text-light" href="#a">Add Student</a>
              <a className="dropdown-item bg-secondary text-light" href="#s">Edit Student</a>
              <a className="dropdown-item bg-secondary text-light" href="#d">Something else here</a>
            </div>
          </div>
        )
      } else {
        return <button className="nav-link btn-clear" onClick={this.props.auth}>Admin</button>;
      }
    }

    return (
      <div className="bg-secondary text-light py-1 px-3 mb-3 rounded">
        <ul className="nav">
          <li className="nav-item">
            <a href="/" className="nav-link text-light">Home</a>
          </li>
          <li className="nav-item ml-auto">
            <Admin />
          </li>
        </ul>
      </div>
    )
  }


}

export default Nav;