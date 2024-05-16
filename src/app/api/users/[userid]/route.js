import connectDB from "@/helper/db";
import { UserModel } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  await connectDB();
  const { userid } = params;
  const { email, name, password, profileURL } = await request.json();
  try {
    const userFound = await UserModel.findOne({ _id: userid });
    if (userFound) {
      userFound.email = email;
      userFound.name = name;
      userFound.password = password;
      userFound.profileURL = profileURL;
      const updatedUser = await userFound.save();
      console.log("User data updated!");
      return NextResponse.json({ message: "User data updated!.." });
    }
  } catch (error) {
    console.log("User data updated!");
    console.log(error);
    return NextResponse.json(
      { message: "failed to update!", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { userid } = params;
  // console.log(params);
  console.log(`user id: ${userid}`);
  return NextResponse.json({ message: "UserId deleted!" });
}
