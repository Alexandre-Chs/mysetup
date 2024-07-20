"use client";

import React from "react";
import PhotosUser from "./Photos";

const RefreshWrapperPhotoUser = ({ setup }: { setup: any }) => {
  const [trigger, setTrigger] = React.useState(0);
  React.useEffect(() => {
    setTrigger(Math.random());
  }, [setup]);
  //TODO : typage ici a faire : mb erreur de build ?
  return <PhotosUser key={trigger} photos={setup.setupPhotos} />;
};

export default RefreshWrapperPhotoUser;
