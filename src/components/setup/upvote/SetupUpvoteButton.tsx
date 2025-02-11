"use client";
import { toggleUpVote } from "@/app/api/setups/media/actions";
import clsx from "clsx";
import { FaCaretUp } from "react-icons/fa";

const SetupUpvoteButton = ({ upVotesCount, userUpVoted, setupId }: { upVotesCount: number; userUpVoted: boolean; setupId: string }) => {
  const toggleVote = async () => {
    await toggleUpVote(setupId);
  };

  return (
    <div className="h-full w-full text-white flex items-center justify-center gap-x-2 px-4 rounded-large cursor-pointer " onClick={() => toggleVote()}>
      <FaCaretUp className={clsx(userUpVoted ? "text-[#44db30]" : "text-white")} size={30} />
      <div>
        <p className="xl:text-base text-sm font-medium text-center">{upVotesCount} Upvotes</p>
      </div>
    </div>
  );
};

export default SetupUpvoteButton;
