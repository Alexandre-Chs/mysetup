import { getSetup } from "@/actions/setup/get";
import WrapperSetup from "@/components/setup/WrapperSetup";
import { validateRequest } from "@/lib/auth/validate-request";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();

  const setup = await getSetup(params.id);
  // console.log(setup);

  if (!setup) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <h1>{setup.name}</h1>
      <WrapperSetup setup={setup} />
    </div>
  );
}
