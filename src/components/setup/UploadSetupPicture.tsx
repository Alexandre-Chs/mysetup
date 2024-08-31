import { uploadSetupPicture } from "@/actions/media/upload";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { LuImagePlus } from "react-icons/lu";
import { toast } from "sonner";
import { Tooltip } from "@nextui-org/react";


const UploadSetupPicture = () => {
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
      <input
        ref={fileInput}
        type="file"
        name=""
        id=""
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <Tooltip content="Upload an image" closeDelay={100}>
        <button className="embla__button" onClick={() => openFilePicker()}>
          <LuImagePlus size={24} />
        </button>
      </Tooltip>
    </>
  );
};

export default UploadSetupPicture;
