const router = require("express").Router();
const studentController = require("../../controllers/studentController");

// Matches with "api/users"
router.route("/")
  .post(studentController.create)
  .get(studentController.find);
router.route("/:id")
  .put(studentController.update)
  .delete(studentController.remove);

module.exports = router;