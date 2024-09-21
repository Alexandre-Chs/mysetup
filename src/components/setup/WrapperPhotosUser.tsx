"use client";

import React from "react";
import SetupPhotoCarousel from "./carousel/SetupPhotoCarousel";

const WrapperPhotosUser = ({
  photos,
  isOwner,
}: {
  photos: any;
  isOwner: boolean;
}) => {
  return (
    <div>
      <SetupPhotoCarousel
        slides={photos}
        options={{ loop: true }}
        isOwner={isOwner}
      />
    </div>
  );
};

export default WrapperPhotosUser;
