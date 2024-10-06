"use client";

import React, { useEffect, useState } from "react";
import "./scrollbar.css";
import { groupByType } from "@/lib/utils/group-by-type";
import { EquipmentType } from "@/types/types";
import { CircleX } from "lucide-react";
import { deleteOneEquipment } from "@/actions/setup/delete";

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
  console.log(groupedItems);

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
    <div className="overflow-hidden h-full rounded-large relative shrink-0">
      <div className="h-full bento-smooth-gradient border-[1px] border-[#1F2022] text-white px-4 rounded-large overflow-y-auto scrollbar">
        {Object.keys(groupedItems).length === 0 ? (
          <p className="text-center pt-4 text-sm">No equipments shared</p>
        ) : (
          Object.keys(groupedItems).map((type) => (
            <div key={type}>
              <h4 className="font-bold text-2xl pt-4 pb-2 capitalize">
                {type}
              </h4>
              {!groupedItems ? (
                <p>No items available</p>
              ) : (
                groupedItems[type].map(
                  (
                    item: {
                      name: string;
                      type: string;
                      url: string;
                      affiliateUrl: string;
                    },
                    index: number
                  ) => (
                    <div className="flex gap-2 relative" key={index}>
                      <div
                        className="cursor-pointer w-full bg-[#141516] rounded-md flex items-center justify-start gap-2 py-2 px-4 mb-4 hover:bg-[#202123]"
                        onClick={() =>
                          handleRedirectUser(
                            item.affiliateUrl ? item.affiliateUrl : item.url
                          )
                        }
                      >
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
                )
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Equipment;
