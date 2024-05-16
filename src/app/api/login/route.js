import { UserModel } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();
    // console.log("HELLO ");
  try {
    const result = await UserModel.findOne({ email: email });
    if (result == null) {
      throw new Error("Email not found!");
    }
    // console.log(result);

    const token = await jwt.sign({ _id: result._id }, process.env.JWT_KEY);
    // console.log("\n TOKEN:>> \n",token,"\n");
    // NEXTRESPONSE MESSAGE STATUS
    const response = NextResponse.json(
      { message: "User Signin Successful!",user:result, success: true },
      { status: 201 }
    );
    // SET TOKEN IN COOKIE
    response.cookies.set("authToken", token, {
      expiresIn: "2d",
      httpOnly:true
    });
    return response;
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { message: `User Signin Failed! ${err.message}`, success: false },
      { status: 501 }
    );
  }
}
