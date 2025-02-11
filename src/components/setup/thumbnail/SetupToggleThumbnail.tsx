"use client";
import { useSetupStore } from "@/store/SetupStore";
import { Tooltip } from "@heroui/react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { setThumbnail } from "@/app/api/setups/actions";

const SetupToggleThumbnail = ({ isOwner }: { isOwner: boolean }) => {
  const { id } = useParams<{ id: string }>();
  const currentPhotoId = useSetupStore((state) => state.currentPhotoId);
  const setup = useSetupStore((state) => state.setup);

  const handleClick = async () => {
    if (!currentPhotoId || setup.thumbnailId === currentPhotoId) return;
    await setThumbnail(id, currentPhotoId);
    toast("Photo set as setup thumbnail !");
  };

  return (
    <>
      {isOwner ? (
        <Tooltip content="Set as thumbnail" closeDelay={100}>
          <button className="embla__button_setup" onClick={handleClick}>
            <Star size={18} color={setup.thumbnailId === currentPhotoId ? "yellow" : "white"} fill={setup.thumbnailId === currentPhotoId ? "yellow" : ""} />
          </button>
        </Tooltip>
      ) : null}
    </>
  );
};

export default SetupToggleThumbnail;
