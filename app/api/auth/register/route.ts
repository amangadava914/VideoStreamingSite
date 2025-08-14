import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { connection, NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        // get data from request body
        const { email, password } = await request.json();

        // validate data
        if (!email || !password) {
            return NextResponse.json(
                { 
                    message: "Email and password are required"
                }, 
                { status: 400 });
        }

        // Database connection check
        await connectToDatabase();

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                {
                    message: "User already exists"
                },
                { status: 400 }
            );
        }

        // create new user
        const newUser = await User.create({ email, password });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    
    } catch (error) {
        console.log("Error in register route", error);
        return NextResponse.json(
            {
            message: "Failed to create user"
            }, 
            { status: 400 });
    }
}