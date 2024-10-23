import { useSetupStore } from "@/store/SetupStore";
import { Button } from "../ui/button";
import { updateSetupPublished } from "@/actions/setup/update";
import { toast } from "sonner";

const TogglePublish = () => {
  const setup = useSetupStore((state) => state.setup);

  if (!setup) return null;

  const togglePublish = async () => {
    await updateSetupPublished(setup.id, !setup.isPublished);
    toast.success(setup.isPublished ? "Setup not published anymore" : "Setup published");
  }

  return (
    <Button onClick={togglePublish}>{setup.isPublished ? 'Unpublish your setup' : 'Publish your setup'}</Button>
  )
}

export default TogglePublish;