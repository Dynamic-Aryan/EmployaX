import { NextResponse } from "next/server";
import { User } from "../../../../../models/User";
import uploadFile from "../../../../../middlewares/upload";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDb } from "@/connectDb";

export async function POST(request) {
  try {
    await connectDb();

    const formdata = await request.formData();
    const email = formdata.get("email");
    const name = formdata.get("name");
    const password = formdata.get("password");
    const bio = formdata.get("bio");
    const resume = formdata.get("resume");
    const phoneNumber = formdata.get("phoneNumber");
    const role = formdata.get("role");
    const profilePic = formdata.get("profilePic");

    let user = await User.findOne({ email });

    if (user)
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );

    let pic = "";

    if (profilePic) {
      pic = await uploadFile(profilePic);
    }

    let resumeFile = "";

    if (resume) {
      resumeFile = await uploadFile(resume);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPassword,
      phoneNumber,
      role,
      bio,
      resume: resumeFile.url,
      profilePic: pic.url,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
      expiresIn: "10d",
    });

    return NextResponse.json(
      {
        user,
        message: "User registered successfully",
        token,
      },
      {
        status: 200,
      }
    );
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
