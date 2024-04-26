import connectDB from "@/lib/connectDB";
import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import Image from "@/model/image";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const images =  await Image.find();

    return NextResponse.json({
      status: 200,
      data: images,
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
    const { image_link } = body;

    const image = await Image.create({
        image_link
    });

    return NextResponse.json({
      status: 200,
      data: image,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
