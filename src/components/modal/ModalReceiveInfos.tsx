import { validateRequest } from '@/lib/auth/validate-request';
import React from 'react';
import UserInfosModal from './ModalUserInfos';
import WelcomeModal from './ModalWelcome';

export const ModalReceiveInfos = async () => {
  const { user } = await validateRequest();
  if (!user) return;

  const showModal = !user?.username || !user?.email;

  if (showModal) {
    return <UserInfosModal user={user} />;
  } else if (user.username && user.email && user.isFirstVisit) {
    return <WelcomeModal user={user} />;
  }
};
