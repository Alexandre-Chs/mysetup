import WrapperProfile from "@/components/user/profile/WrapperProfile";
import { notFound } from "next/navigation";
import { listUserSetup } from "../api/setups/actions";

export default async function Page({ params }: { params: { username: string } }) {
  const { username } = await params;
  let setups;
  try {
    setups = await listUserSetup(username);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full overflow-x-hidden pb-8">
      <WrapperProfile setups={setups} currentUsername={username} />
    </div>
  );
}
