import { useSetupStore } from "@/store/SetupStore";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { updateSetupPublished } from "@/app/api/setups/actions";

const SetupTogglePublish = () => {
  const setup = useSetupStore((state) => state.setup);

  if (!setup) return null;

  const togglePublish = async () => {
    await updateSetupPublished(setup.id, !setup.isPublished);
    toast.success(setup.isPublished ? "Setup not published anymore" : "Setup published");
  };

  return <Button onClick={togglePublish}>{setup.isPublished ? "Unpublish your setup" : "Publish your setup"}</Button>;
};

export default SetupTogglePublish;
