import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import AadhaarValidator from "aadhaar-validator";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { fullName, mobile, aadhar } = await req.json();

    if (!fullName || !mobile || !aadhar) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        { message: "Invalid mobile number" },
        { status: 400 }
      );
    }

    if (!AadhaarValidator.isValidNumber(aadhar)) {
      return NextResponse.json(
        { message: "Invalid Aadhaar number" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      $or: [{ mobile }, { aadhar }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await User.create({
      fullName,
      mobile,
      aadhar,
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    });

    console.log("OTP (testing):", otp);

    return NextResponse.json(
      { message: "Registered Successfully. OTP Sent." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
