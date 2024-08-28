"use client";

import React from "react";
import PhotosUser from "./Photos";
import ModalCarousel from "./carousel/ModalCarousel";
import Carousel from "./carousel/Carousel";
import SetupPhotoCarousel from "./carousel/SetupPhotoCarousel";

const WrapperPhotosUser = ({ photos }: { photos: any }) => {
  const [clickedImageId, setClickedImageId] = React.useState("");

  const handleClickImage = (id: string) => {
    console.log({ id });
    setClickedImageId(id);
  };

  return (
    <>
      <SetupPhotoCarousel slides={photos} />
      {/* <PhotosUser photos={photos} handleClickImage={handleClickImage} /> */}
      <ModalCarousel photos={photos} selectedId={clickedImageId} />
    </>
  );
};

export default WrapperPhotosUser;
