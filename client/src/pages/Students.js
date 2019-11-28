import React, { Component } from "react";
import ReportCard from "../components/ReportCard";
import API from "../utils";

class Students extends Component {
  state = {
    students: [],
    selectedStudent: {
      _id: "null",
      name: "null",
      yep: [],
      nope: [],
    },
    display: "add",
  }

  componentDidMount() {
    this.getStudents();
  }

  addStudent = event => {
    event.preventDefault();

    let socialRating = 0;
    let codeRating = 0;
    let socialRadios = document.getElementsByName("socialRadioOptions");
    let codeRadios = document.getElementsByName("codeRadioOptions");

    for (let i = 0; i < 5; i++) {
      if (socialRadios[i].checked) {
        socialRating = socialRadios[i].value;
      }
      if (codeRadios[i].checked) {
        codeRating = codeRadios[i].value;
      }
    };

    let student = {
      name: document.getElementById("name").value,
      socialRating: parseInt(socialRating),
      codeRating: parseInt(codeRating)
    }

    API.addStudent(student)
      .then(() => {
        alert("Student Added!")
        document.getElementById("name").value = "";
        this.getStudents();
      })

  }

  getStudents = () => {
    API.getStudents().then(students => {
      this.setState({
        students: students.data
      })
      console.log(this.state.students);
    })
  }

  editStudent = id => {
    let card = document.getElementById(id);
    card.classList.remove("d-none");
  }

  cancelEdit = id => {
    let card = document.getElementById(id);
    card.classList.add("d-none");
  }

  updateStudent = (id) => {
    let socialRating = parseInt(document.getElementById("sr" + id).value);
    let codeRating = parseInt(document.getElementById("cr" + id).value);
    if (socialRating > 0 && socialRating < 6 && codeRating > 0 && codeRating < 6) {
      let student = {
        socialRating: socialRating,
        codeRating: codeRating
      }
      API.editStudent(id, student)
        .then(student => {
          document.getElementById("sr" + id).value = "";
          document.getElementById("cr" + id).value = "";
          this.cancelEdit(id);
          this.getStudents();
        })
        .catch(error => {
          console.log(error)
          alert("Error!");
        })
    } else if (socialRating < 0 || socialRating > 5 || socialRating === "" || isNaN(socialRating)) {
      document.getElementById("sr" + id).value = "";
      document.getElementById("sr" + id).focus();
    } else if (codeRating < 0 || codeRating > 5 || codeRating === "" || isNaN(codeRating)) {
      document.getElementById("cr" + id).value = "";
      document.getElementById("cr" + id).focus();
    }
  }

  removeStudent = id => {
    API.removeStudent(id).then(this.getStudents)
  }

  handleEthicAdd = () => {
    let cantSelect = document.getElementById("cantSelect");
    let id = cantSelect.options[cantSelect.selectedIndex].value;
    let data = {
      id: this.state.selectedStudent._id,
      blockId: id,
    }
    API.blockStudent(data)
      .then(() => {
        this.getSelectedStudent(this.state.selectedStudent._id)
      })
      .catch(error => {
        console.log(error)
      });
  }

  handleEthicRemove = id => {
    let data = {
      id: this.state.selectedStudent._id,
      blockId: id,
    }
    API.unblockStudent(data)
      .then(() => {
        this.getSelectedStudent(this.state.selectedStudent._id);
      })
      .catch(error => {
        console.log(error);
      })
  }

  handlePairRemove = id => {
    let data = {
      id: this.state.selectedStudent._id,
      pairId: id,
    }
    API.unpairStudent(data)
      .then(() => {
        this.getSelectedStudent(this.state.selectedStudent._id);
      })
      .catch(error => {
        console.log(error);
      })
  }

  getSelectedStudent = id => {
    API.getStudent(id).then(student => {
      this.setState({
        selectedStudent: student.data[0],
      })
    })
  }

  handleSelect = event => {
    let select = document.getElementById("studentSelect");
    let student = select.options[select.selectedIndex].value;
    if (student !== "none") {
      this.getSelectedStudent(student);
    }
  }

  changeDisplay = page => {
    let navs = document.getElementsByName("nav");
    for (let i = 0; i < navs.length; i++) {
      navs[i].classList.remove("bg-dark");
    }
    document.getElementById(page).classList.add("bg-dark")
    this.setState({
      display: page,
    })
  }

  showDisplay = () => {
    switch (this.state.display) {
      case "view":
        return (
          <div className="d-flex flex-wrap">
            {this.state.students.map((student, index) => {
              return <ReportCard
                student={student}
                editStudent={this.editStudent}
                cancelEdit={this.cancelEdit}
                updateStudent={this.updateStudent}
                removeStudent={this.removeStudent}
                key={index} />
            })}
          </div>
        )
      case "add":
        return (
          <form className="p-3 bg-dark rounded">
            <div className="form-group">
              <label>Student Name</label>
              <div className="form-check form-check-inline ml-3">
                <input type="name" className="form-control bg-secondary text-light" id="name" placeholder="Farley Wittles" />
              </div>
            </div>
            <div className="form-group">
              <label>Social Rating:</label>
              <div className="form-check form-check-inline ml-3">
                <input className="form-check-input" type="radio" name="socialRadioOptions" id="socialRadio1" value="1" defaultChecked />
                <label className="form-check-label">1</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="socialRadioOptions" id="socialRadio2" value="2" />
                <label className="form-check-label">2</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="socialRadioOptions" id="socialRadio3" value="3" />
                <label className="form-check-label">3</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="socialRadioOptions" id="socialRadio4" value="4" />
                <label className="form-check-label">4</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="socialRadioOptions" id="socialRadio5" value="5" />
                <label className="form-check-label">5</label>
              </div>
            </div>
            <div className="form-group">
              <label>Code Rating:</label>
              <div className="form-check form-check-inline ml-3">
                <input className="form-check-input" type="radio" name="codeRadioOptions" id="codeRadio1" value="1" defaultChecked />
                <label className="form-check-label">1</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="codeRadioOptions" id="codeRadio2" value="2" />
                <label className="form-check-label">2</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="codeRadioOptions" id="codeRadio3" value="3" />
                <label className="form-check-label">3</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="codeRadioOptions" id="codeRadio4" value="4" />
                <label className="form-check-label">4</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="codeRadioOptions" id="codeRadio5" value="5" />
                <label className="form-check-label">5</label>
              </div>
            </div>
            <button className="btn btn-secondary" onClick={(event) => this.addStudent(event)}>Add Student</button>
          </form>
        )
      case "ethics":
        return (
          <div>
            <div className="input-group mb-2">
              <div className="input-group-prepend bg-dark">
                <span className="input-group-text bg-dark text-light w-100">Student</span>
              </div>
              <select className="custom-select bg-dark text-light" id="studentSelect" onChange={event => this.handleSelect(event)}>
                <option value="none">Choose...</option>
                {this.state.students.map((student, index) => {
                  return <option value={student._id} key={index}>{student.name}</option>
                })}
              </select>
            </div>
            <div className="input-group mb-2">
              <div className="input-group-prepend bg-dark">
                <span className="input-group-text bg-dark text-light w-100">Can't work with</span>
              </div>
              <select className="custom-select bg-dark text-light" id="cantSelect">
                <option value="none">Choose...</option>
                {this.state.students.map((student, index) => {
                  if (student._id !== this.state.selectedStudent._id && this.state.selectedStudent.nope.map(target => target._id).indexOf(student._id) === -1) {
                    return <option value={student._id} key={index}>{student.name}</option>
                  }
                  return null;
                })}
              </select>
              <div className="input-group-append">
                <button className="btn btn-dark btn-outline-light" type="button" onClick={() => this.handleEthicAdd()}>Add</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md bg-dark rounded mx-3 p-3">
                <h5>{this.state.selectedStudent.name} can't work with...</h5>
                <hr />
                {this.state.selectedStudent.nope.map((student, index) => {
                  return (
                    <div className="input-group mb-2" key={index}>
                      <div className="input-group-prepend bg-dark">
                        <span className="input-group-text bg-dark text-light w-100">{student.name}</span>
                      </div>
                      <div className="input-group-prepend bg-dark">
                        <span className="input-group-text bg-dark text-light w-100">{student._id}</span>
                      </div>
                      <div className="input-group-append">
                        <button className="btn btn-dark btn-outline-light" type="button" onClick={() => this.handleEthicRemove(student._id)}>&times;</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div >
        )
      case "paired":
        return (
          <div>
            <div className="input-group mb-2">
              <div className="input-group-prepend bg-dark">
                <span className="input-group-text bg-dark text-light w-100">Student</span>
              </div>
              <select className="custom-select bg-dark text-light" id="studentSelect" onChange={event => this.handleSelect(event)}>
                <option value="none">Choose...</option>
                {this.state.students.map((student, index) => {
                  return <option value={student._id} key={index}>{student.name}</option>
                })}
              </select>
            </div>
            <div className="row">
              <div className="col-md bg-dark rounded mx-3 p-3">
                <h5>{this.state.selectedStudent.name} has paired with...</h5>
                <hr />
                {this.state.selectedStudent.yep.map((student, index) => {
                  return (
                    <div className="input-group mb-2" key={index}>
                      <div className="input-group-prepend bg-dark">
                        <span className="input-group-text bg-dark text-light w-100">{student.name}</span>
                      </div>
                      <div className="input-group-prepend bg-dark">
                        <span className="input-group-text bg-dark text-light w-100">{student._id}</span>
                      </div>
                      <div className="input-group-append">
                        <button className="btn btn-dark btn-outline-light" type="button" onClick={() => this.handlePairRemove(student._id)}>&times;</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div>
            should never see this
          </div>
        )
    }
  }

  render() {
    return (
      <div className="bg-secondary rounded py-3 px-3">
        <ul className="nav">
          <li name="nav" id="view" className="nav-item bg-dark rounded mr-3">
            <button className="nav-link btn btn-clear p-2" onClick={() => this.changeDisplay("view")}>View Students</button>
          </li>
          <li name="nav" id="add" className="nav-item rounded mr-3">
            <button className="nav-link btn btn-clear p-2" onClick={() => this.changeDisplay("add")}>Add Student</button>
          </li>
          <li name="nav" id="ethics" className="nav-item rounded mr-3">
            <button className="nav-link btn btn-clear p-2" onClick={() => this.changeDisplay("ethics")}>Work Ethics</button>
          </li>
          <li name="nav" id="paired" className="nav-item rounded mr-3">
            <button className="nav-link btn btn-clear p-2" onClick={() => this.changeDisplay("paired")}>Partner History</button>
          </li>
        </ul>
        <hr />
        {this.showDisplay()}
      </div>
    )
  }
}

export default Students;