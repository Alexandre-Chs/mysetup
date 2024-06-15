import SelectChoiceSetupAdd from "@/components/add-setup/SelectChoiceSetupAdd";
import UploadMainPhoto from "@/components/upload/upload-main-photo";
import { Input, Textarea } from "@nextui-org/react";
import React from "react";

const Share = () => {
  return (
    <div className="max-w-2xl mx-auto mt-16">
      <UploadMainPhoto />

      {/* main infos */}
      <div className="mt-6">
        <p className="font-bold text-2xl">
          Add your main title and description
        </p>
        <p className="text-sm">
          Please add a title and a short description for your setup. Make sure
          the description is concise and informative.
        </p>
        <Input placeholder="Title of the setup" className="mt-6" />
        <Textarea
          placeholder="Main description of the setup"
          className="mt-6"
        />
      </div>

      {/* Add what u want to add */}
      <div className="mt-6">
        <SelectChoiceSetupAdd />
      </div>
    </div>
  );
};

export default Share;
