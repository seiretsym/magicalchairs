const router = require("express").Router();
const studentController = require("../../controllers/studentController");

// Matches with "api/students"
router.route("/")
  .post(studentController.create)
  .get(studentController.find);
router.route("/block")
  .put(studentController.blockOne);
router.route("/unblock")
  .put(studentController.unblockOne);
router.route("/pair")
  .put(studentController.pairOne);
router.route("/unpair")
  .put(studentController.unpairOne);
router.route("/:id")
  .get(studentController.findOne)
  .put(studentController.update)
  .delete(studentController.remove);
module.exports = router;