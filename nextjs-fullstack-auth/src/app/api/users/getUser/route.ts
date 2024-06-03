import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "user not found",
      });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
