import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "invalid token",
        },
        { status: 400 },
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "email verified successfully",
        success: true,
      },
      { status: 200 },
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
