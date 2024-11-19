"use client";
import "gridstack/dist/gridstack.min.css";
import { useRouter } from "next/navigation";

function FeedGrid() {
  const router = useRouter();

  const handleClick = (e: any) => {
    const currId = e.target.dataset.route;
    if (currId) {
      router.push(currId);
    }
  };

  return (
    <div className="grid-stack overflow-hidden" onClick={handleClick}></div>
  )
}

export default FeedGrid;