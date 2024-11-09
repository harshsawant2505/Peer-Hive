import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
// import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/config/dbConfig";

import {getToken} from 'next-auth/jwt';
// import { getSessionToken } from "@/app/utils/getSession";

import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



export async function GET(req: NextRequest) {

  try {
    await connectDB();
    


    
  
    const session:any = await getServerSession(authOption);
    console.log("session",session?.user?.email)
    // const token = req.cookies.get('token')?.value;

     
       
        
         
          const user = await User.findOne({ email: session.user.email }).select("-password");
          
         console.log(user);
         if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
          }else{

              return NextResponse.json({ id: user._id, user: user, name: user.name }, { status: 200 });
          }
        
       
       
       
       
     

  
   

    // return NextResponse.json({ id: user._id, name: user.name, avatar: avatar }, { status: 200 });
  
  } catch (error) {
    console.error("Error at profile route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
