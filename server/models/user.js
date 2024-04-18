const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  constituency: {
    type: String,
    required: true,
  },
  votingId: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
  isVoted: {
    type: Boolean,
    default: "false",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
