import { listUserSetup } from "@/actions/setup/list";
import CreateSetup from "@/components/setup/CreateSetup";
import { validateRequest } from "@/lib/auth/validate-request";
import { notFound } from "next/navigation";

export default async function Page({params}: { params: { username: string }}) {
    const { user } = await validateRequest();

    const { username } = params;
    let setups;
    try {
      setups = await listUserSetup(username);
    } catch (error) {
      notFound();
    }

    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

    return (
        <div className="flex flex-col h-[90vh] max-w-[1000px] mx-auto">
          <h1 className="font-bold text-3xl my-4">{capitalizedUsername}&apos;s setups</h1>
          {setups.map((setup) => (
            <a href={`/setup/${setup.id}`} key={setup.id}>{setup.name}</a>
          ))}
          {user && user.username === username && (
            <CreateSetup />
          )}
        </div>
    );
}