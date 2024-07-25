import { getSetup } from "@/actions/setup/get";
import ToolbarUpdateSetup from "@/components/setup/update-setup/ToolbarUpdateSetup";
import WrapperSetup from "@/components/setup/WrapperSetup";
import { validateRequest } from "@/lib/auth/validate-request";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { id: string; username: string };
}) {
  const { user } = await validateRequest();

  const setup = await getSetup(params.id);
  if (!setup) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      {user?.username === params.username && (
        <ToolbarUpdateSetup setupId={params.id} />
      )}
      <h1>{setup.name}</h1>
      <WrapperSetup currentUser={user} setupId={setup.id} />
    </div>
  );
}
