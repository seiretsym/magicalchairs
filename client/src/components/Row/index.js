import React, { Component } from "react";
import Seat from "../../components/Seat";

class Row extends Component {

  render() {

    return (
      <div className="mb-3">
        <span>Row {this.props.row + 1}</span>
        <div className="row">
          <div className="col-md-6">
            <div className="list-group list-group-horizontal text-center">
              {this.props.students.map((student, index) => {
                if (index < 4) {
                  return <Seat student={student} key={"l" + this.props.row + "-" + index} />
                } else {
                  return <div key={"l" + this.props.row + "-" + index} />
                }
              })}
            </div>
          </div>
          <div className="col-md-6">
            <div className="list-group list-group-horizontal text-center">
              {this.props.students.map((student, index) => {
                if (index > 3) {
                  return <Seat student={student} key={"r" + this.props.row + "-" + index} />
                } else {
                  return <div key={"l" + this.props.row + "-" + index} />
                }
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Row;