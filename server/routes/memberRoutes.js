const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute.js");
const router = express.Router();

const {
  getMembers,
  vote,
  getVotes,
} = require("../controllers/memberController.js");
router.get("/getMembers/:constituency", protectRoute, getMembers);
router.post("/vote/:memberId/:userId", protectRoute, vote);
router.get("/constituency/:constituency/votes", protectRoute, getVotes);
module.exports = router;
