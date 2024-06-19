"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import {
  updateUserInfosEmail,
  updateUserInfosUsername,
} from "@/actions/auth/updateUserInfos";
import { Spinner } from "../ui/spinner";
import {
  updateUserInfosEmailZod,
  updateUserInfosUsernameAndEmailZod,
  updateUserInfosUsernameZod,
} from "@/zod/auth/update-user";
import { useRouter } from "next/navigation";

type InfosProps = {
  id: string;
  username: string;
  email?: string;
};

export default function UserInfosModal({ infos }: { infos: InfosProps }) {
  const [isOpenModal, setIsOpenModal] = React.useState(true);
  const [isMounted, setIsMounted] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  let usernameNeeded = !infos.username;
  let emailNeeded = !infos.email;

  const router = useRouter();

  // Effects
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mutations
  const updateUsername = useMutation({
    mutationFn: async () => {
      return await updateUserInfosUsername(username);
    },
    onSuccess: () => {
      if (email) {
        updateEmail.mutate();
      } else {
        setIsOpenModal(false);
        router.refresh();
      }
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
    },
  });

  const updateEmail = useMutation({
    mutationFn: async () => {
      return await updateUserInfosEmail(email);
    },
    onSuccess: () => {
      router.refresh();
      setIsOpenModal(false);
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
    },
  });

  // Conditional rendering
  if (!isMounted) {
    return null;
  }

  // Handlers
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      if (usernameNeeded && emailNeeded) {
        const parseDataWithZod = updateUserInfosUsernameAndEmailZod.safeParse({
          username,
          email,
        });

        if (!parseDataWithZod.success) {
          const errorMessages = parseDataWithZod.error.errors
            .map((error) => error.message)
            .join(", ");
          setErrorMessage(errorMessages);
          return;
        }
        updateUsername.mutate();
      } else if (usernameNeeded) {
        const parseDataWithZod = updateUserInfosUsernameZod.safeParse({
          username,
        });

        if (!parseDataWithZod.success) {
          const errorMessages = parseDataWithZod.error.errors
            .map((error) => error.message)
            .join(", ");
          setErrorMessage(errorMessages);
          return;
        }
        updateUsername.mutate();
      } else if (emailNeeded) {
        const parseDataWithZod = updateUserInfosEmailZod.safeParse({
          email,
        });

        if (!parseDataWithZod.success) {
          const errorMessages = parseDataWithZod.error.errors
            .map((error) => error.message)
            .join(", ");
          setErrorMessage(errorMessages);
          return;
        }
        updateEmail.mutate();
      }
    } catch (e) {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <Dialog open={isOpenModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            We need more information to create your account. Please fill in the
            fields below.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid items-center grid-cols-4 gap-4">
            {!infos.username && (
              <>
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  placeholder="Enter your username"
                  className="col-span-3"
                />
              </>
            )}

            {!infos.email && (
              <>
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Enter your email"
                  className="col-span-3"
                />
              </>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 font-bold">{errorMessage}</p>
          )}
          <DialogFooter>
            <Button type="submit">
              {updateEmail.isPending || updateUsername.isPending ? (
                <Spinner show={true} size="medium" className="text-white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
