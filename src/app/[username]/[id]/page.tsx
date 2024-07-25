import { getSetup } from "@/actions/setup/get";
import ToolbarUpdateSetup from "@/components/setup/update-setup/ToolbarUpdateSetup";
import WrapperNameSetup from "@/components/setup/WrapperNameSetup";
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
      <WrapperNameSetup setupName={setup.name as string} setupId={params.id} />
      <WrapperSetup currentUser={user} setup={setup} />
    </div>
  );
}
