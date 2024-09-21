"use client";

import React from "react";
import { Setup as SetupType } from "@/db/schemas";
import { useSetupStore } from "@/store/SetupStore";
import PhotoEquipmentCreateModal from "@/components/setup/PhotoEquipmentCreateModal";
import WrapperNameSetup from "@/components/setup/WrapperNameSetup";
import WrapperSetup from "@/components/setup/WrapperSetup";
import { useParams } from "next/navigation";
import { User } from "lucia";

type SetupProps = {
  setup: SetupType;
  user: User | null;
};

const Setup = ({ setup, user }: SetupProps) => {
  const { username, id } = useParams();
  const setSetup = useSetupStore((state) => state.setSetup);

  React.useEffect(() => {
    if (setup) {
      setSetup(setup);
    }
  }, [setup, setSetup]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full max-w-[1500px] mx-auto px-4 py-8">
        <WrapperNameSetup
          isOwner={user?.username === username}
          setupName={setup.name as string}
          setupId={Array.isArray(id) ? id[0] : id}
        />
        <WrapperSetup
          currentUser={user}
          isOwner={user?.username === username}
        />
        <PhotoEquipmentCreateModal />
      </div>
    </div>
  );
};

export default Setup;
