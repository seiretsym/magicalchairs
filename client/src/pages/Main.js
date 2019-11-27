import React, { Component } from "react";
import Row from "../components/Row";
import API from "../utils";

class Main extends Component {
  state = {
    students: [],
  }

  sortStudents = (students) => {
    let rows = Math.ceil(students.length / 8)
    let temp = [];
    for (let i = 0; i < rows; i++) {
      let seats = []
      for (let j = i * 8; j < i * 8 + 8; j++) {
        if (students[j]) {
          seats.push(students[j])
        }
      }
      temp.push(seats);
    }

    this.setState({
      students: temp,
    })
    console.log(this.state.students)
  }

  componentDidMount() {
    API.getSeatArrangement().then(students => {
      console.log(students.data[0].seating)
      if (students.data[0].seating.length > 0) {

        this.sortStudents(students.data[0].seating);
      }
    }).catch(error => console.log(error));
  }

  render() {
    return (
      <div className="bg-secondary rounded py-1 px-3">
        <h1>Current Seating</h1>
        <hr />
        {this.state.students.map((students, index) => {
          return <Row students={students} row={index} key={index} />
        }
        )}
      </div>
    )
  }
}

export default Main;