import React from "react";

const OptionalPhotoSetup = () => {
  return (
    <div className="cursor-pointer border-2 border-gray-200 border-dashed rounded-lg h-40 w-full flex items-center justify-center pt-6">
      <label className="py-16 px-64 cursor-pointer text-center">
        <input type="file" className="hidden" accept="image/*" />
        <span className="font-bold">
          Click here to upload an optional photo
        </span>
      </label>
    </div>
  );
};

export default OptionalPhotoSetup;
