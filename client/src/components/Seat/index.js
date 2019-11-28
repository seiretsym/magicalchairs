import React, { Component } from "react";

class Seat extends Component {

  render() {
    let Name = () => {
      if (this.props.student === "") {
        return <li className="list-group-item bg-dark text-dark w-25">&sp;</li>
      } else {
        return <li className="list-group-item bg-dark text-light w-25">{this.props.student.name}</li>
      }
    }
    return (
      <Name />
    )
  }

}

export default Seat;