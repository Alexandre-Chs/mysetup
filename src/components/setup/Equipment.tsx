"use client";

import React, { useEffect, useState } from "react";
import "./scrollbar.css";
import { groupByType } from "@/lib/utils/group-by-type";
import { EquipmentType } from "@/types/types";
import { CircleX } from "lucide-react";
import { deleteOneEquipment } from "@/actions/setup/delete";
import { getCountry, transformUrlToAffiliate } from "@/actions/api/get";
import { redirect } from "next/navigation";
import Link from "next/link";

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

  const handleRedirectUser = async (url: string) => {
    if (!url) return;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    const affiliateUrl = await transformUrlToAffiliate(url);
    return affiliateUrl ? affiliateUrl : url;
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
                    },
                    index: number
                  ) => (
                    <div className="flex gap-2 relative" key={index}>
                      <AsyncLink
                        className="cursor-pointer w-full bg-[#141516] rounded-md flex items-center justify-start gap-2 py-2 px-4 mb-4 hover:bg-[#202123]"
                        getHref={() => handleRedirectUser(item.url)}
                      >
                        <p className="w-full">{item.name}</p>
                      </AsyncLink>
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

const AsyncLink = ({ children, getHref, className }: any) => {
  const [href, setHref] = useState("#");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const url = await getHref();
      setIsLoading(false);
      if (url) {
        window.open(url, "newWindow");
      }
    } catch (error) {
      console.error("Error getting URL:", error);
      setIsLoading(false);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {isLoading ? "Redirecting..." : children}
    </Link>
  );
};
