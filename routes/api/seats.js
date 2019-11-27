const router = require("express").Router();
const seatController = require("../../controllers/seatController");

// Matches with "api/seats"
router.route("/")
  .get(seatController.find)
  .put(seatController.updateOrCreate);
module.exports = router;