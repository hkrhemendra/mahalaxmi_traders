import connectDB from "@/lib/connectDB";
import Portfolio from "@/model/portfolio";
import User from "@/model/user";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        await connectDB();
        const { searchParams } = req.nextUrl;
        const userId = searchParams.get('user'); 
        let user;
        if(userId){
            user = await User.findById(new ObjectId(userId));
        }

        console.log('User: ', user)

        const portfolio = user ? await Portfolio.find({user:user?._id}).populate({path: 'user', model: User}) : await Portfolio.find().populate({path: 'user', model: User});

        return NextResponse.json({
            status: 200,
            data: portfolio
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error
        })
    }
}


export async function POST(req: NextRequest){
    try{
        await connectDB();

        const body: any =await req.json();
        console.log('Body: ',body)
        const { stock_name, 
            buy_price, 
            buy_quantity, 
            sell_price, 
            sell_quantity, 
            profit, 
            user } = body;

        // const hashPassword = await bcrypt.hashSync(password, 10);

        const portfolio = await Portfolio.create({
            stock_name, 
            buy_price, 
            buy_quantity, 
            sell_price, 
            sell_quantity, 
            profit, 
            user 
        })

        return NextResponse.json({
            status: 200,
            data: portfolio
        })

    }catch(error){
        return NextResponse.json({
            error
        })
    }
}

