"use client";

import React, { useEffect, useState } from "react";
import { IoHardwareChip } from "react-icons/io5";
import { LuLampDesk } from "react-icons/lu";
import "./scrollbar.css";
import { groupByType } from "@/lib/utils/group-by-type";
import { EquipmentType } from "@/types/types";
import { CircleX } from "lucide-react";
import { deleteOneEquipment } from "@/actions/setup/delete";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import { getEquipmentsSetup } from "@/actions/setup/get";
import { useParams } from "next/navigation";
import { createPhotoEquipment } from "@/actions/photo-equipment/create";

const Equipment = ({
  equipments,
  action,
  setupId,
}: {
  equipments: EquipmentType[];
  action?: "add";
  setupId?: string;
}) => {
  if (!equipments) return null;

  const groupedItems = groupByType(equipments);

  const handleDeleteItem = (e: any) => {
    const elementSelected = e.target.parentElement.dataset.name;
    deleteOneEquipment(elementSelected, setupId as string);
  };

  const handleRedirectUser = (url: string) => {
    if (!url) return;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="overflow-hidden h-full rounded-large relative">
      <div className="h-full bg-[#151515] text-white px-4 rounded-large overflow-y-auto scrollbar">
        {Object.keys(groupedItems).map((type) => (
          <div key={type}>
            <h4 className="font-bold text-2xl pt-4 pb-2 capitalize">{type}</h4>
            {groupedItems[type].map(
              (
                item: { name: string; type: string; url: string },
                index: number
              ) => (
                <div className="flex gap-2 relative" key={index}>
                  <div
                    className="cursor-pointer w-full bg-[#464646] rounded-md flex items-center justify-start gap-2 py-2 px-4 mb-4 hover:bg-[#464646a8]"
                    onClick={() => handleRedirectUser(item.url)}
                  >
                    {item.type === "equipment" ? (
                      <IoHardwareChip
                        className="text-orange-400 basis-2/8"
                        size={20}
                      />
                    ) : (
                      <LuLampDesk
                        className="text-blue-400 basis-2/8"
                        size={20}
                      />
                    )}
                    <p className="w-full">{item.name}</p>
                  </div>
                  {action === "add" && (
                    <button
                      className="absolute right-2 top-2.5 rounded-l z-50 cursor-pointer"
                      onClick={handleDeleteItem}
                      data-name={item.name}
                    >
                      <CircleX size={20} className="text-red-500" />
                    </button>
                  )}
                </div>
              )
            )}
          </div>
        ))}
        {action !== 'add' && (
          <EquipmentPhotoLinker />
        )}
      </div>
    </div>
  );
};

const EquipmentPhotoLinker = () => {
  const { id } = useParams();
  const [equipments, setEquipments] = useState<EquipmentType[]>([]);

  useEffect(() => {
    async function fetchEquipments() {
      const equipments = await getEquipmentsSetup(Array.isArray(id) ? id[0] : id);
      setEquipments(equipments);
    }
    fetchEquipments();
  }, [id])

  async function handleClick(equipmentId: string) {
    await createPhotoEquipment('a', equipmentId);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Link equipment to this photo</Button>
      </DropdownTrigger>
      <DropdownMenu>
        {equipments.map((equipment: EquipmentType) => (
          <DropdownItem onClick={() => handleClick(equipment.id)} key={equipment.id}>{equipment.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
};

export default Equipment;
