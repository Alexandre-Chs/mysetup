import VerifyEmailTemplate from "@/lib/resend/template/VerifyEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, verificationLink } = await req.json();
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
