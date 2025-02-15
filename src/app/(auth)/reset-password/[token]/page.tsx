import { AuthResetPasswordForm } from '@/components';

type ResetPasswordPageProps = {
  params: {
    token: string;
  };
};

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div className="max-w-[18rem] w-full flex items-center justify-center flex-col">
        <h1 className="text-2xl font-medium text-white pb-6">Request password reset</h1>
        <AuthResetPasswordForm token={params.token} />
      </div>
    </div>
  );
}
