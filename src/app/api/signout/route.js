import UserContext from "@/context/userContext";
import { NextResponse } from "next/server";
import { useContext } from "react";

export async function DELETE(request) {
  try {
    const response =  NextResponse.json({message:"Trying to SignOut..."});
    response.cookies.delete("authToken");
    
    // console.log("Response: ",response);
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({message:"Signed Out Failed!",success:true},{status:501});
  
  }
}
