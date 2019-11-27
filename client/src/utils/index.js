import axios from "axios";

export default {
  // get all students
  getStudents: function () {
    return axios.get("/api/students");
  },
  addStudent: function (student) {
    return axios.post("/api/students", student);
  },
  editStudent: function (id, student) {
    return axios.put("/api/students/" + id, student);
  },
  removeStudent: function (id) {
    return axios.delete("/api/students/" + id);
  }
}