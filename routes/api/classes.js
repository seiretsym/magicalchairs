const router = require("express").Router();
const classController = require("../../controllers/classController");

// Matches with "api/classes"
router.route("/")
  .get(classController.find)
  .put(classController.updateOrCreate);
module.exports = router;