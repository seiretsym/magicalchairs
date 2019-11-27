import React, { Component } from "react";
import ReportCard from "../components/ReportCard";
import API from "../utils";

class Students extends Component {
  state = {
    students: [],
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

  changeDisplay = page => {
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
          <form className="p-3 bg-dark rounded mb-3">
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
      <div className="bg-secondary rounded py-1 px-3">
        <h1>Students</h1>
        <ul className="nav">
          <li className="nav-item">
            <button className="nav-link btn btn-clear p-0 mr-3" onClick={() => this.changeDisplay("view")}>View Students</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-clear p-0" onClick={() => this.changeDisplay("add")}>Add Student</button>
          </li>
        </ul>
        <hr />
        {this.showDisplay()}
      </div>
    )
  }
}

export default Students;