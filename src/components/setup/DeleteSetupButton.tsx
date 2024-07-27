"use client";

import { Trash2 } from "lucide-react";
import React from "react";
import DeleteSetupModal from "../modal/DeleteSetupModal";

const DeleteSetupButton = ({ setupId }: { setupId: string }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleDeleteSetup = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowModal(true);
    // await deleteSetup(setupId);
  };
  return (
    <>
      <div className="absolute right-4 top-4 z-50" onClick={handleDeleteSetup}>
        <Trash2 className="text-red-500" />
      </div>
      <DeleteSetupModal
        show={showModal}
        setShowModal={setShowModal}
        setupId={setupId}
      />
    </>
  );
};

export default DeleteSetupButton;
