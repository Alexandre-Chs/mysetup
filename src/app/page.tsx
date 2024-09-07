import { getAllSetupsPhotos } from "@/actions/setup-photo/get";
import WrapperHome from "@/components/home/WrapperHome";

export default async function Home() {
  const allSetupsPhotos = await getAllSetupsPhotos();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#07080A_40%,#000_60%)] bg-cover bg-center">
      <p>Home</p>
      <WrapperHome allSetupsPhotos={allSetupsPhotos} />
    </div>
  );
}
