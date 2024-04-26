import connectDB from "@/lib/connectDB";
import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = req.nextUrl;
    const email = searchParams.get("email");

    const allUsers = email
      ? await User.findOne({ email: email })
      : await User.find();

    return NextResponse.json({
      status: 200,
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: any = await req.json();
    console.log("Body: ", body);
    const { name, email, phone, password, is_admin, aadhar_number, pan, dob } =
      body;

    const hashPassword = await bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      is_admin,
      aadhar_number,
      pan,
      dob,
      password: hashPassword,
    });

    return NextResponse.json({
      status: 200,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
