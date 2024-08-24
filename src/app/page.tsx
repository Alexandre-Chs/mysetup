import { getAllSetupsPhotos } from "@/actions/setup-photo/get";
import WrapperHome from "@/components/home/WrapperHome";
import { validateRequest } from "@/lib/auth/validate-request";

export default async function Home() {
  const allSetupsPhotos = await getAllSetupsPhotos();

  return (
    <div>
      <WrapperHome allSetupsPhotos={allSetupsPhotos} />
    </div>
  );
}
