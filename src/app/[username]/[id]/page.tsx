import { getSetup } from "@/actions/setup/get";
import Footer from "@/components/footer/Footer";
import Setup from "@/components/setup/Setup";

import { validateRequest } from "@/lib/auth/validate-request";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { id: string; username: string };
}) {
  const { user } = await validateRequest();

  const setup = await getSetup(params.id, params.username);
  if (!setup) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-[80px]">
      <Setup setup={setup} user={user} />
      <Footer />
    </div>
  );
}
