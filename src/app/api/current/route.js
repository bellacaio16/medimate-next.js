import connectDB from '@/helper/db';
import { UserModel } from '@/models/user';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request){
    await connectDB();
    try{
        const authToken = await request.cookies.get("authToken")?.value;
        // console.log(authToken);
        if(authToken){

            const result = await jwt.verify(authToken, process.env.JWT_KEY);
            // console.log("ID: ",result._id);
            const user = await UserModel.findOne({_id:result._id}, { password: 0 });
            return NextResponse.json({message:"Current user is Fetched!",user:user},{status:201})
        }else{
            
            return NextResponse.json({message:"Current user not Fetched!"},{status:201})
        }

    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Current user not Found!"},{status:501})
    }
}