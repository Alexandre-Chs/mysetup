import React from "react";
import { Divider } from "@nextui-org/react";
import { GlareCard } from "./GlareCard";
import { PiTwitterLogoFill } from "react-icons/pi";
import Link from "next/link";
import { Card, Carousel } from "./CarouselCard";

const WrapperProfile = ({ setups }: { setups: any }) => {
  const carouselItems = setups.map((setup: any, index: number) => (
    <Card
      key={`card${index}`}
      card={{
        src: setup.photo.url,
        title: setup.name || `Setup ${index + 1}`,
        category: setup.category || "Gaming",
        content: (
          <p>{setup.description || `Description du setup ${index + 1}.`}</p>
        ),
        link: `/${setup.user.username}/${setup.id}`,
      }}
      index={index}
      layout={true}
    />
  ));

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center w-full px-6 md:px-8 lg:px-12">
      <div className="flex w-full h-full items-center justify-start gap-x-24">
        <div className="group relative flex-shrink-0">
          <div className="absolute -left-[5px] top-0 w-[320px] h-[400px] group-hover:bg-[#2f2f37] blur-xl transition-colors rounded-xl"></div>
          <GlareCard className="relative z-50">
            <div
              className="flex flex-col items-center justify-center h-full gap-y-12"
              style={{ pointerEvents: "none" }}
            >
              <div className="flex flex-col items-center justify-center gap-y-4">
                <h1 className="flex items-start justify-center text-2xl text-textColorLighter font-medium">
                  Alexandre
                </h1>
                <p className="text-sm text-textColor text-center">
                  Je suis passioné de gaming et je suis une grande description
                  assez longue
                </p>
                <div className="flex flex-col items-center justify-center">
                  <p>0 setups posted</p>
                  <p>Total vote on setup : </p>
                </div>
              </div>

              <div className="flex items-center flex-col gap-y-2 justify-center w-full px-12">
                <Link
                  href="/"
                  style={{ pointerEvents: "auto" }}
                  className="flex gap-x-2 items-center justify-center p-2 rounded-xl w-full cursor-pointer pointer-events-auto"
                >
                  <PiTwitterLogoFill />
                  <p>@trouduc</p>
                </Link>
              </div>
            </div>
          </GlareCard>
        </div>

        <Divider
          orientation="vertical"
          className="h-[60%] bg-gradient-to-t from-transparent via-separator/50 to-transparent mx-4 md:mx-6 lg:mx-8 flex-shrink-0"
        />

        <div className="flex-grow overflow-x-auto">
          <Carousel items={carouselItems} initialScroll={0} />
        </div>
      </div>
    </div>
  );
};

export default WrapperProfile;
