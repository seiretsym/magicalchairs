const router = require("express").Router();
const students = require("./students");

// User routes
router.use("/students", students);

module.exports = router;