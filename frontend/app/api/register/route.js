import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // Connect to the database
    await connect();

    // Parse JSON data from the request
    const { email, password } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return new NextResponse("Email and password are required", { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Increased salt rounds for better security

    // Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Return a success response
    return new NextResponse("User is registered", { status: 200 });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error during registration:", err);

    // Return a generic error response
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
