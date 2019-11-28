const db = require("../models");
const ObjectId = require("mongodb").ObjectID;

// Defining methods for the seatController
module.exports = {
  // get seating arrangement
  find: function (req, res) {
    db.Seat
      .find({ name: "current" })
      .populate("seating")
      .then(seating => {
        console.log(seating);
        res.status(200).json(seating)
      })
      .catch(error => {
        console.log(error);
        res.status(404).json(error);
      })
  },
  // update or create
  updateOrCreate: function (req, res) {
    console.log("---db.Seat.updateOrCreate---");
    let arrangement = req.body;
    let newSeating = [];
    // update each user's yep
    Promise.all(arrangement.map(each => {
      let id = each._id;
      // console.log(id)
      let promise = new Promise((resolve, reject) => {
        each.yep.map((student, index) => {
          let yid = student;
          // console.log(yid)
          let timer = setTimeout(() => {
            db.Student
              .updateOne({ _id: id }, { $addToSet: { yep: yid } })
              .then(uhoh => {
                console.log(uhoh);
                resolve(each);
              })
              .catch(error => {
                reject(each);
                console.log(error);
                res.status(500).json(error);

              })
          }, 250 * index);
        });
      })
      return promise.then(sid => {
        newSeating.push(sid._id);
        console.log(newSeating);
      });
    })).then(() => {
      let data = {
        name: "current",
        seating: newSeating,
      }
      db.Seat
        .find({ name: "current" })
        .then(seating => {
          if (seating.length > 0) {
            // update
            console.log("seating.length > 0")
            db.Seat
              .updateOne({ name: "current" }, { $set: { seating: newSeating } })
              .then(seats => {
                console.log(seats);
                res.status(200).json(seats);
              })
              .catch(error => {
                console.log(error);
                res.status(500).json(seats);
              })
          } else {
            console.log("seating.length < 1")
            console.log(data);
            db.Seat
              .create(data)
              .then(seats => {
                console.log(seats);
                res.status(200).json(seats);
              })
              .catch(error => {
                console.log(error);
                res.status(500).json(error)
              })
          }
        })
    })
  }
};