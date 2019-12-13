const db = require("../models");
const ObjectId = require("mongodb").ObjectID;

// Defining methods for the seatController
module.exports = {
  find: function (req, res) {
    db.Class
      .find({})
      .then(classes => {
        console.log(classes);
        res.status(200).json(classes);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  findOne: function (req, res) {
    db.Class
      .find(req.params.id)
      .then(data => {
        console.log(data);
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      })
  },
  update: function (req, res) {
    db.Class
      .update(req.params.id, { $set: req.body })
  },
  create: function (req, res) {
    db.Class
      .create(req.body)
      .then(data => {
        console.log(data);
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  remove: function (req, res) {
    db.Class
      .remove(req.params.id)
      .then(byebye => {
        console.log(byebye);
        res.status(200).json(byebye);
      })
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      })
  }
}