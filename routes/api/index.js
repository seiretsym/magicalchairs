const router = require("express").Router();
const students = require("./students");
const seats = require("./seats");

// User routes
router.use("/students", students);
router.use("/seats", seats);

module.exports = router;