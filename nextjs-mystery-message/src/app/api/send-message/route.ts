import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user nor found",
        },
        { status: 401 },
      );
    }

    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "user is not accepting the messages",
        },
        { status: 403 },
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "message send successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("error getting messages", error);
    return Response.json(
      {
        success: false,
        message: "error getting messages",
      },
      { status: 500 },
    );
  }
}
