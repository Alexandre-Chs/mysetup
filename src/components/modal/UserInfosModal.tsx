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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Effects
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mutations
  const updateUsername = useMutation({
    mutationFn: async () => {
      return await updateUserInfosUsername(infos.id, username);
    },
    onSuccess: () => {
      if (email) {
        updateEmail.mutate();
      } else {
        setIsOpenModal(false);
      }
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
      setIsSubmitting(false);
    },
  });

  const updateEmail = useMutation({
    mutationFn: async () => {
      return await updateUserInfosEmail(infos.id, email);
    },
    onSuccess: () => {
      setIsOpenModal(false);
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
      setIsSubmitting(false);
    },
  });

  // Conditional rendering
  if (!isMounted) {
    return null;
  }

  // Handlers
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (username && email) {
        const parseDataWithZod = updateUserInfosUsernameAndEmailZod.safeParse({
          username,
          email,
        });

        if (!parseDataWithZod.success) {
          const errorMessages = parseDataWithZod.error.errors
            .map((error) => error.message)
            .join(", ");
          setErrorMessage(errorMessages);
          setIsSubmitting(false);
          return;
        }
        updateUsername.mutate();
      } else if (username) {
        const parseDataWithZod = updateUserInfosUsernameZod.safeParse({
          username,
        });

        if (!parseDataWithZod.success) {
          const errorMessages = parseDataWithZod.error.errors
            .map((error) => error.message)
            .join(", ");
          setErrorMessage(errorMessages);
          setIsSubmitting(false);
          return;
        }
        updateUsername.mutate();
      } else if (email) {
        const parseDataWithZod = updateUserInfosEmailZod.safeParse({
          email,
        });

        if (!parseDataWithZod.success) {
          const errorMessages = parseDataWithZod.error.errors
            .map((error) => error.message)
            .join(", ");
          setErrorMessage(errorMessages);
          setIsSubmitting(false);
          return;
        }
        updateEmail.mutate();
      }
    } catch (e) {
      setErrorMessage("An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  //TODO: si username et email, et que l'on met que username ou email, ca envoie quand meme.
  //faire un check sur les inputs pour savoir si on a un username ou un email ou besoin des deux. Et en fonction, alors on check.
  // si 2 inputs -> on check si username et email sont valides, et si c'est le cas, on met les 2 inputs dans le db.
  // si 1 input -> on check si username ou email est valide, et si c'est le cas, on met le 1 input dans le db.
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
