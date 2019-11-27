const db = require("../models");
const ObjectId = require("mongodb").ObjectID;

// Defining methods for the booksController
module.exports = {
  // update configs
  find: function (req, res) {
    db.Student
      .find({})
      .then(students => {
        console.log(students);
        res.status(200).json(students);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      })
  },
  create: function (req, res) {
    db.Student
      .create(req.body)
      .then(student => {
        console.log(student)
        res.status(200).json(student)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error)
      })
  },
  update: function (req, res) {
    let id = ObjectId(req.params.id);
    db.Student
      .updateOne({ _id: id }, { $set: req.body })
      .then(student => {
        console.log(student)
        res.status(200).json(student)
      })
      .catch(error => {
        console.log(error)
        res.status(404).json(error)
      })
  },
  remove: function (req, res) {
    let id = ObjectId(req.params.id);
    db.Student
      .remove({ _id: id })
      .then(aww => {
        console.log(aww);
        res.status(200).json(aww);
      })
      .catch(error => {
        console.log(error);
        res.status(404).json(error)
      })
  },
};
