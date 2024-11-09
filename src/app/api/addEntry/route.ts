import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/user.models";
import Entry from "@/models/entry.models";
// import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/config/dbConfig";




import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



export async function POST(req: NextRequest) {

  try {
    await connectDB();

    const formData = await req.json();
    console.log(formData)

    if(formData.name === "" || formData.description === "" || formData.type === "", formData.organization === ""){
        return NextResponse.json({ message: "Please fill all the fields", success: false }, { status: 400 });
    }
    const college = req.cookies.get('college')?.value;
    console.log(college)
    const session:any = await getServerSession(authOption);
    console.log("session",session)
    

    const newEntry = new Entry({
        name: formData.name,
        des: formData.description,
        type: formData.type,
        college: college,
        organization: formData.organization,
        owner: session.user.email
    });

    const savedEntry = await newEntry.save();
    console.log(savedEntry);
    return NextResponse.json({ message: "Entry added", success: true }, { status: 200 });   
        

  
  } catch (error) {
    console.error("Error at profile route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
