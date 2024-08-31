"use client";

import { CirclePlus, X } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserProfile, validUserInfosProfile } from "@/zod/profile/userinfos";
import { toast } from "sonner";

type SocialLink = {
  id: number;
  socialName: string;
  link: string;
};

const socialLinksItems = [
  { name: "twitter", label: "Twitter" },
  { name: "discord", label: "Discord" },
  { name: "instagram", label: "Instagram" },
  { name: "youtube", label: "Youtube" },
  { name: "tiktok", label: "Tiktok" },
  { name: "github", label: "Github" },
  { name: "linkedin", label: "Linkedin" },
  { name: "reddit", label: "Reddit" },
  { name: "twitch", label: "Twitch" },
  { name: "steam", label: "Steam" },
  { name: "patreon", label: "Patreon" },
  { name: "paypal", label: "Paypal" },
  { name: "producthunt", label: "Producthunt" },
];

const UpdateUserProfileCard = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [nextId, setNextId] = useState(0);
  const [profileDescription, setProfileDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const handleDeleteSocialLink = (id: number) => {
    setSocialLinks((curr) => curr.filter((item) => item.id !== id));
  };

  const handleAddSocialLink = () => {
    setSocialLinks((curr) => [
      ...curr,
      { id: nextId, socialName: "", link: "" },
    ]);
    setNextId((prevId) => prevId + 1);
  };

  const handleUpdateSocialLink = (
    id: number,
    field: keyof SocialLink,
    value: string
  ) => {
    setSocialLinks((curr) =>
      curr.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const handleSave = () => {
    const dataToSave: UserProfile = {
      profileDescription,
      socialLinks: socialLinks,
    };

    const parseResult = validUserInfosProfile.safeParse(dataToSave);

    if (parseResult.success) {
      //TODO : envoyer en BDD ICI
      setOpen(false);
      toast.success("Profile updated successfully");
      setValidationErrors([]);
    } else {
      setValidationErrors(parseResult.error.errors);
    }
  };

  //TODO : afficher le updater QUE si user sur sa page personnelle

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          className="absolute -top-10 right-0 text-white hover:rotate-90 transition-transform cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <CirclePlus />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] border-[#393b3e]/25 bg-backgroundSecondary rounded-xl">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              You can update your profile here
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col justify-center items-start gap-2">
              <Label htmlFor="profileDescription">Profile Description</Label>
              <Textarea
                id="profileDescription"
                placeholder="Speak about yourself"
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col justify-center gap-2">
              {socialLinks.map((link) => (
                <div className="flex gap-2" key={link.id}>
                  <Select
                    onValueChange={(value) =>
                      handleUpdateSocialLink(link.id, "socialName", value)
                    }
                  >
                    <SelectTrigger className="w-[180px] bg-[#27272A] border-[#393b3e]/25 rounded-xl hover:border-[#4F5051] focus:border-[#6f7073] focus:outline-none transition-colors">
                      <SelectValue placeholder="Social link" />
                    </SelectTrigger>
                    <SelectContent className="bg-backgroundSecondary border-[#6f7073]/50 rounded-xl">
                      <SelectGroup>
                        {socialLinksItems.map((item) => (
                          <SelectItem
                            key={item.name}
                            value={item.name}
                            className="cursor-pointer hover:bg-[#6f7073]/50"
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    className="w-full"
                    value={link.link}
                    onChange={(e) =>
                      handleUpdateSocialLink(link.id, "link", e.target.value)
                    }
                    placeholder="Link"
                  />
                  <div
                    className="p-2 hover:bg-[#6f7073]/25 rounded-full cursor-pointer transition-colors"
                    onClick={() => handleDeleteSocialLink(link.id)}
                  >
                    <X />
                  </div>
                </div>
              ))}
              <Button
                onClick={handleAddSocialLink}
                className="w-full text-black bg-[#D0D1D1] relative px-4 py-2 rounded-[8px] flex items-center justify-center group"
              >
                Add social link
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSave}
              className="text-black bg-[#D0D1D1] relative px-4 py-2 rounded-[8px] flex items-center justify-center group"
            >
              Save
            </Button>
          </DialogFooter>
          {validationErrors.length > 0 && (
            <p className="text-red-500 text-xs">
              {validationErrors[0].message}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateUserProfileCard;
