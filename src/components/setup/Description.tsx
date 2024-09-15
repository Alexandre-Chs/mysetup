import React from "react";

const Description = ({ description }: { description: string | null }) => {
  return (
    <div className="h-full bg-[#151515] text-white p-4 flex flex-col items-start justify-start rounded-large text-bold text-lg">
      {description ? (
        <>
          <p>{description}</p>
        </>
      ) : (
        <p>No description</p>
      )}
    </div>
  );
};

export default Description;
