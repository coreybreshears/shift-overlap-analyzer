const express = require("express");
const router = express.Router();
const shiftController = require("../controller/shiftController");

router.get("/", shiftController.getAllShifts);
router.get("/check-overlap", shiftController.checkOverlapShifts);

module.exports = router;
