import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div className="max-w-[18rem] w-full flex items-center justify-center flex-col">
        <h1 className="text-2xl font-medium text-white pb-6">
          Request password reset
        </h1>
        <ResetPasswordForm token={params.token} />
      </div>
    </div>
  );
}
