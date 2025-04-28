import { connectDb } from "@/connectDb";
import { User } from "../../../../../models/User";
import { NextResponse } from "next/server";
import sendMail from "../../../../../middlewares/sendMail";
import jwt from "jsonwebtoken";



export async function POST(req) {
    try {
      connectDb();
  
      const body = await req.json();
  
      const { email } = body;
  
      const user = await User.findOne({ email });
  
      if (!user)
        return NextResponse.json(
          {
            message: "No user with this email",
          },
          {
            status: 400,
          }
        );
  
      const token = jwt.sign({ email }, process.env.FORGOT_SEC);
  
      const data = { email, token };
  
      await sendMail("EmployaX", data);
  
      user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
      user.resetToken = token;
  
      await user.save();
  
      return NextResponse.json({
        message: "Reset Password sent ,check your mail",
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