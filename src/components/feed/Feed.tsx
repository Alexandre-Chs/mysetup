import { GridStack } from 'gridstack';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import FeedGrid from './FeedGrid';
import { getPaginatedSetupPhotos } from '@/app/api/setups/media/actions';

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

const Loader = () => {
  const [points, setPoints] = React.useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        if (prev.length === 3) return '.';
        return prev + '.';
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
            <h2 className="text-2xl text-center font-semibold">We search setups for you{points}</h2>
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
  return <h2 className="font-light text-sm md:text-xl sm:text-medium text-textColor md:py-4 py-0 max-w-xl mx-auto text-center px-4 md:px-0">No more setups for the moment</h2>;
};

export const Feed = () => {
  const [grid, setGrid] = useState<GridStack | null>(null);
  const [dataLength, setDataLength] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(2);
  const [fetching, setFetching] = useState(false);

  const loadedSetupIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const initGrid = () => {
      const newGrid = GridStack.init({
        float: true,
        disableDrag: true,
        disableResize: true,
      });

      setGrid(newGrid);

      return () => {
        newGrid.destroy(false);
      };
    };

    initGrid();
  }, []);

  // Fonction pour récupérer les photos paginées
  const getSetupPhotos = useCallback(async () => {
    if (!grid || page >= totalPage || fetching) return;
    setFetching(true);

    try {
      const { totalPage: fetchedTotalPage, data } = await getPaginatedSetupPhotos(page);

      setTotalPage(fetchedTotalPage);
      setPage((prevPage) => prevPage + 1);
      setDataLength((prevLength) => prevLength + data.length);

      data.forEach((item) => {
        if (loadedSetupIds.current.has(item.setupId)) return;
        loadedSetupIds.current.add(item.setupId);
        grid.addWidget({
          w: random(),
          h: random(),
          content: `
            <div class="relative w-full h-full overflow-hidden rounded-lg cursor-pointer group">
              <div
                class="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                style="background-image: url('${item.url}')"
                data-route="${item.username}/${item.setupId}"
              >
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-black/30 backdrop-blur-lg transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                <p class="text-white text-center font-medium">
                  ${item.username}${item.title ? ' - ' + item.title : ''}
                </p>
              </div>
            </div>
          `,
        });
      });
    } catch (error) {
      console.error('Error while loading feed:', error);
    }
  }, [grid, page, totalPage]);

  useEffect(() => {
    if (grid) {
      getSetupPhotos();
    }
  }, [grid, getSetupPhotos]);

  return (
    <InfiniteScroll dataLength={dataLength} next={getSetupPhotos} hasMore={page < totalPage} loader={<Loader />} endMessage={<EndOfList />}>
      <FeedGrid />
    </InfiniteScroll>
  );
};
