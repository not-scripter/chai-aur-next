//NOTE: temporary
export const dynamic = "force-dynamic";

import { dbConnect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          error: "user not found",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "User Found",
        data: user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}
