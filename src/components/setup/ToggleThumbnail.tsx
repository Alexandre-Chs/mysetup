"use client";
import { setThumbnail } from "@/actions/setup/update";
import { useSetupStore } from "@/store/SetupStore";
import { Tooltip } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import { toast } from "sonner";

const ToggleThumbnail = () => {
  const { id } = useParams<{ id: string }>();
  const currentPhotoId = useSetupStore((state) => state.currentPhotoId);
  const setup = useSetupStore((state) => state.setup);

  const handleClick = async () => {
    if (!currentPhotoId || (setup.thumbnailId === currentPhotoId)) return;
    await setThumbnail(id, currentPhotoId);
    toast("Photo set as setup thumbnail !");
  }

  return (
    <Tooltip content="Set as thumbnail" closeDelay={100}>
      <button
        className="embla__button_setup"
        onClick={handleClick}
      >
        <Star size={18} color={setup.thumbnailId === currentPhotoId ? "yellow" : "white"} fill={setup.thumbnailId === currentPhotoId ? "yellow" : ""} />
      </button>
    </Tooltip>
  )
}

export default ToggleThumbnail;