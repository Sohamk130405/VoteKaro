const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  minister: {
    type: String,
    required: true,
  },
});

const Party = mongoose.model("Party", partySchema);
module.exports = Party;
