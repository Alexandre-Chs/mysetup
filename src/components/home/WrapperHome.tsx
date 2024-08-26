"use client";

import React from "react";
import Feed from "../feed/Feed";

const WrapperHome = ({ allSetupsPhotos }: { allSetupsPhotos: any }) => {
  return (
    <div className="max-w-[80rem] mx-auto mt-8">
      <Feed photos={allSetupsPhotos} />
    </div>
  );
};

export default WrapperHome;
