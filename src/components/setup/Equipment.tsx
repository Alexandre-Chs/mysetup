import React from "react";
import { IoHardwareChip } from "react-icons/io5";
import { LuLampDesk } from "react-icons/lu";
import "./scrollbar.css";
import { groupByType } from "@/lib/utils/group-by-type";
import { TypeEquipment } from "@/types/types";
import ButtonAdd from "../ui/button-add";

const Equipment = ({
  equipments,
  action,
}: {
  equipments: TypeEquipment[];
  action?: "add";
}) => {
  const groupedItems = groupByType(equipments);
  return (
    <div className="overflow-hidden h-full rounded-large relative">
      <div className="h-full bg-[#151515] text-white px-4 rounded-large overflow-y-auto scrollbar">
        {Object.keys(groupedItems).map((type) => (
          <div key={type}>
            <h4 className="font-bold text-2xl pt-4 pb-2 capitalize">{type}</h4>
            {groupedItems[type].map(
              (item: { name: string; type: string }, index: number) => (
                <div
                  className="w-full bg-[#464646] rounded-md flex items-center justify-start gap-2 py-2 px-4 mb-4"
                  key={index}
                >
                  {item.type === "equipment" ? (
                    <IoHardwareChip className="text-orange-400" size={20} />
                  ) : (
                    <LuLampDesk className="text-blue-400" size={20} />
                  )}
                  <p>{item.name}</p>
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
