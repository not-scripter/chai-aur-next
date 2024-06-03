import { dbConnect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user: any = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "user not found",
        },
        { status: 400 },
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "invalid password",
        },
        { status: 400 },
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "loged in successfully",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
