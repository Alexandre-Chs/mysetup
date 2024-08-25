"use client";

import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import "@/components/carousel/signup-carousel/embla.css";

const WrapperSignupCarousel = () => {
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />;
};

export default WrapperSignupCarousel;
