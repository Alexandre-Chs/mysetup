'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HomeAurora, Feed, Footer } from '@components/index';

export const Home = () => {
  return (
    <>
      <div className="absolute inset-0 h-screen w-full overflow-hidden bg-[#07080A]">
        <HomeAurora>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            className="relative flex flex-col gap-4 items-center justify-center px-4">
            <div className="text-3xl md:text-7xl font-bold text-textColorLighter text-center max-w-2xl mx-auto px-4 md:px-0">Endless Inspiration for your setup</div>
            <div className="font-light text-sm md:text-xl sm:text-medium text-textColor md:py-4 py-0 max-w-xl mx-auto text-center px-4 md:px-0">
              Browse setups you love, find the exact gear in seconds. Simple as that.
            </div>
          </motion.div>
        </HomeAurora>
      </div>
      <div className="xl:px-64 md:px-32 px-0 mx-auto mt-[45vh]">
        <Feed />
      </div>
      <Footer />
    </>
  );
};
