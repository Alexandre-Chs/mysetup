"use client";

import React from "react";
import SetupPhotoCarousel from "./carousel/SetupPhotoCarousel";

const WrapperPhotosUser = ({ photos }: { photos: any }) => {
  return (
    <div className="min-h-[700px]">
      <SetupPhotoCarousel
        slides={photos}
        options={{ loop: true }}
      />
    </div>
  );
};

export default WrapperPhotosUser;
