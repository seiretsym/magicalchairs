const path = require("path");
const router = require("express").Router();
const api = require("./api");
const studentController = require("../controllers/studentController");
// api routes
router.use("/api", api)
router.route("/")
  .delete(studentController.dropDatabase)

// send react app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"))
})

module.exports = router;