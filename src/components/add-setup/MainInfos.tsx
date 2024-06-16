import { Textarea, Input } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";

const MainInfos = ({ handleAddDatas }: { handleAddDatas: Function }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const prevTitleRef = useRef(title);
  const prevDescriptionRef = useRef(description);

  useEffect(() => {
    const prevTitle = prevTitleRef.current;
    const prevDescription = prevDescriptionRef.current;

    if (title !== prevTitle || description !== prevDescription) {
      handleAddDatas({
        type: "titleDescription",
        position: 0, //all time first position
        datas: {
          title,
          description,
        },
      });
    }

    prevTitleRef.current = title;
    prevDescriptionRef.current = description;
  }, [title, description, handleAddDatas]);

  return (
    <div className="mt-6">
      <p className="font-bold text-2xl">Add your main title and description</p>
      <p className="text-sm">
        Please add a title and a short description for your setup. Make sure the
        description is concise and informative.
      </p>
      <Input
        placeholder="Title of the setup"
        className="mt-6"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Main description of the setup"
        className="mt-6"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default MainInfos;
