'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import DeleteSetupModal from '../../modal/ModalDeleteSetup';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useIsOwner } from '@/hook/useIsOwner';
import { UserProfileSetupCard } from './UserProfileSetupCard';

type Card = {
  src: string;
  title: string;
  content: React.ReactNode;
  link: string;
  setupId: string;
};

type UserProfileCarouselCardProps = {
  card: Card;
  layout?: boolean;
};

export const UserProfileCarouselCard = ({ card, layout = false }: UserProfileCarouselCardProps) => {
  const { isOwner } = useIsOwner(card?.setupId);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    if (showModal) return;
    router.push(card.link);
  };

  const handleDeleteSetup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <motion.div
        layoutId={layout ? `card-${card.title}` : undefined}
        className={clsx(
          'rounded-3xl bg-backgroundTertiary h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 cursor-pointer group',
          card.src === '' ? 'bg-backgroundTertiary' : 'dark:bg-neutral-900',
        )}
        onClick={handleCardClick}>
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8 bg-backgroundSecondary/30 backdrop-blur-sm w-full">
          <motion.p layoutId={layout ? `title-${card.title}` : undefined} className="text-white text-lg md:text-2xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2">
            {card.title}
          </motion.p>
          {isOwner && (
            <div className="hidden group-hover:flex absolute top-5 right-5">
              <div onClick={handleDeleteSetup}>
                <Trash2 className="text-redText cursor-pointer rounded-full hover:text-redTextLighter" />
                <DeleteSetupModal show={showModal} setShowModal={setShowModal} setupId={card.setupId} />
              </div>
            </div>
          )}
        </div>
        {card.src !== '' ? (
          <UserProfileSetupCard src={card.src} alt={card.title} width={400} height={600} className="object-cover absolute z-10 inset-0 h-full" />
        ) : (
          <div className="w-full h-full bg-backgroundTertiary flex items-center justify-center">
            <p className="text-xs text-textColor">No image for this setup yet</p>
          </div>
        )}
      </motion.div>
    </>
  );
};
