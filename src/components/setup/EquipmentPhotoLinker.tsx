import { EquipmentType } from "@/types/types";
import { useParams } from "next/navigation";
import { useSetupStore } from "@/store/SetupStore";
import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import clsx from "clsx";
import { getEquipmentsSetup } from "@/app/api/setups/actions";

const EquipmentPhotoLinker = () => {
  const { id } = useParams();
  const [equipments, setEquipments] = useState<EquipmentType[]>([]);

  const toggleTagging = useSetupStore((state) => state.toggleTagging);
  const tagging = useSetupStore((state) => state.tagging);

  useEffect(() => {
    async function fetchEquipments() {
      const equipments = await getEquipmentsSetup(Array.isArray(id) ? id[0] : id);
      setEquipments(equipments);
    }
    fetchEquipments();
  }, [id]);

  return (
    <button className={clsx("rounded-md p-2", tagging ? "bg-[#141516] animate-pulse" : "")} onClick={() => toggleTagging()}>
      <Tag />
    </button>
  );
};

export default EquipmentPhotoLinker;
