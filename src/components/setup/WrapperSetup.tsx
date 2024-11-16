import React from "react";
import UpVotes from "./UpVotes";
import WrapperPhotosUser from "./WrapperPhotosUser";
import WrapperDescriptionSetup from "./WrapperDescriptionSetup";
import { User } from "@/types/types";
import WrapperEquipmentSetup from "./WrapperEquipmentSetup";
import { useSetupStore } from "@/store/SetupStore";
import { useQuery } from "@tanstack/react-query";
import { getUserInfos } from "@/actions/user/getInfos";
import { getSocialIcon } from "@/lib/utils/show-social-icons";
import { useParams } from "next/navigation";
import Border from "../ui/border";

const WrapperSetup = ({
  currentUser,
  isOwner,
}: {
  currentUser: User | null;
  isOwner: boolean;
}) => {
  const setup = useSetupStore((state) => state.setup);
  const { username, id } = useParams();

  const { data: userInfos } = useQuery({
    queryKey: ["userInfos", currentUser?.username],
    queryFn: async () => {
      if (!currentUser) return null;
      return await getUserInfos(currentUser.username);
    },
  });

  if (!setup) return;

  return (
    <div className="h-[900px] w-full grid xl:grid-cols-4 xl:grid-rows-8 gap-6">
      <div className="xl:col-span-3 xl:row-span-6">
        <WrapperPhotosUser photos={setup.setupPhotos} isOwner={isOwner} />
      </div>
      <div className="xl:col-span-1 xl:row-span-6 order-3 max-h-[400px] min-h-[100px] xl:h-full xl:min-h-full xl:max-h-full">
        <WrapperEquipmentSetup setupId={setup?.id} isOwner={isOwner} />
      </div>

      <div className="w-full h-full flex gap-x-2 xl:gap-y-2 row-span-2 col-span-1 xl:col-span-1 xl:row-span-2 xl:row-start-7 order-1 xl:grid grid-rows-2">
        <Border>
          <div className="flex items-center justify-center flex-1 row-span-1 h-full xl:min-h-auto flex-col ">
            <div className="flex flex-row gap-4 w-full px-4">
              <img
                src={userInfos?.media?.url || "/default-user.jpg"}
                className="size-12 rounded-full"
              />
              <div>
                <a
                  href={`/${username}`}
                  className="font-medium text-xl xl:text-base"
                >
                  {username}
                </a>
                <div className="flex gap-x-4">
                  {userInfos?.socialLinks
                    ? userInfos?.socialLinks.map((link: any) => (
                        <a key={link.id} href={link.link} target="_blank">
                          {getSocialIcon(link.socialName)}
                        </a>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </Border>

        <Border>
          <div className="flex-1 w-full h-full row-span-1 flex items-center justify-center">
            <UpVotes setupId={setup.id} />
          </div>
        </Border>
      </div>

      <div className="xl:col-span-3 xl:row-span-2 xl:col-start-2 xl:row-start-7 order-2">
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
