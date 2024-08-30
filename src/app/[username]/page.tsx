import { getOneImageSetup } from "@/actions/setup/get";
import { listUserSetup } from "@/actions/setup/list";
import WrapperProfile from "@/components/profile/WrapperProfile";
import CardSetup from "@/components/setup/CardSetup";
import { notFound } from "next/navigation";
import { Fragment } from "react";

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
    <div className="flex flex-col h-[90vh] w-full overflow-x-hidden">
      <WrapperProfile setups={setups} />
    </div>
  );
}
