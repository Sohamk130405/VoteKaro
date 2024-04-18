const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

const {
  generateTokenAndSetCookie,
} = require("../utils/helpers/generateTokenAndSetCookie.js");

module.exports.signUpUser = async (req, res) => {
  try {
    const { name, phone, votingId, aadharNumber, img, constituency } = req.body;

    const user = await User.findOne({ $or: [{ aadharNumber }, { votingId }] });

    if (user) {
      return res.status(400).json({ error: "User already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedVotingId = await bcrypt.hash(votingId, salt);
    const hashedAadharNumber = await bcrypt.hash(aadharNumber, salt);
    const uploadedResponse = await cloudinary.uploader.upload(img);

    const newUser = new User({
      name,
      votingId: hashedVotingId,
      aadharNumber: hashedAadharNumber,
      phone,
      img: uploadedResponse.secure_url,
      constituency,
    });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        constituency: newUser.constituency,
        isVoted: newUser.isVoted,
      });
    } else {
      res.status(400).json({ error: "Invalid User Credentials!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in signUpUser: ", error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  const { votingId, phone } = req.body;
  const user = await User.findOne({ phone });

  if (!user) {
    return res.status(400).json({ error: "User not found!" });
  }

  const isVotingIdCorrect = await bcrypt.compare(votingId, user.votingId || "");

  if (!isVotingIdCorrect) {
    return res.status(400).json({ error: "Incorrect Voting ID!" });
  }

  // Generate OTP and store it in the user document
  user.otp = Math.floor(1000 + Math.random() * 9000);
  user.otpExpiry = Date.now() + 60000; // OTP expires in 1 minute
  await user.save();
  const otp = user.otp;
  // Send OTP to the user's phone number (you need to implement this)

  res.status(200).json({ success: "OTP sent successfully", otp });
};

module.exports.verifyUser = async (req, res) => {
  const { phone, otp } = req.body;

  // Find the user by phone number
  const user = await User.findOne({ phone });

  if (!user) {
    return res.status(400).json({ error: "User not found!" });
  }

  // Convert user.otp to number for comparison
  // Check if OTP is correct and not expired
  if (user.otp.toString() !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ error: "Invalid OTP or OTP expired" });
  }

  // Clear OTP fields
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  const token = {
    _id: user._id,
    name: user.name,
    constituency: user.constituency,
    isVoted: user.isVoted,
  };
  // Generate token and set cookie
  generateTokenAndSetCookie(user._id, res);

  res.status(200).json({ success: "OTP verified successfully", token });
};

module.exports.logoutUser = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in logoutUser: ", error.message);
  }
};
