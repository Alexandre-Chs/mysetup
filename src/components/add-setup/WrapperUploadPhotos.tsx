import React from "react";
import UploadPhotos from "../upload/UploadPhoto";
const TOTAL_PHOTOS = Array(4).fill(0);

const WrapperUploadPhotos = () => {
  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="mb-6">
        <h1 className="font-bold text-2xl">Add photos</h1>
        <p className="text-sm">Minimum 1 photo - Max 4 photos</p>
      </div>
      <div className="max-w-md flex flex-col mx-auto items-center justify-center gap-4">
        <div className="flex gap-4 flex-row flex-wrap items-center justify-center">
          {TOTAL_PHOTOS.map((_, index) => {
            return <UploadPhotos key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default WrapperUploadPhotos;
