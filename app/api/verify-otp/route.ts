import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User"; 

export async function POST(req: Request) {
  try {
    await connectDB();
    const { mobile, otp } = await req.json();

    const user = await User.findOne({ mobile });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Clear OTP after verification
    user.otp = null;
    user.otpExpiry = null;
    await user.save();  

    return NextResponse.json(
      { message: "OTP Verified Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
