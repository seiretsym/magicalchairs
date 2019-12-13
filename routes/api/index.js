const router = require("express").Router();
const students = require("./students");
const seats = require("./seats");
const classes = require("./classes");

// User routes
router.use("/students", students);
router.use("/seats", seats);
router.use("/classes", classes);

module.exports = router;