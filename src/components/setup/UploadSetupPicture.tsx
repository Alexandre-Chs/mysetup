import { uploadSetupPicture } from "@/actions/media/upload";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

type UploadSetupPictureProps = {
    pictureCount: number;
}

const UploadSetupPicture = ({pictureCount}: UploadSetupPictureProps) => {
    const params = useParams<{id: string}>();

    const fileInput = useRef<HTMLInputElement>(null);
    
    function openFilePicker() {
        fileInput.current?.click();
    }

    async function handleFileChange() {
        if (!fileInput.current) return;
        const files = fileInput.current?.files;
        if (!files?.length) return;

        if (files.length + pictureCount > 24) {
            toast('You can only upload 24 pictures', {
                duration: 5000,
            });
            return;
        }
        
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            formData.append('setupId', params.id);
            await uploadSetupPicture(formData)
            toast('Picture uploaded', {
                duration: 3000,
            })
        }
        // clean up the input
        fileInput.current.value = '';
    }

    return (
        <>
            <input ref={fileInput} type="file" name="" id="" className="hidden" accept="image/*" multiple onChange={handleFileChange}/>
            <button onClick={() => openFilePicker()}>Add one</button>
        </>
    )
};

export default UploadSetupPicture;