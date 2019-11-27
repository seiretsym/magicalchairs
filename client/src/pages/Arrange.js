import React, { Component } from "react";
import Row from "../components/Row";
import API from "../utils";

class Arrange extends Component {
  state = {
    students: [],
  }

  seatStudents = (students) => {
    let rows = Math.ceil(students.length / 8)
    let temp = [];
    let seated = [];
    let arranged = [];
    let copy = this.shuffle(students);
    console.log(students)

    // first, determine best matches per student
    for (let i = 0; i < copy.length; i++) {
      let student = {
        student: copy[i],
        matches: [],
      }

      for (let j = 0; j < copy.length; j++) {
        // ignore self
        if (copy[j] !== copy[i]) {
          let yep = copy[i].yep.map(yep => yep).indexOf(copy[j]._id)
          let nope = copy[i].nope.map(nope => nope).indexOf(copy[j]._id)
          // has student i worked with student j?
          if (yep === -1 && nope === -1) {
            // calculate match score
            let socialScore = Math.abs(6 - (parseInt(copy[i].socialRating) + parseInt(copy[j].socialRating)));
            let codeScore = Math.abs(6 - (parseInt(copy[i].codeRating) + parseInt(copy[j].codeRating)));

            let match = {
              student: copy[j],
              score: (socialScore + codeScore) / 2
            }

            student.matches.push(match)
          }
        }
      }

      temp.push(student);
    }
    // sort all matches in temp
    temp.map(student => {
      let derp = student.matches.slice();
      derp.sort((a, b) => a.score - b.score);
      student.matches = derp;
      return student;
    })

    // iterate through temp
    for (let k = 0; k < temp.length; k++) {
      // check if k has not been seated...
      if (seated.map(student => student._id).indexOf(temp[k].student._id) === -1) {
        // seat k
        seated.push(temp[k].student)
        // then interate through k's matches
        for (let l = 0; l < temp[k].matches.length; l++) {
          // check if l has been seated
          if (seated.map(student => student._id).indexOf(temp[l].student._id) === -1) {
            // seat l
            seated.push(temp[l].student)
            // increase l so it doesn't iterate anymore
            l += temp.length;
          }
        }
      }
    }

    // now we split the students into subarrays for each column in a row
    for (let m = 0; m < rows; m++) {
      let seats = []
      for (let n = m * 8; n < m * 8 + 8; n++) {
        if (students[n]) {
          seats.push(students[n])
        }
      }
      arranged.push(seats);
    }

    this.setState({
      students: arranged,
    })

  }

  shuffle = array => {
    // use a for loop in reverse!
    for (var i = array.length - 1; i > 0; i--) {
      // create a random number based on i
      var num = Math.floor(Math.random() * (i + 1));
      // store array index in temp
      var temp = array[i];
      // do a shuffle
      array[i] = array[num];
      array[num] = temp;
    }
    return array;
  }

  saveArrangement = () => {
    let data = [];
    for (let z = 0; z < this.state.students.length; z++) {
      for (let y = 0; y < 8; y += 2) {
        let subdata = this.state.students[z];
        if (subdata[y]) {
          if (subdata[y + 1]) {
            subdata[y].yep.push(subdata[y + 1]._id);
            subdata[y + 1].yep.push(subdata[y]._id);
            data.push(subdata[y]);
            data.push(subdata[y + 1]);
          } else {
            data.push(subdata[y]);
          }
        }
      }
    }
    API.updateSeatArrangement(data)
      .then(() => {
        alert("New Seating Saved! All students' are now associated with their new partners, so it's unlikely they'll be paired with each other again.");
      })
      .catch(error => {
        console.log(error);
      })
  }

  getStudents = () => {
    API.getStudents().then(students => {
      this.seatStudents(students.data)
    })
      .catch(error => console.log(error));
  }

  handleNewSeats = () => {
    this.getStudents();
  }

  componentDidMount() {
    this.getStudents();
  }

  render() {
    return (
      <div className="bg-secondary text-light rounded p-3">
        <h3>Arrange Seats</h3>
        <ul className="nav">
          <li name="nav" id="view" className="nav-item">
            <button className="nav-link btn btn-clear p-2" onClick={() => this.handleNewSeats()}>New Arrangement</button>
          </li>
          <li name="nav" id="view" className="nav-item">
            <button className="nav-link btn btn-clear p-2" onClick={() => this.saveArrangement()}>Save Arrangement</button>
          </li>
        </ul>
        {this.state.students.map((students, index) => {
          return <Row students={students} row={index} key={index} />
        }
        )}
      </div>
    )
  }
}

export default Arrange;