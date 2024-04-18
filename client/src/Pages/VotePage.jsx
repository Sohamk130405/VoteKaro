import React, { useState } from "react";
import Vote from "../components/Vote";

import Instructions from "../components/Instructions";

const VotePage = () => {
  const [voteScreen, setVoteScreen] = useState(false);
  return (
    <>
      {!voteScreen && <Instructions setVoteScreen={setVoteScreen} />}
      {voteScreen && <Vote />}
    </>
  );
};

export default VotePage;
