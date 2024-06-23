import React from "react";
import { FaStar } from "react-icons/fa";

const Review = () => {
  return (
    <div className="h-full bg-[#151515] text-white flex items-center justify-center gap-4 px-4 rounded-large">
      <FaStar className="text-[#ffdd00] basis-1/3" size={50} />
      <div className="basis-2/3">
        <p className="text-2xl font-bold">4.7</p>
        <p className="text-md">48 review</p>
      </div>
    </div>
  );
};

export default Review;
