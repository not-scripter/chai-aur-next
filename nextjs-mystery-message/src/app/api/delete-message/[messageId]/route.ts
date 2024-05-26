import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function DELETE(
  request: Request,
  { params }: { params: { messageId: string } },
) {
  await dbConnect();

  const messageId = params.messageId;
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "not authenticated",
      },
      { status: 401 },
    );
  }

  try {
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } },
    );
    if (updatedResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "message not found",
        },
        {
          status: 404,
        },
      );
    }
    return Response.json(
      {
        success: true,
        message: "message deleted",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("error deleting message", error);
    return Response.json(
      {
        success: false,
        message: "error deleting message",
      },
      {
        status: 500,
      },
    );
  }
}
