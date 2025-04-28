import { connectDb } from "@/connectDb";
import CheckAuth from "../../../../../middlewares/isAuth";
import { NextResponse } from "next/server";
import { Job } from "../../../../../models/Job";

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
          status: 400,
        }
      );

    const id = searchParams.get("id");
    const job = await Job.findById(id);

    return NextResponse.json(job);
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
