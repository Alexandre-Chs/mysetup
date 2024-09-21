"use client";
import { toggleUpVote } from "@/actions/up-vote/up-vote.create-update";
import clsx from "clsx";
import { FaCaretUp } from "react-icons/fa";

const UpVoteButton = ({
  upVotesCount,
  userUpVoted,
  setupId,
}: {
  upVotesCount: number;
  userUpVoted: boolean;
  setupId: string;
}) => {
  const toggleVote = async () => {
    await toggleUpVote(setupId);
  };

  return (
    <div
      className="h-full text-white flex items-center justify-center gap-4 px-4 rounded-large cursor-pointer bento-smooth-gradient border-[1px] border-[#1F2022]"
      onClick={() => toggleVote()}
    >
      <FaCaretUp
        className={clsx(
          userUpVoted ? "text-[#44db30]" : "text-white",
          "basis-1/3"
        )}
        size={50}
      />
      <div className="basis-2/3">
        <p className="text-2xl font-bold">{upVotesCount} UpVotes</p>
      </div>
    </div>
  );
};

export default UpVoteButton;
