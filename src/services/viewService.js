import { httpAxios } from "@/helper/httpAxios";
import { NextResponse } from "next/server";

export async function viewService(userId) {
  try{
    const response = await httpAxios.get(`api/prescriptions/user/${userId}`).then((res) => res.data);
    // console.log(response.result);
    return response;
  }catch(err){
    console.log(err);
    return NextResponse.json(
      { message: `user not found with pers!`,result:null, success: false },
      { status: 501 })
  }
}
