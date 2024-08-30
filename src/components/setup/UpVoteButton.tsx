"use client";
import { toggleUpVote } from "@/actions/up-vote/up-vote.create-update";
import { UpVote } from "@/db/schemas";
import clsx from "clsx";
import { User } from "lucia";
import { FaCaretUp } from "react-icons/fa";

const UpVoteButton = ({ upVotes, userUpVoted, user, setupId }: {
  upVotes: UpVote[];
  userUpVoted: boolean;
  user: User | null;
  setupId: string;
}) => {

  const toggleVote = async () => {
    if (!user) return;
    await toggleUpVote(setupId, user!.id);
  }

  return (
    <div
      className="h-full bg-[#151515] text-white flex items-center justify-center gap-4 px-4 rounded-large cursor-pointer hover:bg-[#696969] transition-all"
      onClick={() => toggleVote()}
    >
      <FaCaretUp className={clsx(
        userUpVoted ? "text-[#44db30]" : "text-white",
        "basis-1/3"
      )} size={50} />
      <div className="basis-2/3">
        <p className="text-2xl font-bold">{upVotes.length} UpVotes</p>
      </div>
    </div>
  );
}

export default UpVoteButton;