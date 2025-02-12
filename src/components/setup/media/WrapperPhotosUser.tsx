"use client";

import SetupPhotoCarousel from "@/components/carousel/setup/SetupPhotoCarousel";
import React from "react";

const WrapperPhotosUser = ({ photos, isOwner }: { photos: any; isOwner: boolean }) => {
  return <SetupPhotoCarousel slides={photos} options={{ loop: true }} isOwner={isOwner} />;
};

export default WrapperPhotosUser;
