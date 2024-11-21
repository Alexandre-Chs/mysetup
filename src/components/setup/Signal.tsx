import { useParams } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { signalSetup } from "@/actions/setup/signal";
import { toast } from "sonner";

const REASONS = ["Some/All pictures are not related to a setup", "Inappropriate content (NSFW, Violence, etc.)", "Stolen content", "Duplicate setup", "Other"];

const Signal = () => {
  const { id } = useParams();

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  async function handleSignal() {
    await signalSetup(id as string, selectedReason as string, description);
    toast.success("Signal sent");
    setSelectedReason(null);
    setDescription("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="p-3">
          <TriangleAlert size={24} color="#718093" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What&apos;s wrong ?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          {REASONS.map((reason) => (
            <Button
              className="flex-1 py-4"
              variant={selectedReason === reason ? "default" : "secondary"}
              key={reason}
              onClick={() => setSelectedReason(reason)}
            >{reason}</Button>
          ))}
        </div>
        {!!selectedReason && (
          <Textarea
            placeholder="Tell us more about the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
        {!!selectedReason && !!description && (
          <DialogClose asChild>
            <Button className="w-full" variant="destructive" onClick={handleSignal}>Send report</Button>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  )
};

export default Signal;