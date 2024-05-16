import { NextResponse } from "next/server";
import connectDB from "@/helper/db";
import { UserModel } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
export async function GET(request) {
  await connectDB();
  let users = [];
  try {
    users = await UserModel.find();
  } catch (error) {
    console.log("Users not found!");
    return NextResponse.json(
      { message: "users not found!", success: false },
      { status: 501 }
    );
  }

  return NextResponse.json(users);
}
export async function POST(request) {
  await connectDB();
  const { name, email, password } = await request.json();
  const userData = new UserModel({ name, email, password });
  userData.password = await bcrypt.hashSync(userData.password, 10);
  //   console.log("\n",userData,"\n");
  try {
    const savedUser = await userData.save();

    console.log("user created!");
    const response = NextResponse.json(
      { message: `user created! ${savedUser}`,user: savedUser, status: 201, success: true },
      { status: 201 }
    );
    const token = await jwt.sign({ _id: savedUser._id }, process.env.JWT_KEY);
    // console.log("\n TOKEN:>> \n",token,"\n");
    // SET TOKEN IN COOKIE
    response.cookies.set("authToken", token, {
      expiresIn: "2d",
      httpOnly:true
    });
    return response;
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return NextResponse.json(
        { message: "Email already registered!", status: 501, success: false },
        { status: 501 }
      );
    }
    return NextResponse.json(
      { message: "user not created!", success: false },
      { status: 501 }
    );
  }
}
export async function DELETE(request) {
  await connectDB();
  console.log("Users Data Deleted!");
  return NextResponse.json(
    {
      message: "Deleted!",
      status: "true",
    },
    { status: 201, statusText: "Successfully deleted" }
  );
}
