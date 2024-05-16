import connectDB from "@/lib/connectDB";
import User from "@/model/user";
import Wallet from "@/model/wallet";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("user");
    let user;
    if (userId) {
      user = await User.findById(userId);
    }

    const wallet = user
      ? await Wallet.find({ user: user?._id }).populate({
          path: "user",
          model: User,
        })
      : await Wallet.find().populate({ path: "user", model: User });

    return NextResponse.json({
      status: 200,
      data: wallet,
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
    const { invested_amount, transaction_type, user } = body;

    const wallet = await Wallet.create({
      invested_amount,
      transaction_type,
      user,
    });

    return NextResponse.json({
      status: 200,
      data: wallet,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
