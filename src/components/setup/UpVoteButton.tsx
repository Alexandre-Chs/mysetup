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
      className="h-full text-white flex items-center justify-center gap-x-2 px-4 rounded-large cursor-pointer bento-smooth-gradient"
      onClick={() => toggleVote()}
    >
      <FaCaretUp
        className={clsx(userUpVoted ? "text-[#44db30]" : "text-white")}
        size={30}
      />
      <div>
        <p className="text-xl font-medium">{upVotesCount} Upvotes</p>
      </div>
    </div>
  );
};

export default UpVoteButton;
