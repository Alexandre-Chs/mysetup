import React from "react";
import Review from "./Review";
import UserProfile from "./UserProfile";
import Description from "./Description";
import Equipment from "./Equipment";

const WrapperSetup = () => {
  return (
    <div className="h-3/4 w-full max-w-6xl mx-auto grid grid-cols-4 grid-rows-6 gap-6">
      <div className="bg-red-300 col-span-3 row-span-4">grid</div>
      <div className="col-span-1 row-span-6">
        <Equipment />
      </div>
      <div className="col-span-1 row-span-2 flex flex-col gap-2">
        <div className="flex-1">
          <UserProfile />
        </div>
        <div className="flex-1">
          <Review />
        </div>
      </div>
      <div className="col-span-2 row-span-2 col-start-2 row-start-5">
        <Description />
      </div>
    </div>
  );
};

export default WrapperSetup;
