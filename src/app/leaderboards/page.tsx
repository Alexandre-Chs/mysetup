import LeaderboardTable from "@/components/leaderboards/LeaderboardTable";
import { Spotlight } from "@/components/leaderboards/Spotlights";
import React from "react";

const Leaderboards = () => {
  return (
    <div className="min-h-[90vh] w-full rounded-md flex md:items-center md:justify-center antialiased relative px-8 md:px-16 lg:px-24">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#E6E6E6"
      />
      <div className="w-full flex flex-col items-center justify-center">
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Leaderboards
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Each month we&apos;ll be highlighting the best setup of the month.{" "}
            <br /> The first winner will be the one with the most upvotes.{" "}
            <br /> He win a gift card.
          </p>
        </div>
        <div className="mt-8 w-full">
          <LeaderboardTable />
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
