"use client";

import React from "react";
import Feed from "../feed/Feed";
import { AuroraBackground } from "./AuroraBackground";
import { motion } from "framer-motion";

const WrapperHome = ({ allSetupsPhotos }: { allSetupsPhotos: any }) => {
  return (
    <>
      <div className="absolute inset-0 h-screen w-full overflow-hidden bg-[#07080A]">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <div className="text-3xl md:text-7xl font-bold text-textColorLighter text-center">
              Find the best idea for your setup
            </div>
            <div className="font-light text-xl text-textColor py-4 max-w-xl mx-auto text-center">
              Or share your own setup and get inspired by other people&apos;s
              ideas
            </div>
          </motion.div>
        </AuroraBackground>
      </div>
      <div className="px-64 mx-auto mt-[70vh]">
        <Feed photos={allSetupsPhotos} />
      </div>
    </>
  );
};

export default WrapperHome;
