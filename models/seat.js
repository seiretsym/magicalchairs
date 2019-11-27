const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  seating: [{
    type: Schema.Types.ObjectId,
    ref: "Student",
    unique: true,
  }],
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;