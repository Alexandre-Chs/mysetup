import React from "react";
import { IoHardwareChip } from "react-icons/io5";
import { LuLampDesk } from "react-icons/lu";
import "./scrollbar.css"; // Importez le fichier CSS personnalisé

const FAKES = [
  { name: "i7 8700k", type: "equipment" },
  { name: "NVIDIA GeForce RTX 3060", type: "equipment" },
  { name: "NVIDIA GeForce RTX 9889", type: "equipment" },
  { name: "Samsung 970 EVO", type: "accesories" },
  { name: "Dell XPS 15", type: "equipment" },
  { name: "NVIDIA GeForce RTX 9889", type: "equipment" },
  { name: "Samsung 970 EVO", type: "accesories" },
  { name: "Dell XPS 15", type: "equipment" },
  { name: "NVIDIA GeForce RTX 9889", type: "equipment" },
  { name: "Samsung 970 EVO", type: "accesories" },
  { name: "Dell XPS 15", type: "equipment" },
  { name: "Desk amazon", type: "desk" },
];

const Equipment = () => {
  const groupedItems = groupByType(FAKES);

  return (
    <div className="overflow-hidden h-full rounded-large">
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

function groupByType(elements: any[]) {
  return elements.reduce((acc, element) => {
    const { type } = element;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(element);
    return acc;
  }, {});
}

export default Equipment;
