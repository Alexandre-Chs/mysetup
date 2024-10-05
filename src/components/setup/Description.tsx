import React from "react";

const Description = ({ description }: { description: string | null }) => {
  return (
    <div className="h-full bento-smooth-gradient border-[1px] border-[#1F2022] text-white p-4 flex flex-col items-start justify-start rounded-large text-bold text-lg">
      {description ? (
        <>
          <p>{description}</p>
        </>
      ) : (
        <p className="text-sm">No description</p>
      )}
    </div>
  );
};

export default Description;
