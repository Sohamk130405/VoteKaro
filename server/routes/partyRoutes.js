const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute.js");
const router = express.Router();

const {
  getParties,
  getPartyVotes,
} = require("../controllers/partyController.js");

router.get("/getParties", protectRoute, getParties);
router.get("/votes", protectRoute, getPartyVotes);
module.exports = router;
