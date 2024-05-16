import { PrescriptionModel } from "@/models/prescription";
import { NextResponse } from "next/server";

export async function DELETE(request,{params}){
    const {prescriptionId} = params;
    console.log("PresID>>>>", prescriptionId);
    try{
        const result = await PrescriptionModel.deleteOne({_id:prescriptionId});
        return NextResponse.json({message:"deleted!..."});
    }catch(err){
        console.log(err);
        return NextResponse.json({message:"delete failed!..."});
    }
}