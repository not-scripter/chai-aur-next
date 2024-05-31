import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const verifyMail = `<p>
      Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}">here</a> to verify your email </br> or copy and paste the link below in your browsera.</br>${process.env.DOMAIN}/verify-email?token=${hashedToken}
      </p>`;
    const resetMail = `<p>
      Click <a href="${process.env.DOMAIN}/reset-password?token=${hashedToken}">here</a> to Reset your Password </br> or copy and paste the link below in your browsera.</br>${process.env.DOMAIN}/verify-email?token=${hashedToken}
      </p>`;

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "52a0d81aa46406", //WARN:
        pass: "cd64f1541c7610", //WARN:
      },
    });

    const mailOptions = {
      from: '"nextjs-with-mongodb project 👻" <nextjs-with-mongodb@vercel.app>',
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verity your Account"
          : "RESET"
            ? "Reset yout Password"
            : "",
      html: emailType === "VERIFY" ? verifyMail : "RESET" ? resetMail : "",
    };

    const mailResponse = await transport.sendEmail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
