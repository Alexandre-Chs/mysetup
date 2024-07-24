"use client";

import React from "react";
import PhotosUser from "./Photos";
import ShowClickedImage from "../modal/ShowClickedImage";

const WrapperPhotosUser = ({ photos }: { photos: any }) => {
  const [clickedImageUrl, setClickedImageUrl] = React.useState("");

  const handleClickImage = (id: string) => {
    setClickedImageUrl(id);
  };

  return (
    <>
      <PhotosUser photos={photos} handleClickImage={handleClickImage} />
      <ShowClickedImage
        id={clickedImageUrl}
        setClickedImageUrl={setClickedImageUrl}
      />
    </>
  );
};

export default WrapperPhotosUser;
