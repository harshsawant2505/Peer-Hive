import { connectDB } from "@/config/dbConfig";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Entry from "@/models/entry.models";

export async function POST(req: NextRequest) {
    try {
    await connectDB();
    const {name}=await req.json();
    // console.log("----=-=-=->",name);
    const entries = await Entry.findOne({name:name});
    // console.log("----=-=-=->",entries);
    if(!entries){
      return NextResponse.json({value:0, message: "Entry not found", success: false }, { status: 404 });
    }
    if(!entries.members){
      return NextResponse.json({value:0, message: "No members found", success: false }, { status: 404 });
    }else{
      const num=entries.members.length;
      return NextResponse.json({value: num , success:true}, { status: 200 });
    }
        
    } catch (error) {
      console.log("Error at getmembercount:", error);
      return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }
  }
  