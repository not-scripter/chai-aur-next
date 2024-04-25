import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  const userId = user?._id;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "not authenticated",
      },
      { status: 401 },
    );
  }

  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true },
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user status",
        },
        { status: 401 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "message acceptence status updated",
        updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("failed to update user status", error);
    return Response.json(
      {
        success: false,
        message: "failed to update user status",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  const userId = user?._id;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "not authenticated",
      },
      { status: 401 },
    );
  }

  const foundUser = await UserModel.findById(userId);

  try {
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("error getting message acceptence status", error);
    return Response.json(
      {
        success: false,
        message: "error getting message acceptence status",
      },
      { status: 500 },
    );
  }
}
