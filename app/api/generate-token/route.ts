import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { mobile, doctor } = await req.json();

    if (!mobile || !doctor) {
      return NextResponse.json(
        { message: "Mobile and doctor are required" },
        { status: 400 }
      );
    }

    // Patient find karo
    const patient = await User.findOne({ mobile });

    if (!patient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }

    // Aaj ki date
    const today = new Date().toISOString().split("T")[0];

    /*
      Agar patient ko aaj already token mil chuka hai,
      to wahi token return karo.
    */
    if (
      patient.tokenNumber &&
      patient.tokenDate === today
    ) {
      return NextResponse.json(
        {
          message: "Existing token",
          tokenNumber: patient.tokenNumber,
        },
        { status: 200 }
      );
    }

    /*
      Aaj ka last token find karo
    */
    const lastPatient = await User.findOne({
      tokenDate: today,
      tokenNumber: { $exists: true, $ne: null },
    }).sort({
      tokenNumber: -1,
    });

    /*
      Agar aaj koi token nahi hai
      to token 1 se start hoga
    */
    const newToken = lastPatient?.tokenNumber
      ? lastPatient.tokenNumber + 1
      : 1;

    /*
      Token patient ke database record mein save karo
    */
    patient.doctor = doctor;
    patient.tokenNumber = newToken;
    patient.tokenDate = today;

    await patient.save();

    return NextResponse.json(
      {
        message: "Token generated successfully",
        tokenNumber: newToken,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Generate token error:", error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}