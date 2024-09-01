import { listUserSetup } from "@/actions/setup/list";
import WrapperProfile from "@/components/profile/WrapperProfile";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  let setups;
  try {
    setups = await listUserSetup(username);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center w-full overflow-x-hidden pb-8">
      <WrapperProfile setups={setups} currentUsername={username} />
    </div>
  );
}
