import React, { Component } from "react";

class ReportCard extends Component {
  render() {
    return (
      <div className="card-container">
        <div className="card bg-dark mb-3 mr-3 student">
          <div className="card-body">
            <h5 className="card-title text-center">{this.props.student.name}</h5>
            <div className="input-group mb-2 bg-dark">
              <div className="input-group-prepend bg-dark w-75">
                <span className="input-group-text bg-dark text-light w-100">Social Rating</span>
              </div>
              <input type="text" className="form-control bg-dark text-light" value={this.props.student.socialRating} disabled />
            </div>
            <div className="input-group m-0 bg-dark">
              <div className="input-group-prepend bg-dark w-75">
                <span className="input-group-text bg-dark text-light w-100">Code Rating</span>
              </div>
              <input type="text" className="form-control bg-dark text-light" value={this.props.student.codeRating} disabled />
            </div>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-secondary text-light" onClick={() => this.props.editStudent(this.props.student._id)}>Edit</button>
            <button className="btn btn-secondary text-light ml-3" onClick={() => this.props.removeStudent(this.props.student._id)}>Remove</button>
          </div>
        </div>
        <div className="card bg-dark mb-3 mr-3 d-none edit" id={this.props.student._id}>
          <div className="card-body">
            <h5 className="card-title text-center">{this.props.student.name}</h5>
            <div className="input-group mb-2 bg-dark">
              <div className="input-group-prepend bg-dark w-75">
                <span className="input-group-text bg-dark text-light w-100">Social Rating</span>
              </div>
              <input type="text" id={"sr" + this.props.student._id} className="form-control bg-dark text-light" placeholder="1-5" />
            </div>
            <div className="input-group m-0 bg-dark">
              <div className="input-group-prepend bg-dark w-75">
                <span className="input-group-text bg-dark text-light w-100">Code Rating</span>
              </div>
              <input type="text" id={"cr" + this.props.student._id} className="form-control bg-dark text-light" placeholder="1-5" />
            </div>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-secondary text-light" onClick={() => this.props.updateStudent(this.props.student._id)}>Save</button>
            <button className="btn btn-secondary text-light ml-3" onClick={() => this.props.cancelEdit(this.props.student._id)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }


}

export default ReportCard;