import connectDB from "@/lib/connectDB";
import User from "@/model/user";
import Wallet from "@/model/wallet";
import Withdrawal from "@/model/withdrawal";
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

    const withdrawal = user
      ? await Withdrawal.find({ user: user?._io }).populate({
          path: "user",
          model: User,
        })
      : await Withdrawal.find().populate({ path: "user", model: User });

    return NextResponse.json({
      status: 200,
      data: withdrawal,
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
    const { account_holder, account_number, amount, ifsc_code, user } = body;
    const withdrawal = await Withdrawal.create({
      account_holder,
      account_number,
      amount,
      ifsc_code,
      user,
    });

    return NextResponse.json({
      status: 200,
      data: withdrawal,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
