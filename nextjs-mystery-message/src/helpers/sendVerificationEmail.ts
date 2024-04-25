import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifCode: string
): Promise<ApiResponse>{
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Mystery Message | Verification Code',
      react: VerificationEmail({username, otp: verifCode}),
    });
    return {
      success: true,
      message: "Verification Email send successfully"
    }
  } catch (emailError) {
    console.error("Erroe sending verification email", emailError)
    return {
      success: false,
      message: "Failed to sending verification email"
    }
  }
}
