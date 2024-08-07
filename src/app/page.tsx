import { getAllSetupsPhotos } from "@/actions/setup-photo/get";
import Feed from "@/components/feed/Feed";

export default async function Home() {
  const allSetupsPhotos = await getAllSetupsPhotos();
  return (
    <div>
      <Feed photos={allSetupsPhotos} />
    </div>
  );
}
