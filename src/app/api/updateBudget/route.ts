import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/config/dbConfig";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const { amount, description, remainingBudget } = await req.json();
    const session: any = await getServerSession(authOption);
    
    if (!session || !session.user.email) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    // Update user's budget and add expense record
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $set: { budget: remainingBudget },
        $push: { 
          expenses: {
            amount,
            description,
            date: new Date()
          }
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Budget spent successfully", 
        success: true,
        remainingBudget: updatedUser.budget
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Error at spend budget route:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}