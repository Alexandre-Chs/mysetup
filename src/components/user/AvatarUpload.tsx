import { deleteUserPicture, uploadUserPicture } from "@/app/api/media/actions";
import { Trash2 } from "lucide-react";
import { useRef } from "react";

const AvatarUpload = ({ media, editable }: { media: any; editable?: boolean }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Uploading user picture");
    const files = evt.target.files;
    if (!files?.length) return;
    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    await uploadUserPicture(formData);
  };

  const handleClick = () => {
    if (!editable) return;
    inputRef.current?.click();
  };

  const handleDelete = async () => {
    await deleteUserPicture();
  };

  const imgSrc = media ? media.url : "/default-user.jpg";

  return (
    <div className="relative group">
      <input ref={inputRef} type="file" name="" id="" className="hidden" accept="image/*" onChange={handleFileChange} />
      <img onClick={handleClick} src={imgSrc} className={`rounded-full shrink-0 object-cover object-center size-16 ${editable ? "cursor-pointer" : ""}`} />
      {editable && (
        <div onClick={handleDelete} className="hidden group-hover:block absolute -top-2 -right-2 rounded-full bg-red-500 p-1 cursor-pointer">
          <Trash2 size={16} />
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
