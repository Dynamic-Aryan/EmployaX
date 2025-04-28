import { connectDb } from "@/connectDb";
import CheckAuth from "../../../../../../middlewares/isAuth";
import { NextResponse } from "next/server";
import { Application } from "../../../../../../models/Application";

export async function GET(req) {
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
          status: 403,
        }
      );

    const applications = await Application.find({
      applicant: user._id,
    });

    return NextResponse.json(applications);
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
