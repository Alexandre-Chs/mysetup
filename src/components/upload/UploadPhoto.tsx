"use client";

import React from "react";
import { S3 } from "@aws-sdk/client-s3";

const UploadPhotos = () => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <div className="cursor-pointer border-2 border-black border-dashed rounded-lg flex items-center justify-center w-[200px] h-[150px]">
      <label className="cursor-pointer text-center px-16 py-10">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
        <span className="font-bold text-sm">Upload a photo</span>
      </label>
    </div>
  );
};

export default UploadPhotos;
