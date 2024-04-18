const Party = require("../models/party.js");

module.exports.getParties = async (req, res) => {
  try {
    const parties = await Party.find({});
    res.status(200).json(parties);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getPartyVotes = async (req, res) => {
  try {
    const parties = await Party.aggregate([
      {
        $lookup: {
          from: "members",
          localField: "_id",
          foreignField: "party",
          as: "members",
        },
      },
      {
        $project: {
          name: 1,
          minister: 1,
          img: 1,
          voteCount: { $size: "$members.votes" },
        },
      },
    ]);
    res.json(parties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
