"use client";

import { Textarea } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";

const DescriptionSetup = ({
  handleAddDatas,
  position,
}: {
  handleAddDatas: Function;
  position: number;
}) => {
  const [description, setDescription] = React.useState("");

  const prevDescriptionRef = useRef(description);

  useEffect(() => {
    const prevDescription = prevDescriptionRef.current;

    if (description !== prevDescription) {
      handleAddDatas({
        type: "description",
        position,
        datas: {
          description,
        },
      });
    }

    prevDescriptionRef.current = description;
  }, [description, handleAddDatas, position]);

  return (
    <Textarea
      placeholder="Add an description"
      className="mt-6"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  );
};

export default DescriptionSetup;
