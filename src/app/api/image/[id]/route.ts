import connectDB from "@/lib/connectDB";
import Image from "@/model/image";
import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;
  const body = await req.json();

  try {
    console.log("Body: ", body);
    const image = await Image.findByIdAndUpdate(Object(id), body);
    return NextResponse.json({
      status: 200,
      data: image,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: JSON.stringify(error),
    });
  }
}