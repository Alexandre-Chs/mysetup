"use client";

import React, { useEffect, useState, createContext } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import DeleteSetupModal from "../navbar/DeleteSetupModal";
import { User } from "lucia";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  link: string;
  setupId: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
  user,
  currentUsername,
}: CarouselProps & { user: User | null; currentUsername: string }) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none] text-center"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div className={cn("flex flex-row justify-start gap-4 pl-4")}>
            {items.length > 0 ? (
              items.map((item, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: "easeOut",
                      once: true,
                    },
                  }}
                  key={"card" + index}
                  className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
                >
                  {React.cloneElement(item, { user, currentUsername })}
                </motion.div>
              ))
            ) : (
              <p>No setup already posted</p>
            )}
          </div>
        </div>
        {items.length > 0 && (
          <div className="flex xl:justify-end gap-2 mr-10">
            <button
              className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
            </button>
            <button
              className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  layout = false,
  user,
  currentUsername,
}: {
  card: Card;
  index: number;
  layout?: boolean;
  user: User | null;
  currentUsername: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    if (!showModal) {
      router.push(card.link);
    }
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
          "rounded-3xl bg-backgroundTertiary h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 cursor-pointer",
          card.src === "" ? "bg-backgroundTertiary" : "dark:bg-neutral-900"
        )}
        onClick={handleCardClick}
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8 bg-backgroundSecondary/30 backdrop-blur-sm w-full">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-left"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-lg md:text-2xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {card.title}
          </motion.p>
          {user?.username === currentUsername && (
            <div className="absolute top-5 right-5">
              <div onClick={handleDeleteSetup}>
                <Trash2 className="text-redText cursor-pointer rounded-full hover:text-redTextLighter" />
                <DeleteSetupModal
                  show={showModal}
                  setShowModal={setShowModal}
                  setupId={card.setupId}
                />
              </div>
            </div>
          )}
        </div>
        {card.src !== "" ? (
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="object-cover absolute z-10 inset-0"
          />
        ) : (
          <div className="w-full h-full bg-backgroundTertiary flex items-center justify-center">
            <p className="text-xs text-textColor">No image for this card yet</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Photo of a beautiful setup"}
      {...rest}
    />
  );
};
