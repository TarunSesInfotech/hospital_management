import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { mobile } = body;

    if (body.type === "getDoctors") {
      const doctors = await User.find({ role: "doctor" });
      return NextResponse.json({ doctors }, { status: 200 });
    }

    const user = await User.findOne({ mobile });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        fullName: user.fullName,
        mobile: user.mobile,
        aadhar: user.aadhar,
        createdAt: user.createdAt,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
