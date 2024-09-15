"use client";

import React from "react";
import PhotosUser from "./Photos";
import ModalCarousel from "./carousel/ModalCarousel";
import Carousel from "./carousel/Carousel";
import SetupPhotoCarousel from "./carousel/SetupPhotoCarousel";
import UploadSetupPicture from "./UploadSetupPicture";

const WrapperPhotosUser = ({ photos }: { photos: any }) => {
  const [clickedImageId, setClickedImageId] = React.useState("");

  const handleClickImage = (id: string) => {
    console.log({ id });
    setClickedImageId(id);
  };

  return (
    <div className="min-h-[700px]">
      <SetupPhotoCarousel
        slides={photos}
        options={{ loop: true }}
        handleClickImage={handleClickImage}
      />
      {/* <PhotosUser photos={photos} handleClickImage={handleClickImage} /> */}
      <ModalCarousel photos={photos} selectedId={clickedImageId} />
    </div>
  );
};

export default WrapperPhotosUser;
