"use client";

import React from "react";
import { IoHardwareChip } from "react-icons/io5";
import { LuLampDesk } from "react-icons/lu";
import "./scrollbar.css";
import { groupByType } from "@/lib/utils/group-by-type";
import { TypeEquipment } from "@/types/types";
import { CircleX } from "lucide-react";
import { useCreateSetupStore } from "@/store/CreateSetupStore";
import { useRouter } from "next/navigation";

const Equipment = ({
  equipments,
  action,
}: {
  equipments: TypeEquipment[];
  action?: "add";
}) => {
  const router = useRouter();

  const groupedItems = groupByType(equipments);
  const { deleteEquipment } = useCreateSetupStore();

  const handleDeleteItem = (e: any) => {
    const elementSelected = e.target.parentElement.dataset.name;
    deleteEquipment(elementSelected);
  };

  const handleRedirectUser = (url: string) => {
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
                <div
                  className="cursor-pointer relative w-full bg-[#464646] rounded-md flex items-center justify-start gap-2 py-2 px-4 mb-4 hover:bg-[#464646a8]"
                  key={index}
                  onClick={() => handleRedirectUser(item.url)}
                >
                  {item.type === "equipment" ? (
                    <IoHardwareChip
                      className="text-orange-400 basis-2/8"
                      size={20}
                    />
                  ) : (
                    <LuLampDesk className="text-blue-400 basis-2/8" size={20} />
                  )}
                  <p className="w-full">{item.name}</p>
                  {action === "add" && (
                    <button
                      className="absolute right-2 rounded-lg"
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
      </div>
    </div>
  );
};

export default Equipment;
