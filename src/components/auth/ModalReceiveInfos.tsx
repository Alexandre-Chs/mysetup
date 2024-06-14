import { validateRequest } from "@/lib/auth/validate-request";
import React from "react";
import UserInfosModal from "../modal/UserInfosModal";

const ModalReceiveInfos = async () => {
  const { user } = await validateRequest();
  if (!user) return;

  const showModal = !user?.username || !user?.email;

  if (showModal) {
    return (
      <UserInfosModal
        infos={{
          id: user.id,
          username: user.username,
          email: user.email,
        }}
      />
    );
  }
};

export default ModalReceiveInfos;
