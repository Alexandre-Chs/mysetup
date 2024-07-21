import { getOneImageSetup } from "@/actions/setup/get";
import Image from "next/image";
import React from "react";

const CardSetup = async ({ setup }: { setup: any }) => {
  const photo = await getOneImageSetup(setup.id);

  return (
    <div className="w-80 overflow-hidden rounded-xl shadow-md">
      <div className="">
        {photo ? (
          <Image
            src={photo?.media.url as string}
            alt="setup image"
            width={400}
            height={300}
            className="object-cover h-60 w-80 rounded-t-large"
          />
        ) : (
          <div className="h-60 w-80 rounded-t-large bg-gray-200 flex items-center justify-center">
            No image for this setup yet
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold md:text-xl text-ellipsis overflow-hidden w-72 text-nowrap">
          {setup.name}
        </h3>
        <p className="text-sm text-ellipsis overflow-hidden w-72 text-nowrap">
          {setup.description ? setup.description : "No description"}
        </p>
      </div>
    </div>
  );
};

export default CardSetup;
