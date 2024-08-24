"use client";

import React from "react";
import Feed from "../feed/Feed";

const WrapperHome = ({ allSetupsPhotos }: { allSetupsPhotos: any }) => {
  return (
    <div>
      <Feed photos={allSetupsPhotos} />
    </div>
  );
};

export default WrapperHome;
