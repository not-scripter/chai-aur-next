import { dbConnect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    console.log(requestBody);

    const user = User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "user not found",
        },
        { status: 400 },
      );
    }

    console.log(user);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "invalid email address",
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
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
