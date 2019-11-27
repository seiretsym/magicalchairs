import React, { Component } from "react";
import Main from "../../pages/Main";
import Students from "../../pages/Students";
import Arrange from "../../pages/Arrange";


class Nav extends Component {
  render() {
    let Admin = () => {
      if (this.props.authed) {
        return (
          <div className="dropdown">
            <button className="nav-link btn btn-clear dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Admin
            </button>
            <div className="dropdown-menu bg-secondary" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item bg-secondary btn btn-clear" onClick={() => this.props.changeDisplay(<Students />)}>View Students</button>
              <button className="dropdown-item bg-secondary text-light" onClick={() => this.props.changeDisplay(<Arrange />)}>Arrange Seats</button>
            </div>
          </div>
        )
      } else {
        return <button className="nav-link btn btn-clear" onClick={this.props.auth}>Admin</button>;
      }
    }

    return (
      <div className="bg-secondary text-light py-1 px-3 mb-3 rounded">
        <ul className="nav">
          <li className="nav-item">
            <button className="nav-link btn btn-clear" onClick={() => this.props.changeDisplay(<Main />)}>Home</button>
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