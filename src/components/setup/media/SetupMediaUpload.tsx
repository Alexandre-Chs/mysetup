import { useParams } from "next/navigation";
import { useRef } from "react";
import { LuImagePlus } from "react-icons/lu";
import { toast } from "sonner";
import { Tooltip } from "@heroui/react";
import { uploadSetupPicture } from "@/app/api/media/actions";

const SetupMediaUpload = ({ isOwner }: { isOwner?: boolean }) => {
  const params = useParams<{ id: string }>();

  const fileInput = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    fileInput.current?.click();
  }

  async function handleFileChange() {
    if (!fileInput.current) return;
    const files = fileInput.current?.files;
    if (!files?.length) return;

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("setupId", params.id);
      await uploadSetupPicture(formData);
      toast("Picture uploaded", {
        duration: 3000,
      });
    }
    // clean up the input
    fileInput.current.value = "";
  }

  return (
    <>
      {isOwner ? (
        <>
          <input ref={fileInput} type="file" name="" id="" className="hidden" accept="image/*" multiple onChange={handleFileChange} />
          <Tooltip content="Upload an image" closeDelay={100}>
            <button className="embla__button_setup" onClick={() => openFilePicker()}>
              <LuImagePlus size={18} />
            </button>
          </Tooltip>
        </>
      ) : null}
    </>
  );
};

export default SetupMediaUpload;
