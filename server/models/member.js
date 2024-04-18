const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: mongoose.Types.ObjectId,
    ref: "Party",
  },
  constituency: {
    type: String,
    required: true,
  },
  votes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
