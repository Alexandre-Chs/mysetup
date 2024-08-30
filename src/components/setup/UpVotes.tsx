import { toggleUpVote } from "@/actions/up-vote/up-vote.create-update";
import { getSetupUpVotes, hasUserUpVotedSetup } from "@/actions/up-vote/up-vote.get";
import { validateRequest } from "@/lib/auth/validate-request";
import React from "react";
import UpVoteButton from "./UpVoteButton";

const UpVotes = async ({ setupId }: { setupId: string }) => {
  const { user } = await validateRequest();

  const upVotes = await getSetupUpVotes(setupId);
  const userUpVoted = !user ? false : await hasUserUpVotedSetup(setupId, user!.id);



  return <UpVoteButton
    upVotes={upVotes}
    userUpVoted={userUpVoted}
    user={user}
    setupId={setupId}
  />
};

export default UpVotes;
