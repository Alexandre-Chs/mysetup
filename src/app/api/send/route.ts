import ResetPasswordEmailTemplate from "@/lib/resend/template/ResetPassword";
import VerifyEmailTemplate from "@/lib/resend/template/VerifyEmail";
import WelcomeEmailTemplate from "@/lib/resend/template/Welcome";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SendWelcomeEmail(email: string, username: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Mysetup <contact@mysetup.app>",
      to: [email],
      subject: "Welcome to MySetup",
      react: WelcomeEmailTemplate({ username }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function SendVerificationEmail(
  email: string,
  verificationLink: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Mysetup <contact@mysetup.app>",
      to: [email],
      subject: "Verify your email",
      react: VerifyEmailTemplate(email, verificationLink),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function SendResetPasswordEmail(
  email: string,
  verificationLink: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Mysetup <contact@mysetup.app>",
      to: [email],
      subject: "Reset your password",
      react: ResetPasswordEmailTemplate(email, verificationLink),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
