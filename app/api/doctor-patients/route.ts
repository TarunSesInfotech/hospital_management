import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { doctorName } = await req.json();

    if (!doctorName) {
      return NextResponse.json(
        { message: "Doctor name required" },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const patients = await User.find({
      doctor: doctorName,
      tokenDate: { $gte: today, $lt: tomorrow },
      role: "patient",
    }).sort({ tokenNumber: 1 });

    return NextResponse.json(
      { patients },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
