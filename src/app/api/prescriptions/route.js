import connectDB from "@/helper/db";
import { PrescriptionModel } from "@/models/prescription";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectDB();
    
    try {
      const result = await PrescriptionModel.find();
      console.log(result);
      return NextResponse.json({ message: "All Prescriptions found...",result});
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Failed to find all prescription !"});
    }
  }


export async function POST(request) {
  await connectDB();
  console.log(request.body);
  const { presName, dosage, timing, date, frequency, userId } = await request.json();
  const name = presName;
  const prescriptionData = new PrescriptionModel({
    name,
    dosage,
    timing,
    date,
    frequency,
    userId,
  });
  try {
    const result = await prescriptionData.save();
    // console.log(prescriptionData);
    return NextResponse.json({ message: "added new pres!" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Failed to create new prescription" });
  }
}
