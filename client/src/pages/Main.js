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
    let blanks = 0;

    // now we split the students into subarrays for each column in a row
    for (let m = 0; m < rows; m++) {
      let seats = []
      for (let n = m * 8; n < m * 8 + 8; n++) {
        if (students[n]) {
          if (students.length % 8 === 1 && m === rows - 1 && n === students.length - 1) {
            // console.log(blanks)
            for (let o = blanks; o >= 0; o--) {
              seats.push(students[n - o]);
            }
            for (let p = 0; p < 32 - students.length - blanks; p++) {
              seats.push("")
            }
            n += 8;
          } else {
            if (students.length % 8 === 1) {
              if (students.length % 8 === 1 && m === rows - 2 && (n % 8 === 2 || n % 8 === 5)) {
                seats.push(students[n])
                seats.push("");
                blanks++
                if (seats.length === 8) {
                  n += 8;
                }
              } else {
                seats.push(students[n])
              }
            } else {
              if (students.length % 4 === 1 && m === rows - 1 && (n % 4 === 2)) {
                seats.push(students[n])
                seats.push("");
                blanks++
                if (seats.length === 8) {
                  n += 8;
                }
              } else {
                seats.push(students[n])
              }
            }
          }
        }
      }
      temp.push(seats);
    }

    this.setState({
      students: temp,
    })
    // console.log(this.state.students)
  }

  componentDidMount() {
    API.getSeatArrangement().then(students => {
      // console.log(students.data[0].seating)
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