import React from "react";
import Review from "./Review";
import UserProfile from "./UserProfile";
import Description from "./Description";
import Equipment from "./Equipment";
import PhotosUser from "./Photos";

import { FAKES } from "@/lib/utils/fakes-datas-equipments";
import { Setup, SetupPhoto } from "@/db/schemas";
import { getEquipmentsSetup } from "@/actions/setup/get";

type CompleteSetup = Setup & { setupPhotos: SetupPhoto[] };

const WrapperSetup = async ({ setup }: { setup: CompleteSetup }) => {
  const equipments = await getEquipmentsSetup(setup.id);

  return (
    <div className="h-3/4 w-full max-w-6xl mx-auto grid grid-cols-4 grid-rows-6 gap-6">
      <div className="col-span-3 row-span-4">
        <PhotosUser photos={setup.setupPhotos} />
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
        <Description description={setup.description} />
      </div>
    </div>
  );
};

export default WrapperSetup;
