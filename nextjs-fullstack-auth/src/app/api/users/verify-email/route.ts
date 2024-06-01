import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { token } = requestBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "user not found",
        },
        { status: 400 },
      );
    }

    console.log(user);

    user.isVerifid = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    const netUser = await user.save();

    return NextResponse.json(
      {
        message: "email verified successfully",
        success: true,
      },
      { status: 500 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
