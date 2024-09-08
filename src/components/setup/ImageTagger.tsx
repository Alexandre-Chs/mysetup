import { usePhotoEquipmentStore } from "@/store/PhotoEquipmentStore";
import { useSetupStore } from "@/store/SetupStore";
import { useRef, useState } from "react";
import { Tooltip } from "@nextui-org/react";

type ImageTaggerProps = {
  src: string;
  photoId: string;
}

const ImageTagger = ({ src, photoId }: ImageTaggerProps) => {
  const tagging = useSetupStore((state) => state.tagging);

  const [newTagCoords, setNewTagCoords] = useState<{ x: number, y: number } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const setNewTagCoordinates = usePhotoEquipmentStore((state) => state.setNewTagCoordinates);
  const setSelectedPhotoId = usePhotoEquipmentStore((state) => state.setSelectedPhotoId);

  const setup = useSetupStore(state => state.setup);
  const setupPhoto = setup?.setupPhotos.find((photo: any) => photo.id === photoId);
  const tags = setupPhoto?.photoEquipments

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
          className="absolute w-3 h-3 bg-white border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ top: `${newTagCoords.y}%`, left: `${newTagCoords.x}%` }}
        >
        </div>
      )}
      {tags.map((tag: any) => (
        <Tooltip key={tag.id} content={tag.equipment.name}>
          <a
            href={tag.equipment.url}
            target="_blank"
            className="absolute size-3 bg-white border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:size-4"
            style={{
              top: `${tag.y}%`,
              left: `${tag.x}%`,
            }}
          >
          </a>
        </Tooltip>
      ))}
    </div>
  )
};

export default ImageTagger;