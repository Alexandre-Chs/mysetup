import { getOneImageSetup } from "@/actions/setup/get";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteSetupButton from "./DeleteSetupButton";
import { validateRequest } from "@/lib/auth/validate-request";

const CardSetup = async ({ setup }: { setup: any }) => {
  const { user } = await validateRequest();

  const photo = await getOneImageSetup(setup.id);

  return (
    <Link href={`${user?.username}/${setup.id}`} className="block w-full">
      <div className="w-full h-[200px] overflow-hidden rounded-large border-black flex bg-[#212121] hover:scale-105 transition-transform duration-300 hover:shadow-xl">
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
        <div className="relative basis-2/4 pt-2 pl-4 text-white gap-4 flex flex-col">
          <h3 className="text-lg font-semibold md:text-2xl overflow-hidden uppercase">
            {setup.name}
          </h3>
          <p className="text-sm text-ellipsis overflow-hidden">
            {setup.description ? setup.description : "No description"}
          </p>

          {user?.id === setup.userId && (
            <div>
              <DeleteSetupButton setupId={setup.id} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardSetup;
