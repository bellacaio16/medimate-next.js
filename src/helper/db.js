import { UserModel } from "@/models/user";
import mongoose from "mongoose";

export default async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "medimateDB",
    });
    console.log("DB connected!");
    // const userData = new UserModel({
    //   name: "Deepesh",
    //   email: "db@gmail.com",
    //   password: "123",
    // });
    // const savedUser = await userData.save();
    // console.log(`New User Created ${savedUser._id}`);
  } catch (error) {
    console.log("Connection Failed!\n" + error);
    // You might want to throw the error here to indicate failure
    throw error;
  }
}
