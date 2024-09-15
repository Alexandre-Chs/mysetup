import React from "react";
import UpVotes from "./UpVotes";
import WrapperPhotosUser from "./WrapperPhotosUser";
import WrapperDescriptionSetup from "./WrapperDescriptionSetup";
import { User } from "@/types/types";
import WrapperEquipmentSetup from "./WrapperEquipmentSetup";
import { useSetupStore } from "@/store/SetupStore";

const WrapperSetup = ({
  currentUser,
  isOwner,
}: {
  currentUser: User | null;
  isOwner: boolean;
}) => {
  const setup = useSetupStore((state) => state.setup);
  if (!setup) return null;

  return (
    <div className="h-full w-full grid grid-cols-4 grid-rows-8 gap-6">
      <div className="col-span-3 row-span-6">
        <WrapperPhotosUser photos={setup.setupPhotos} />
      </div>
      <div className="col-span-1 row-span-6">
        <WrapperEquipmentSetup setupId={setup?.id} isOwner={isOwner} />
      </div>
      <div className="col-span-1 row-span-1 row-start-7">
        <div className="h-full bg-noise-horizontal-mini border-[1px] border-[#1F2022] text-white flex items-center justify-center gap-4 px-4 rounded-large cursor-pointer">
          <p>alexandre</p>
        </div>
      </div>
      <div className="col-span-1 row-span-1 row-start-8">
        <UpVotes setupId={setup.id} />
      </div>
      <div className="col-span-3 row-span-2 col-start-2 row-start-7">
        <WrapperDescriptionSetup
          description={setup?.description as string}
          setupId={setup?.id as string}
          isOwner={isOwner}
        />
      </div>
    </div>
  );
};

export default WrapperSetup;
