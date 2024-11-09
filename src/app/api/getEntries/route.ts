import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import Entry from "@/models/entry.models";
// import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/config/dbConfig";

import {getToken} from 'next-auth/jwt';
// import { getSessionToken } from "@/app/utils/getSession";

import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



export async function GET(req: NextRequest) {

  try {
    await connectDB();
  
const entries = (await Entry.find({})).reverse();
return NextResponse.json({ entries, success: true }, { status: 200 });
  
  } catch (error) {
    console.error("Error at profile route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
