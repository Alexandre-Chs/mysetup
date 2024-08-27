import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <div>
      <h1>Réinitialiser le mot de passe</h1>
      <ResetPasswordForm token={params.token} />
    </div>
  );
}
