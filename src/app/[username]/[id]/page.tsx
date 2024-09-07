import { getSetup } from "@/actions/setup/get";
import Setup from "@/components/setup/Setup";

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
    <Setup setup={setup} user={user} />
  );
}
