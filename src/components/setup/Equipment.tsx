"use client";

import React, { useState } from "react";
import "./scrollbar.css";
import { groupByType } from "@/lib/utils/group-by-type";
import { EquipmentType } from "@/types/types";
import { CircleX, LinkIcon } from "lucide-react";
import { deleteOneEquipment } from "@/actions/setup/delete";
import { transformUrlToAffiliate } from "@/actions/api/get";
import Border from "../ui/border";
import { Spinner } from "../ui/spinner";

const Equipment = ({ equipments, action, setupId }: { equipments: EquipmentType[]; action?: "add"; setupId?: string }) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  if (!equipments) return null;

  const groupedItems = groupByType(equipments);

  const handleDeleteItem = (e: any) => {
    const elementSelected = e.target.parentElement.dataset.name;
    deleteOneEquipment(elementSelected, setupId as string);
  };

  const handleRedirectUser = async (url: string) => {
    if (!url) return;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    const affiliateUrl = await transformUrlToAffiliate(url);
    return affiliateUrl ? affiliateUrl : url;
  };

  const handleClick = async (e: any, url: string) => {
    e.preventDefault();
    if (loadingStates[url]) return;

    setLoadingStates((prev) => ({ ...prev, [url]: true }));

    const transformUrl = await handleRedirectUser(url);
    try {
      if (transformUrl) {
        window.open(transformUrl, "newWindow");
      } else {
        window.open(url, "newWindow");
      }
    } catch (error) {
      console.error("Error getting URL:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [url]: false }));
    }
  };

  return (
    <div className="h-full relative shrink-0">
      <Border>
        <div className="h-full pl-[13px] overflow-y-auto scrollbar">
          {Object.keys(groupedItems).length === 0 ? (
            <p className="text-center pt-4 text-sm">No equipments shared</p>
          ) : (
            Object.keys(groupedItems).map((type) => (
              <div key={type}>
                <h4 className="font-bold text-2xl pt-4 pb-2 capitalize">{type}</h4>
                {!groupedItems ? (
                  <p>No items available</p>
                ) : (
                  groupedItems[type].map(
                    (
                      item: {
                        name: string;
                        type: string;
                        url: string;
                      },
                      index: number,
                    ) => (
                      <div className="flex gap-2 relative" key={index}>
                        <div className="cursor-pointer w-full bg-[#141516] rounded-md flex items-center justify-start gap-2 py-2 px-4 mb-4 hover:bg-[#202123]">
                          <p className="w-full">{item.name}</p>
                          {item.url.length > 0 && (
                            <button onClick={(evt) => handleClick(evt, item.url)}>
                              {loadingStates[item.url] ? (
                                <div>
                                  <Spinner size="small" />
                                </div>
                              ) : (
                                <div className="hover:bg-gray-700 p-1 rounded transition-colors">
                                  <LinkIcon size={15} />
                                </div>
                              )}
                            </button>
                          )}
                        </div>
                        {action === "add" && (
                          <button className="absolute right-2 top-2.5 rounded-l z-50 cursor-pointer" onClick={handleDeleteItem} data-name={item.name}>
                            <CircleX size={20} className="text-red-500" />
                          </button>
                        )}
                      </div>
                    ),
                  )
                )}
              </div>
            ))
          )}
        </div>
      </Border>
    </div>
  );
};

export default Equipment;
