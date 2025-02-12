import { useParams } from "next/navigation";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { reportSetup } from "@/app/api/setups/actions";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const REASONS = ["Some/All pictures are not related to a setup", "Inappropriate content (NSFW, Violence, etc.)", "Stolen content", "Duplicate setup", "Other"];

const SetupReport = () => {
  const { id } = useParams();

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  async function handleReport() {
    await reportSetup(id as string, selectedReason as string, description);
    toast.success("Report sent");
    setSelectedReason(null);
    setDescription("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-2 bg-[#0D0D0F] border-[#18181B] hover:bg-[#26262b]">
          <TriangleAlert size={22} color="#a30000" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-[#18181B] bg-[#0D0D0F]">
        <DialogHeader>
          <DialogTitle>What&apos;s wrong ?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          {REASONS.map((reason) => (
            <Button className="flex-1 py-4 bg-[#26262b] hover:bg-[#1b1b1e]" variant={selectedReason === reason ? "default" : "secondary"} key={reason} onClick={() => setSelectedReason(reason)}>
              {reason}
            </Button>
          ))}
        </div>
        {!!selectedReason && <Textarea placeholder="Tell us more about the issue" value={description} onChange={(e) => setDescription(e.target.value)} />}
        {!!selectedReason && !!description && (
          <DialogClose asChild>
            <Button className="w-full" variant="destructive" onClick={handleReport}>
              Send report
            </Button>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SetupReport;
