import AddNameNewSetup from "@/components/setup/name/SetupAddNewName";
import WrapperNewSetup from "@/components/setup/new-setup/WrapperNewSetup";
import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-[90vh] flex-col">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto pb-4">
        <AddNameNewSetup />
      </div>
      <WrapperNewSetup />
    </div>
  );
};

export default Page;
