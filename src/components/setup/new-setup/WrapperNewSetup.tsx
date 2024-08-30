import React from "react";
import UserProfile from "../UserProfile";
import UpVotes from "../UpVotes";
import NewDescription from "./NewDescription";
import PhotosUser from "../Photos";
import NewEquipmentsClient from "./NewEquipments.client";

const WrapperNewSetup = () => {
  return (
    <div className="h-3/4 w-full max-w-6xl mx-auto grid grid-cols-4 grid-rows-6 gap-6">
      <div className="col-span-3 row-span-4">
        <PhotosUser />
      </div>
      <div className="col-span-1 row-span-6">
        <NewEquipmentsClient />
      </div>
      <div className="col-span-1 row-span-2 flex flex-col gap-2">
        <div className="flex-1">
          <UserProfile />
        </div>
        <div className="flex-1">
          <UpVotes />
        </div>
      </div>
      <div className="col-span-2 row-span-2 col-start-2 row-start-5">
        <NewDescription />
      </div>
    </div>
  );
};

export default WrapperNewSetup;
