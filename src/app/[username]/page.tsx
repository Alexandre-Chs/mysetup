import { listUserSetup } from "@/actions/setup/list";
import CardSetup from "@/components/setup/CardSetup";
import CreateSetup from "@/components/setup/CreateSetup";
import { validateRequest } from "@/lib/auth/validate-request";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { user } = await validateRequest();

  const { username } = params;
  let setups;
  try {
    setups = await listUserSetup(username);
  } catch (error) {
    notFound();
  }

  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  return (
    <div className="flex flex-col h-[90vh] max-w-6xl mx-auto">
      <h1 className="font-bold text-3xl my-8">
        {capitalizedUsername}&apos;s setups
      </h1>
      <div className="flex flex-wrap flex-row gap-8 items-center justify-center pb-8">
        {setups.map((setup) => (
          <a href={`${username}/${setup.id}`} key={setup.id}>
            <CardSetup setup={setup} />
          </a>
        ))}
      </div>
      {user && user.username === username && <CreateSetup />}
    </div>
  );
}
