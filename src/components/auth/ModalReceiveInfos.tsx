import { validateRequest } from "@/lib/auth/validate-request";
import React from "react";
import UserInfosModal from "../modal/UserInfosModal";
import WelcomeModal from "../modal/WelcomeModal";
import { User } from "lucia";

const ModalReceiveInfos = async () => {
  const { user } = await validateRequest();
  if (!user) return;

  console.log(user);

  const showModal = !user?.username || !user?.email;

  if (showModal) {
    return <UserInfosModal user={user} />;
  } else if (user.username && user.email && user.isFirstVisit) {
    return <WelcomeModal user={user} />;
  }
};

export default ModalReceiveInfos;
