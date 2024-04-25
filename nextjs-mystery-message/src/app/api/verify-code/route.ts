import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({
      username: decodedUsername,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "error getting user",
        },
        { status: 400 },
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "account verified successfully",
        },
        { status: 200 },
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "verify code has expired",
        },
        { status: 400 },
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "verify code is incorrect",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("error verifing code", error);
    return Response.json(
      {
        success: false,
        message: "error verifing code",
      },
      { status: 500 },
    );
  }
}
