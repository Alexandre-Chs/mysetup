import React from "react";
import { Divider } from "@heroui/react";
import { GlareCard } from "./GlareCard";
import Link from "next/link";
import { Card, Carousel } from "./CarouselCard";
import UpdateUserProfileCard from "./UpdateUserProfileCard";
import { validateRequest } from "@/lib/auth/validate-request";
import { getSocialIcon } from "@/lib/utils/show-social-icons";
import { getUserInfos } from "@/app/api/users/actions";

const WrapperProfile = async ({ setups, currentUsername }: { setups: any; currentUsername: string }) => {
  const { user } = await validateRequest();
  const userInfos = await getUserInfos(currentUsername);

  const carouselItems = setups.map((setup: any, index: number) => {
    return (
      <Card
        key={`card${index}`}
        card={{
          src: setup.photo.url,
          title: setup.name || `Setup ${index + 1}`,
          category: setup.category || "",
          content: <p>{setup.description || `Description du setup ${index + 1}.`}</p>,
          link: `/${setup.user.username}/${setup.id}`,
          setupId: setup.id,
        }}
        index={index}
        layout={true}
        user={user}
        currentUsername={currentUsername}
      />
    );
  });

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1500px] mx-auto px-4">
      <div className="flex flex-col xl:flex-row w-full h-full items-center justify-start xl:gap-x-32">
        <div className="group relative flex-shrink-0">
          <div className="absolute -left-[5px] top-0 w-[320px] h-[400px] group-hover:bg-[#2f2f37] blur-xl transition-colors rounded-xl"></div>
          <GlareCard className="relative z-50">
            <div className="absolute top-5 right-5">{user?.username === currentUsername && <UpdateUserProfileCard userInfos={userInfos} />}</div>
            <div className="relative flex flex-col items-center justify-center h-full gap-y-12" style={{ pointerEvents: "none" }}>
              <div className="flex flex-col items-center justify-center gap-y-4 w-[300px] flex-wrap">
                <img className="rounded-full size-24" src={userInfos?.media?.url || "/default-user.jpg"} alt="" />
                <h1 className="flex items-start justify-center text-2xl text-textColorLighter font-bold">{currentUsername}</h1>
                <p className="text-sm w-3/4 text-textColorLighter text-center">{userInfos && userInfos.profile ? userInfos.profile.profileDescription : "No description yet"}</p>
                <div className="flex flex-col  text-textColor items-center justify-center">
                  <p>{setups.length} setup posted</p>
                  {/* <p>134 votes on setup</p> */}
                </div>
              </div>
              <div className="flex items-center flex-col justify-center w-full px-12">
                <div style={{ pointerEvents: "auto" }} className="flex items-center justify-center cursor-pointer pointer-events-auto gap-x-2">
                  {userInfos &&
                    userInfos.socialLinks.map((link) => (
                      <Link key={link.id} href={link.link} style={{ pointerEvents: "auto" }} className="flex items-center justify-center p-1 rounded-xl w-full cursor-pointer pointer-events-auto">
                        {getSocialIcon(link.socialName)}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </GlareCard>
        </div>

        <Divider orientation="vertical" className="hidden xl:block h-[600px] w-[1px] bg-gradient-to-t from-transparent via-separator/20 to-transparent mx-4 md:mx-6 lg:mx-8 flex-shrink-0" />

        <div className="flex-grow overflow-x-auto w-full">
          <Carousel items={carouselItems} initialScroll={0} user={user} currentUsername={currentUsername} />
        </div>
      </div>
    </div>
  );
};

export default WrapperProfile;
