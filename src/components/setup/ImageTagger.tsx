"use client";

import { usePhotoEquipmentStore } from "@/store/PhotoEquipmentStore";
import { useSetupStore } from "@/store/SetupStore";
import { useRef, useState } from "react";
import { Tooltip } from "@heroui/react";
import { CircleX } from "lucide-react";
import { transformUrlToAffiliate } from "@/app/api/linker/actions";
import { getMainLangUser } from "@/lib/utils/get-lang";
import { deleteTagOnPhoto } from "@/app/api/setups/media/actions";

type ImageTaggerProps = {
  src: string;
  photoId: string;
  isOwner?: boolean;
};

const ImageTagger = ({ src, photoId, isOwner }: ImageTaggerProps) => {
  const tagging = useSetupStore((state) => state.tagging);

  const [newTagCoords, setNewTagCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const setNewTagCoordinates = usePhotoEquipmentStore((state) => state.setNewTagCoordinates);
  const setSelectedPhotoId = usePhotoEquipmentStore((state) => state.setSelectedPhotoId);

  const setup = useSetupStore((state) => state.setup);
  const setupPhoto = setup?.setupPhotos.find((photo: any) => photo.id === photoId);
  const tags = setupPhoto?.photoEquipments;

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setNewTagCoords({ x, y });
    }
  };

  const handleAddTag = () => {
    if (newTagCoords) {
      setNewTagCoordinates(newTagCoords);
      setSelectedPhotoId(photoId);
    }
  };

  const handleDeleteTag = (id: string, photoId: any) => {
    deleteTagOnPhoto(id, photoId);
  };

  const handleRedirectUser = async (url: string, e: any) => {
    e.preventDefault();
    if (!url) return;
    const lang = getMainLangUser();
    const affiliateUrl = await transformUrlToAffiliate(url, lang);
    window.open(affiliateUrl ? affiliateUrl : url, "newWindow");
  };

  return (
    <div className="relative m-auto max-w-full max-h-full">
      <img
        ref={imageRef}
        src={src}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setNewTagCoords(null)}
        onClick={tagging ? handleAddTag : undefined}
        className="rounded-xl max-w-full max-h-[600px]"
        alt=""
      />
      {tagging && newTagCoords && (
        <div
          className="absolute w-3 h-3 bg-white border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ top: `${newTagCoords.y}%`, left: `${newTagCoords.x}%` }}></div>
      )}
      {tags.map((tag: any) => (
        <Tooltip
          key={tag.id}
          content={
            <div className="flex flex-row items-center gap-1">
              {tag.equipment.name}
              {isOwner && <CircleX onClick={() => handleDeleteTag(tag.id, photoId)} size={20} className="text-red-500 cursor-pointer transition-all hover:scale-110 hover:rotate-90" />}
            </div>
          }>
          <div
            onClick={(e: any) => handleRedirectUser(tag.equipment.url, e)}
            className="absolute size-3 bg-white/85 border-2 border-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:size-5 animate-pulse"
            style={{
              top: `${tag.y}%`,
              left: `${tag.x}%`,
            }}></div>
        </Tooltip>
      ))}
    </div>
  );
};

export default ImageTagger;
