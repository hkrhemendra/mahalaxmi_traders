import connectDB from "@/lib/connectDB";
import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }){
    try {
        await connectDB();

        const user = await User.find({_id: params.id});

        return NextResponse.json({
            status: 200,
            data: user
        })

    } catch (error) {
        return NextResponse.json({
            error
        })
    }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;
  const body = await req.json();

  try {
    console.log("Body: ", body);
    const user = await User.findByIdAndUpdate(Object(id), body);
    return NextResponse.json({
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: JSON.stringify(error),
    });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string}}){
    await connectDB();
    const { id } = params;
    try {
        await User.deleteOne({_id: id})
        return NextResponse.json({
            status: 200,
            message: "Deleted successfully"
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: JSON.stringify(error),
        })
    }

}
