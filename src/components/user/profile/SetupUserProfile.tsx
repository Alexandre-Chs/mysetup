import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaDiscord } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import { User } from '@/types/types';

const SetupUserProfile = ({ currentUser }: { currentUser?: User | null }) => {
  return (
    <div className="h-full bg-gray-100 rounded-large text-black px-6 flex flex-col items-start justify-center">
      <p className="font-bold text-xl">{currentUser?.username}</p>
      <div className="flex gap-2 flex-row flex-wrap pt-2 items-center">
        <FaXTwitter size={20} className="cursor-pointer" />
        <FaDiscord size={22} className="cursor-pointer" />
        <GrInstagram size={20} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default SetupUserProfile;
