const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
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
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
