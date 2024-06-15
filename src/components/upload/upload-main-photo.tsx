"use client";

import React from "react";

const UploadMainPhoto = () => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <div className="cursor-pointer border-2 border-black border-dashed rounded-lg h-40 w-full flex items-center justify-center">
      <label className="py-16 px-64 cursor-pointer text-center">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
        <span className="font-bold">Click here to upload your main photo</span>
      </label>
    </div>
  );
};

export default UploadMainPhoto;
