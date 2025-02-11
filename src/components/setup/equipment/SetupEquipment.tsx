"use client";

import React, { useState } from "react";
import "./scrollbar.css";
import { groupSetupItemsByCategory } from "@/lib/utils/group-by-type";
import { EquipmentType } from "@/types/types";
import { CircleX, LinkIcon } from "lucide-react";
import { transformUrlToAffiliate } from "@/app/api/linker/actions";
import { CATEGORY_ORDER } from "@/lib/utils/equipments";
import { getMainLangUser } from "@/lib/utils/get-lang";
import { deleteOneEquipment } from "@/app/api/setups/actions";
import Border from "@/components/ui/border";
import { Spinner } from "@/components/ui/spinner";

const SetupEquipment = ({ equipments, action, setupId }: { equipments: EquipmentType[]; action?: "add"; setupId?: string }) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  if (!equipments) return null;

  const groupedItems = groupSetupItemsByCategory(equipments);

  const handleDeleteItem = (e: any) => {
    const elementSelected = e.target.parentElement.dataset.name;
    deleteOneEquipment(elementSelected, setupId as string);
  };

  const handleRedirectUser = async (url: string) => {
    if (!url) return;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    const lang = getMainLangUser();
    const affiliateUrl = await transformUrlToAffiliate(url, lang);
    console.log("affiliateUrl", affiliateUrl);
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
            CATEGORY_ORDER.filter((category) => groupedItems[category] && groupedItems[category].length > 0).map((category) => (
              <div key={category}>
                <h4 className="font-bold text-2xl pt-4 pb-2 capitalize text-white">{category}</h4>
                {groupedItems[category].map((item: { name: string; type: string; url: string }, index: number) => (
                  <div className="flex gap-2 relative" key={index}>
                    <div className="cursor-pointer w-full bg-[#141516] rounded-md flex items-center justify-between gap-2 py-2 px-4 mb-4 hover:bg-[#202123]">
                      <div>
                        <p className="text-xs">{item.type}</p>
                        <p className="w-full pl-2">{item.name}</p>
                      </div>
                      {item.url?.length > 0 && (
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
                ))}
              </div>
            ))
          )}
        </div>
      </Border>
    </div>
  );
};

export default SetupEquipment;
