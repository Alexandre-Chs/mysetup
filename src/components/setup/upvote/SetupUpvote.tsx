"use client";
import React, { useEffect } from "react";
import UpVoteButton from "./SetupUpvoteButton";
import { useSetupStore } from "@/store/SetupStore";
import { hasUserUpVotedSetup } from "@/app/api/setups/media/actions";

const SetupUpvote = ({ setupId }: { setupId?: string }) => {
  const setup = useSetupStore((state) => state.setup);
  const setUpVoted = useSetupStore((state) => state.setUpVoted);
  const isUpVoted = useSetupStore((state) => state.isUpVoted);

  useEffect(() => {
    async function fetchData() {
      const userUpVote = await hasUserUpVotedSetup(setupId as string);
      setUpVoted(userUpVote);
    }
    fetchData();
  });

  return <UpVoteButton upVotesCount={setup?.upVotes?.length} userUpVoted={isUpVoted} setupId={setupId as string} />;
};

export default SetupUpvote;
