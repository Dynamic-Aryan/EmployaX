import { connectDb } from "@/connectDb";
import CheckAuth from "../../../../../../middlewares/isAuth";
import { NextResponse } from "next/server";
import { User } from "../../../../../../models/User";
import uploadFile from "../../../../../../middlewares/upload";

export async function POST(req) {
  try {
    connectDb();

    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");

    const user = await CheckAuth(token);

    if (!user)
      return NextResponse.json(
        {
          message: "Please Login",
        },
        {
          status: 400,
        }
      );

    const loggedInUser = await User.findById(user._id);

    const formdata = await req.formData();

    const resume = formdata.get("resume");

    const resumeFile = await uploadFile(resume);

    loggedInUser.resume = resumeFile.url;

    await loggedInUser.save();

    return NextResponse.json({
      message: "Resume Updated",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
