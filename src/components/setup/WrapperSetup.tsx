import React from "react";
import Review from "./Review";
import UserProfile from "./UserProfile";
import Description from "./Description";
import Equipment from "./Equipment";
import { Setup, SetupPhoto } from "@/db/schemas";
import { getEquipmentsSetup } from "@/actions/setup/get";
import WrapperPhotosUser from "./WrapperPhotosUser";
import UpdateDescription from "./update-setup/UpdateDescription";
import WrapperDescriptionSetup from "./WrapperDescriptionSetup";
import Carousel from "./carousel/Carousel";
import ModalCarousel from "./carousel/ModalCarousel";

type CompleteSetup = Setup & { setupPhotos: SetupPhoto[] };

const WrapperSetup = async ({
  setup,
  isOwner,
}: {
  setup: CompleteSetup;
  isOwner: boolean;
}) => {
  const equipments = await getEquipmentsSetup(setup.id);

  return (
    <div className="h-3/4 w-full max-w-6xl mx-auto grid grid-cols-4 grid-rows-6 gap-6">
      <div className="col-span-3 row-span-4">
        <WrapperPhotosUser photos={setup.setupPhotos} />
      </div>
      <div className="col-span-1 row-span-6">
        <Equipment equipments={equipments} />
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
        <WrapperDescriptionSetup description={setup.description as string} />
      </div>
    </div>
  );
};

export default WrapperSetup;
