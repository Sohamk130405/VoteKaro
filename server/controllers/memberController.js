const Member = require("../models/member.js");
const User = require("../models/user.js");
module.exports.getMembers = async (req, res) => {
  try {
    const { constituency } = req.params;
    const members = await Member.find({ constituency });
    res.status(200).json(members);
  } catch (error) {
    console.log(error);
  }
};

module.exports.vote = async (req, res) => {
  try {
    const { memberId, userId } = req.params;
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({ error: "Member not found!" });
    }
    member.votes.push(userId);
    const user = await User.findById(userId);
    if (user.isVoted) {
      return res.status(400).json("User already voted!");
    }
    user.isVoted = true;
    await member.save();
    await user.save();
    res.status(200).json({ success: "Voted Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getVotes = async (req, res) => {
  const { constituency } = req.params;
  try {
    const members = await Member.find({ constituency }).populate(
      "party",
      "name img"
    );

    const membersInfo = members.map((member) => ({
      memberName: member.name,
      partyName: member.party.name,
      voteCount: member.votes.length,
      img: member.party.img,
    }));

    res.json(membersInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
