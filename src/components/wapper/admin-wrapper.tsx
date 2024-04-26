"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<any>(null);
  const router = useRouter();
  const { data: session } = useSession<any>();
  useEffect(() => {
    const user: any = session?.user ?? {
      email: "",
      meta: {
        name: "",
        is_admin: false,
        phone: "",
      },
    };
    console.log('User', user);
    setIsAdmin(user?.meta?.is_admin);
  }, [session]);

  if (!isAdmin && isAdmin !== null) {
    router.replace("/auth/login?error=Need Admin Account to Access Path");
  }

  return <div>{children}</div>;
}
