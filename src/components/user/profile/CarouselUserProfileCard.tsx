'use client';

import React, { useEffect } from 'react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { UserProfileCarouselCard } from './UserProfileCarouselCard';

type Setup = {
  id: string;
  name: string | null;
  description: string | null;
  photo?: {
    url: string;
  };
  user?: {
    username: string;
  };
};

type CarouselUserProfileCardProps = {
  setups: Setup[];
};

export const CarouselUserProfileCard = ({ setups }: CarouselUserProfileCardProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const initialScroll = 0;

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none] text-center" ref={carouselRef} onScroll={checkScrollability}>
        <div className={cn('absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l')}></div>
        <div className={cn('flex flex-row justify-start gap-4 pl-4')}>
          {setups?.map((setup, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * index, ease: 'easeOut', once: true } }}
              key={'card' + index}
              className="last:pr-[5%] md:last:pr-[33%] rounded-3xl">
              <UserProfileCarouselCard
                key={`card${index}`}
                card={{
                  src: setup?.photo?.url || '',
                  title: setup?.name || `No name`,
                  content: <p>{setup?.description || `Description setup ${index + 1}.`}</p>,
                  link: `/${setup?.user?.username}/${setup.id}`,
                  setupId: setup?.id,
                }}
                layout={true}
              />
            </motion.div>
          ))}
        </div>
      </div>
      {setups?.length > 0 && (
        <div className="flex xl:justify-end gap-2 mr-10">
          <button className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50" onClick={scrollLeft} disabled={!canScrollLeft}>
            <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
          </button>
          <button className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50" onClick={scrollRight} disabled={!canScrollRight}>
            <ChevronRightIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
};
