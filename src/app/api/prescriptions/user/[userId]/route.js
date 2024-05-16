import connectDB from "@/helper/db";
import { PrescriptionModel } from "@/models/prescription";
import { NextResponse } from "next/server";
// const userId:sdf345xc45
export async function GET(request, {params}){
    await connectDB();
    const {userId} = params;
    try{
        const prescriptions = await PrescriptionModel.find({userId:userId});
        // console.log(prescriptions);
        return NextResponse.json({message:"User's prescriptions found!", result:prescriptions,success:true},{status:201});
    }catch(error){
        console.log(error);
        return NextResponse.json({message:"User's prescriptions not found!",success:false},{status:501});
    }
}