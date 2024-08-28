"use client";

import { Divider } from "@nextui-org/react";
import React from "react";
import { GlareCard } from "./GlareCard";
import { PiTwitterLogoFill } from "react-icons/pi";
import Link from "next/link";
import { Card, Carousel } from "./CarouselCard";

const carouselItems = [
  <Card
    key="card1"
    card={{
      src: "",
      title: "Setup Gaming 1",
      category: "Gaming",
      content: <p>Description du setup gaming 1.</p>,
    }}
    index={0}
    layout={true}
  />,
  <Card
    key="card2"
    card={{
      src: "",
      title: "Setup Gaming 2",
      category: "Gaming",
      content: <p>Description du setup gaming 2.</p>,
    }}
    index={1}
    layout={true}
  />,
  <Card
    key="card1"
    card={{
      src: "",
      title: "Setup Gaming 3",
      category: "Gaming",
      content: <p>Description du setup gaming 1.</p>,
    }}
    index={0}
    layout={true}
  />,
  <Card
    key="card2"
    card={{
      src: "",
      title: "Setup Gaming 4",
      category: "Gaming",
      content: <p>Description du setup gaming 2.</p>,
    }}
    index={1}
    layout={true}
  />,
];

const WrapperProfile = () => {
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center w-full">
      <div className="flex w-full h-full items-center justify-center">
        <div className="group relative basis-1/4">
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
                  <p>10 setups posted</p>
                  <p>Total vote on setup : 123</p>
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
          className="h-[60%] bg-gradient-to-t from-transparent via-separator/50 to-transparent mx-32"
        />

        <div className="basis-3/4">
          <Carousel items={carouselItems} initialScroll={0} />
        </div>
      </div>
    </div>
  );
};

export default WrapperProfile;
