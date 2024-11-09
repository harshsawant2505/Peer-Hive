import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
// import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/config/dbConfig";

import {getToken} from 'next-auth/jwt';
// import { getSessionToken } from "@/app/utils/getSession";

import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



export async function POST(req: NextRequest) {

  try {
    await connectDB();

    const {des, name, type} = await req.json();
    console.log(des, name, type)
    
    const session:any = await getServerSession(authOption);
    console.log("session",session.user.email)
    

         
    const newEntry = new User({
        name: name,
        description: des,
        type: type,
        college: session.user.email
    });
    const savedUser = await newEntry.save();
    console.log(savedUser);
          
         console.log(user);
         if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
          }else{

              return NextResponse.json({ id: user._id, user: user, name: user.name }, { status: 200 });
          }
        

  
  } catch (error) {
    console.error("Error at profile route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
