'use client';

import 'gridstack/dist/gridstack.min.css';
import { useRouter } from 'next/navigation';

export function FeedSetup() {
  const router = useRouter();

  const handleClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = evt.target as HTMLElement;
    const currId = target.dataset.route;
    if (!currId) return;

    router.push(currId);
  };

  return <div className="grid-stack overflow-hidden" onClick={handleClick}></div>;
}
