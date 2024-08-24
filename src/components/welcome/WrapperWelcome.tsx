"use client";

import React, { useState, useEffect } from "react";
import { getFirstVisit, setFirstVisit } from "@/actions/user/firstVisit";
import { User } from "lucia";
import WelcomeModal from "../modal/WelcomeModal";

const WrapperWelcome = ({ user }: { user: User }) => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      const isFirstVisit = await getFirstVisit();
      console.log(isFirstVisit);
      if (isFirstVisit && user.email && user.username) {
        await setFirstVisit();
        setShowWelcomeModal(true);
      } else {
        return;
      }
    };

    init();
  }, [user.email, user.username]);

  return (
    <WelcomeModal
      show={showWelcomeModal}
      setShowModal={setShowWelcomeModal}
      user={user}
    />
  );
};

export default WrapperWelcome;
