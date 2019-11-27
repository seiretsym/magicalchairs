const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  socialRating: {
    type: Number,
    default: 0,
  },
  codeRating: {
    type: Number,
    default: 0,
  },
  yep: [{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
  nope: [{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }]
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;