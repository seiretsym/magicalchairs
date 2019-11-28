import axios from "axios";

export default {
  // get all students
  getStudents: function () {
    return axios.get("/api/students");
  },
  getStudent: function (id) {
    return axios.get("/api/students/" + id);
  },
  addStudent: function (student) {
    return axios.post("/api/students", student);
  },
  editStudent: function (id, student) {
    return axios.put("/api/students/" + id, student);
  },
  removeStudent: function (id) {
    return axios.delete("/api/students/" + id);
  },
  blockStudent: function (data) {
    return axios.put("/api/students/block", data);
  },
  unblockStudent: function (data) {
    return axios.put("/api/students/unblock", data);
  },
  getSeatArrangement: function () {
    return axios.get("/api/seats");
  },
  updateSeatArrangement: function (seating) {
    return axios.put("/api/seats", seating)
  },
  unpairStudent: function (data) {
    return axios.put("/api/students/unpair", data)
  },
  dropDatabase: function () {
    return axios.delete("/api");
  }
}