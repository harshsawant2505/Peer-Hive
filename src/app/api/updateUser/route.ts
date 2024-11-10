// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/config/dbConfig";


export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Retrieve the session
    const {email,name}=await req.json()


    // If no email is found in session, respond with an error
    if (!email) {
      return NextResponse.json({ message: "Session does not contain a user email", success: false }, { status: 400 });
    }

    // Query the database for the user
    const user = await User.findOne({ email: email })

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }
    user.ownerOf.push(name);

    // Save the updated user document
        await user.save();

// Respond with success message
return NextResponse.json({ message: "Name added to ownerOf array", success: true }, { status: 200 });

  } catch (error) {
    // Log and respond with server error if any exception occurs
    console.error("Error at profile route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
// Append the name to the ownerOf array
