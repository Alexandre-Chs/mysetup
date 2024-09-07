"use client";
import { Setup as SetupType } from "@/db/schemas";
import { useSetupStore } from "@/store/SetupStore";
import PhotoEquipmentCreateModal from "@/components/setup/PhotoEquipmentCreateModal";
import ToolbarUpdateSetup from "@/components/setup/update-setup/ToolbarUpdateSetup";
import WrapperNameSetup from "@/components/setup/WrapperNameSetup";
import WrapperSetup from "@/components/setup/WrapperSetup";
import { useParams } from "next/navigation";
import { User } from "lucia";

type SetupProps = {
  setup: SetupType;
  user: User | null;
}

const Setup = ({ setup, user }: SetupProps) => {
  const { username, id } = useParams()

  const setSetup = useSetupStore(state => state.setSetup);
  setSetup(setup);

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      {user?.username === username && (
        <ToolbarUpdateSetup setupId={Array.isArray(id) ? id[0] : id} />
      )}
      <WrapperNameSetup setupName={setup.name as string} setupId={Array.isArray(id) ? id[0] : id} />
      <WrapperSetup currentUser={user} />
      <PhotoEquipmentCreateModal />
    </div>
  )
}

export default Setup;