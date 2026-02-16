import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { mobile, doctor } = await req.json();

    if (!mobile || !doctor) {
      return NextResponse.json(
        { message: "Missing data" },
        { status: 400 }
      );
    }

    // 🔥 Find last token for this doctor
    const lastPatient = await User.findOne({ doctor })
      .sort({ tokenNumber: -1 });

    let newToken = 1;

    if (lastPatient && lastPatient.tokenNumber) {
      newToken = lastPatient.tokenNumber + 1;
    }

    await User.findOneAndUpdate(
      { mobile },
      { doctor, tokenNumber: newToken },
      { new: true }
    );

    return NextResponse.json(
      { tokenNumber: newToken },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
