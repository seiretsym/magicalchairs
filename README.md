# Musical Chairs
Tech Stack: Mongoose, Express, React, Node, HTML, Bootstrap

### *What is it?*
Musical Chairs is a web app that pairs students together based on their social/technical aptitude, so that they can benefit from working together in a classroom.

## Highlights
- RESTful API
- MERN Stack
- Single Page Display

## Learning Experience
- Learned more about Mongoose
- Learned more about Loops and how they break synchronicity
- Learned to handle props better in React

## Code Snippets
A function that assigns seats to students. It also takes into account odd numbers to form groups, so that way, no one is left sitting alone.
```
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
```

Using functions in a component to change displays without loading a new page
```
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
```

Passing functions as props to components to maintain a one-page-display with stateful attributes
```
  render() {
    return (
      <div className="container p-3">
        <Header />
        <Nav auth={() => this.auth()} dropDatabase={this.dropDatabase} changeDisplay={this.changeDisplay} authed={this.state.authed} />
        {this.state.display}
      </div>
    );
  }
```

## Links
- Github: https://github.com/seiretsym
- LinkedIn: https://linkedin.com/in/kerwinhy
- Deployed Site: https://musicalchairs.herokuapp.com