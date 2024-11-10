import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/config/dbConfig";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Entry from "@/models/entry.models";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const {name}=await req.json()
    console.log("----=-=-=->",name);

    const entry=await Entry.findOne({name:name});
    if(!entry){
      return NextResponse.json({todos: null, message: "Entry not found", success: false }, { status: 404 });
    }
    return NextResponse.json({todos:entry.todos, message: "Todos updated", success: true }, { status: 200 });
  } catch (error) {
    console.error("Error at todos route:", error);
    return NextResponse.json({todos:null, message: "Internal server error", success: false }, { status: 500 });
  }
}