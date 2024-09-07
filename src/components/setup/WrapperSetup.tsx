"use client";
import React from "react";
import UpVotes from "./UpVotes";
import UserProfile from "./UserProfile";
import WrapperPhotosUser from "./WrapperPhotosUser";
import WrapperDescriptionSetup from "./WrapperDescriptionSetup";
import { User } from "@/types/types";
import WrapperEquipmentSetup from "./WrapperEquipmentSetup";
import { useSetupStore } from "@/store/SetupStore";

const WrapperSetup = ({
  currentUser
}: {
  currentUser: User | null;
}) => {
  const setup = useSetupStore(state => state.setup)
  if (!setup) return null

  return (
    <div className="h-3/4 w-full max-w-6xl mx-auto grid grid-cols-4 grid-rows-6 gap-6">
      <div className="col-span-3 row-span-4">
        <WrapperPhotosUser photos={setup.setupPhotos} />
      </div>
      <div className="col-span-1 row-span-6">
        <WrapperEquipmentSetup setupId={setup?.id} />
      </div>
      <div className="col-span-1 row-span-2 flex flex-col gap-2">
        <div className="flex-1">
          <UserProfile currentUser={currentUser} />
        </div>
        <div className="flex-1">
          <UpVotes setupId={setup.id} />
        </div>
      </div>
      <div className="col-span-2 row-span-2 col-start-2 row-start-5">
        <WrapperDescriptionSetup
          description={setup?.description as string}
          setupId={setup?.id as string}
        />
      </div>
    </div>
  );
};

export default WrapperSetup;
