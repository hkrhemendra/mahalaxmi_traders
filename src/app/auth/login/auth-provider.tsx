'use client';

import { userAtom } from "@/store";
import { useAtom } from "jotai";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function AuthProvider({
    children,
    session,
}: {
    children: React.ReactNode;
    session: any;
}): React.ReactNode{
   
    return <SessionProvider session={session} >{children}</SessionProvider>
}