import React, { Component } from "react";

class Seat extends Component {

  render() {
    return (
      <li className="list-group-item bg-dark text-light w-25">{this.props.student.name}</li>
    )
  }

}

export default Seat;