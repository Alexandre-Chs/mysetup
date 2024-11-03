import LeaderboardTable from "@/components/leaderboards/LeaderboardTable";
import { Spotlight } from "@/components/leaderboards/Spotlights";
import React from "react";

const Leaderboards = () => {
  return (
    <div className="min-h-[90vh] w-full rounded-md flex md:items-center md:justify-center antialiased relative md:px-16 lg:px-24 pb-12">
      <Spotlight
        className="-top-40 left-0 md:left-[23rem] xl:left-[15rem]"
        fill="#e6e6e6a9"
      />
      <div className="w-full flex flex-col items-center justify-center mt-12">
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Leaderboards
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-[18rem] sm:max-w-lg text-center mx-auto">
            Each month we&apos;ll be highlighting the best setup of the month.{" "}
            <br /> The winner will be the one with the most upvotes. <br /> He
            win a gift card.
          </p>
        </div>
        <div className="mt-20 w-full">
          <LeaderboardTable />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-black -rotate-[20deg] text-2xl">
        Coming soon
      </div>
    </div>
  );
};

export default Leaderboards;
