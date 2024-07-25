"use client";

import React from "react";
import Review from "./Review";
import UserProfile from "./UserProfile";
import Equipment from "./Equipment";
import { Setup, SetupPhoto } from "@/db/schemas";
import { getEquipmentsSetup, getSetup } from "@/actions/setup/get";
import WrapperPhotosUser from "./WrapperPhotosUser";
import WrapperDescriptionSetup from "./WrapperDescriptionSetup";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/types";
import { Spinner } from "../ui/spinner";

const WrapperSetup = ({
  currentUser,
  setupId,
}: {
  currentUser: User | null;
  setupId: string;
}) => {
  const { data: currentSetupData } = useQuery({
    queryKey: ["getSetup"],
    queryFn: async () => {
      return await getSetup(setupId);
    },
  });

  const { data: equipments } = useQuery({
    queryKey: ["getEquipmentsSetup"],
    queryFn: async () => {
      return await getEquipmentsSetup(setupId);
    },
  });

  //todo : faire un skeleton ici
  if (!currentSetupData) return <Spinner className="h-[60vh]" />;

  return (
    <div className="h-3/4 w-full max-w-6xl mx-auto grid grid-cols-4 grid-rows-6 gap-6">
      <div className="col-span-3 row-span-4">
        <WrapperPhotosUser
          photos={currentSetupData ? currentSetupData?.setupPhotos : []}
        />
      </div>
      <div className="col-span-1 row-span-6">
        <Equipment equipments={equipments ? equipments : []} />
      </div>
      <div className="col-span-1 row-span-2 flex flex-col gap-2">
        <div className="flex-1">
          <UserProfile currentUser={currentUser} />
        </div>
        <div className="flex-1">
          <Review />
        </div>
      </div>
      <div className="col-span-2 row-span-2 col-start-2 row-start-5">
        <WrapperDescriptionSetup
          description={currentSetupData?.description as string}
          setupId={currentSetupData?.id as string}
        />
      </div>
    </div>
  );
};

export default WrapperSetup;
