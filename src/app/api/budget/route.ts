import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/config/dbConfig";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const { budget } = await req.json();
    const session: any = await getServerSession(authOption);
    
    if (!session || !session.user.email) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    // Update user's budget
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { budget: budget } },
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Budget updated successfully", 
        success: true,
        user: updatedUser 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Error at profile route:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}