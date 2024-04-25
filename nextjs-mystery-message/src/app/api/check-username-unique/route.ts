import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { UsernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UsernameValidationSchema = z.object({
  username: UsernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };
    // Validate with ZOD
    const result = UsernameValidationSchema.safeParse(queryParams);
    console.log(result); //TODO: remove

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "error validating username",
        },
        { status: 400 },
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "username is already taken",
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "username is unique",
      },
      { status: 400 },
    );
  } catch (error) {
    console.error("error checking username", error);
    return Response.json(
      {
        success: false,
        message: "error checking username",
      },
      { status: 500 },
    );
  }
}
