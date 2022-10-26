const express = require("express");
const router = express.Router();
const queryControler = require("../controller/queryController");

router.get("/fourth", queryControler.runFourthQuery);
router.get("/fifth", queryControler.runFifthQuery);
router.get("/sixth", queryControler.runSixthQuery);

module.exports = router;
