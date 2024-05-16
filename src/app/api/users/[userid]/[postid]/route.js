import { NextResponse } from "next/server";

export async function DELETE(request, {params}) {
    const {userid, postid}  = params;
    console.log(`user id: ${userid}`);
    console.log(`post id: ${postid}`);
    console.log(request.method);
    const jsonData = await request.json();
    console.log(jsonData);
    return NextResponse.json({message:`UserId: ${userid} is deleted successfully!`});
}