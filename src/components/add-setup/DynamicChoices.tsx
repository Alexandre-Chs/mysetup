import React from "react";
import TitleDescription from "./TitleDescription";
import OptionalPhotoSetup from "./OptionalPhotoSetup";
import DescriptionSetup from "./DescriptionSetup";

const DynamicChoices = ({
  choice,
  handleAddDatas,
  position,
}: {
  choice: string;
  handleAddDatas: Function;
  position: number;
}) => {
  switch (choice) {
    case "titleDescription":
      return (
        <div className="pt-6">
          <div className="h-[1px] w-full bg-gray-200"></div>
          <TitleDescription />
        </div>
      );
    case "optionalPhoto":
      return (
        <div className="pt-6">
          <OptionalPhotoSetup />
        </div>
      );

    case "description":
      return (
        <div className="pt-6">
          <div className="h-[1px] w-full bg-gray-200"></div>
          <DescriptionSetup
            handleAddDatas={handleAddDatas}
            position={position}
          />
        </div>
      );
    default:
      return <div>lol</div>;
  }
};

export default DynamicChoices;
