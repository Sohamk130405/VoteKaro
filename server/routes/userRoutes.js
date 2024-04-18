const express = require("express");
// const { protectRoute } = require("../middlewares/protectRoute.js");
const router = express.Router();

const {
  signUpUser,
  loginUser,
  verifyUser,
  logoutUser,
} = require("../controllers/userController.js");

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/verifyUser", verifyUser);
router.post("/logout", logoutUser);
module.exports = router;
