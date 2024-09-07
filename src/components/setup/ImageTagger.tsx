import { createPhotoEquipment } from "@/actions/photo-equipment/create";
import { usePhotoEquipmentStore } from "@/store/PhotoEquipmentStore";
import { useSetupStore } from "@/store/SetupStore";
import { useRef, useState } from "react";

type ImageTaggerProps = {
  src: string;
}

type TagCoords = {
  x: number;
  y: number;
}

const ImageTagger = ({ src }: ImageTaggerProps) => {
  const tagging = useSetupStore((state) => state.tagging);
  const [tags, setTags] = useState<TagCoords[]>([]);
  const [newTagCoords, setNewTagCoords] = useState<{ x: number, y: number } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const setNewTagCoordinates = usePhotoEquipmentStore((state) => state.setNewTagCoordinates);

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
    }
  };

  return (
    <div className="relative m-auto max-w-full max-h-full">
      <img
        ref={imageRef}
        src={src}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setNewTagCoords(null)}
        onClick={tagging ? handleAddTag : undefined}
        className="rounded-xl max-w-full max-h-full"
        alt=""
      />
      {tagging && newTagCoords && (
        <div
          className="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ top: `${newTagCoords.y}%`, left: `${newTagCoords.x}%` }}
        >
        </div>
      )}
      {tags.map((tag, index) => (
        <div
          key={index}
          className="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${tag.y}%`,
            left: `${tag.x}%`,
          }}
        />
      ))}
    </div>
  )
};

export default ImageTagger;