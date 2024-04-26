"use client";
import CardWrapper from "@/components/card-wapper/card-wrapper"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Profile() {
    const [userData, setUserData ] = useState<any>({
        name: '',
        email: '',
        phone: '',
    })

    const { data:session} = useSession<any>()
    useEffect(() => {
        const user: any = session?.user ?? {
            email: '',
            meta: {
                name: '',
                is_admin: false,
                phone: '',
            }
        };

        setUserData({
            email: user.email,
            name: user?.meta?.name,
            phone: user?.meta?.phone,
        })

    }, [session])

    return (
        <div className="flex justify-center items-center h-screen" >
            <CardWrapper label="Profile Information" >
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap justify-between" > 
                        <span className="text-lg" > Name: </span> <span>{userData?.name}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <span className="text-lg" > Email: </span> <span>{userData?.email}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <span className="text-lg" > Phone: </span> <span>{userData?.phone}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <span className="text-lg" > Aadhar Number: </span> <span>{userData?.aadhar_number}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <span className="text-lg" > PAN: </span> <span>{userData?.pan}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <span className="text-lg" > DOB: </span> <span>{userData?.dob}</span>
                    </div>
                </div>
            </CardWrapper>
        </div>
    )
}