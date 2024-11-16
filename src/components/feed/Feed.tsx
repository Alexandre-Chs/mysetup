"use client";

import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useCallback, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

function random() {
  const numbers = [2, 2, 2, 2, 2, 4, 4, 4];
  const tabletNumbers = [4, 4, 4, 4, 4, 8, 8, 8];
  const mobileNumbers = [6, 6, 6, 6, 6, 12, 12, 12];
  const documentWidth = document.body.clientWidth;
  const isMobile = documentWidth < 768;
  const isTablet = documentWidth >= 768 && documentWidth < 1720;
  if (isMobile) {
    return mobileNumbers[Math.floor(Math.random() * mobileNumbers.length)];
  } else if (isTablet) {
    return tabletNumbers[Math.floor(Math.random() * tabletNumbers.length)];
  }
  return numbers[Math.floor(Math.random() * numbers.length)];
}

// create an array of length passed in parameter and fill it with random number from the random
function randomFill(length: number) {
  let id = 0;
  return Array.from({ length }, () => ({ id: id++, w: random(), h: random() }));
}

const Loader = () => {
  const [points, setPoints] = React.useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        if (prev.length === 3) return ".";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center mx-auto mt-32">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-20 h-40" />
          <Skeleton className="w-20 h-20" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Skeleton className="w-40 h-20" />
            <Skeleton className="w-20 h-20" />
            <Skeleton className="w-20 h-20" />
          </div>
          <div className="flex items-center justify-center h-16">
            <h2 className="text-2xl text-center font-semibold">
              We search setups for you{points}
            </h2>
          </div>
          <div className="flex flex-row gap-4">
            <Skeleton className="w-20 h-20" />
            <Skeleton className="w-40 h-20" />
            <Skeleton className="w-20 h-20" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="w-20 h-20" />
          <Skeleton className="w-20 h-40" />
        </div>
      </div>
    </div>
  );
};

const EndOfList = () => {
  return (
    <h2 className="text-center text-3xl my-8 font-bold">No more setups !</h2>
  );
};

const Feed = ({ photos }: { photos: any[] }) => {
  const router = useRouter();
  const [grid, setGrid] = useState<any>(null);
  const [dataLength, setDataLength] = useState(0);
  const [setupPhotos, setSetupPhotos] = useState<any[]>([]);

  const handleClick = (e: any) => {
    const currId = e.target.dataset.route;
    if (currId) {
      router.push(currId);
    }
  };

  useEffect(() => {
    const initGrid = async () => {
      const newGrid = GridStack.init({
        float: true,
        disableDrag: true,
        disableResize: true,
      });
      photos.forEach((item) => {
        newGrid.addWidget({
          w: random(),
          h: random(),
          content: `<div class="grid-stack-item-content w-full h-full bg-cover bg-center rounded-lg cursor-pointer" style="background-image: url('${item.url}')" data-route="${item.username}/${item.setupId}"></div>`,
        });
        setSetupPhotos((prev) => [...prev, item]);
      });
      setGrid(newGrid);
      setDataLength(100);
    };

    initGrid();
  }, [photos]);

  const addMore = useCallback(() => {
    if (grid) {
      randomFill(20).forEach((item) =>
        grid.addWidget({
          w: item.w,
          h: item.h,
          content: `<div class="grid-stack-item-content w-full h-full bg-cover bg-center rounded-lg bg-[url('https://placehold.co/600x400')]"></div>`,
        })
      );
      setDataLength((prevLength) => prevLength + 20);
    }
  }, [grid]);

  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={() => {}}
      hasMore={dataLength < 200}
      loader={<Loader />}
      endMessage={<EndOfList />}
    >
      <div className="grid-stack overflow-hidden" onClick={handleClick}></div>
    </InfiniteScroll>
  );
};

export default Feed;
