import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/config/dbConfig";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Entry from "@/models/entry.models";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const {todos,name}=await req.json()
    console.log("----=-=-=->",todos);
    console.log("----=-=-=->",name);

    const entry=await Entry.findOne({name:name});
    if(!entry){
      return NextResponse.json({ message: "Entry not found", success: false }, { status: 404 });
    }
    entry.todos=todos;
    await entry.save();
    return NextResponse.json({ message: "Todos updated", success: true }, { status: 200 });

    
    
  } catch (error) {
    console.error("Error at todos route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}