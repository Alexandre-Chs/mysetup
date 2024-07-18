import AddNameNewSetup from "@/components/add-setup/AddNameNewSetup";
import SaveButton from "@/components/setup/new-setup/SaveButton";
import WrapperNewSetup from "@/components/setup/new-setup/WrapperNewSetup";
import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-[90vh] flex-col">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto pb-4">
        <AddNameNewSetup />
        <SaveButton />
      </div>
      <WrapperNewSetup />
    </div>
  );
};

export default Page;
