"use client";

import React from "react";
import PhotosUser from "./Photos";
import ShowClickedImage from "../modal/ShowClickedImage";
import ModalCarousel from "./carousel/ModalCarousel";

const WrapperPhotosUser = ({ photos }: { photos: any }) => {
  const [clickedImageId, setClickedImageId] = React.useState("");

  const handleClickImage = (id: string) => {
    console.log({ id });
    setClickedImageId(id);
  };

  return (
    <>
      <PhotosUser photos={photos} handleClickImage={handleClickImage} />
      <ModalCarousel photos={photos} selectedId={clickedImageId} />
    </>
  );
};

export default WrapperPhotosUser;
