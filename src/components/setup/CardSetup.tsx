import { getOneImageSetup } from "@/actions/setup/get";
import Image from "next/image";
import React from "react";

const CardSetup = async ({ setup }: { setup: any }) => {
  const photo = await getOneImageSetup(setup.id);

  return (
    <div className="w-full h-[200px] max-w-3xl overflow-hidden rounded-large border-black mx-auto flex bg-[#212121] hover:scale-105 transition-transform duration-300 hover:shadow-xl">
      <div className="basis-2/4">
        {photo ? (
          <Image
            src={photo?.media.url as string}
            alt="setup image"
            width={400}
            height={300}
            className="object-cover h-full w-full rounded-tl-large rounded-bl-large"
          />
        ) : (
          <div className="h-full w-full rounded-tl-large rounded-bl-large bg-gray-200 flex items-center justify-center">
            No image for this setup yet
          </div>
        )}
      </div>
      <div className="basis-2/4 pt-2 pl-4 text-white gap-4 flex flex-col">
        <h3 className="text-lg font-semibold md:text-2xl overflow-hidden uppercase">
          {setup.name}
        </h3>
        <p className="text-sm text-ellipsis overflow-hidden">
          {setup.description ? setup.description : "No description"}
        </p>
      </div>
    </div>
  );
};

export default CardSetup;
