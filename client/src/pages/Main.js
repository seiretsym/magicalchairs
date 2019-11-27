import React, { Component } from "react";
import Row from "../components/Row";

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
    let students = [
      {
        name: "Kerwin Hy 1"
      },
      {
        name: "Kerwin Hy 2"
      },
      {
        name: "Kerwin Hy 3"
      },
      {
        name: "Kerwin Hy 4"
      },
      {
        name: "Kerwin Hy 5"
      },
      {
        name: "Kerwin Hy 6"
      },
      {
        name: "Kerwin Hy 7"
      },
      {
        name: "Kerwin Hy 8"
      },
      {
        name: "Kerwin Hy 9"
      },
      {
        name: "Kerwin Hy 10"
      },
      {
        name: "Kerwin Hy 11"
      },
    ]

    this.sortStudents(students);
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