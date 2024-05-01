/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xYHqD5MkVkT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { adminMenu, defaultMenu, menu } from "@/constants/menu";
import { Menu } from "@/type/menu";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items

  const { data: session }: any = useSession();
  useEffect(() => {
    if (session?.user) {
      setIsLogin(true);
      if (session?.user?.meta?.is_admin) {
        setIsAdmin(true);
      }
    }
  }, [session]);


  const getDesktopMenu = () => {
    if (isAdmin) {
      return (
        <>
          {adminMenu.map((item: Menu) => (
            <li
              key={item.name}
              className="p-4 font-semibold m-auto rounded-xl  cursor-pointer duration-300 "
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </>
      );
    } else if (isLogin) {
      return (
        <>
          {menu.map((item: Menu) => (
            <li
              key={item.name}
              className="p-4 font-semibold rounded-xl m-2 cursor-pointer duration-300 "
            >
              {<Link href={item.href}>{item.name}</Link>}
            </li>
          ))}
        </>
      );
    } else {
      return (
        <>
          {defaultMenu.map((item: Menu) => (
            <li
              key={item.name}
              className="p-4rounded-xl m-2 cursor-pointer duration-300 "
            >
              {<Link href={item.href}>{item.name}</Link>}
            </li>
          ))}
        </>
      );
    }
  };

  const getMobileMenu = () => {
    if (isAdmin) {
      return (
        <>
          {adminMenu.map((item: Menu) => (
            <li
              key={item.name}
              className="p-4 border-b text-gray-900 font-semibold rounded-xl  duration-300  cursor-pointer border-gray-600"
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </>
      );
    } else if (isLogin) {
      return (
        <>
          {menu.map((item: Menu) => (
            <li
              key={item.name}
              className="p-4 border-b text-gray-900 font-semibold rounded-xl  duration-300  cursor-pointer border-gray-600"
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </>
      );
    } else {
      return (
        <>
          {defaultMenu.map((item: Menu) => (
            <li
              key={item.name}
              className="p-4 text-gray-900 border-b rounded-xl  duration-300  cursor-pointer border-gray-600"
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </>
      );
    }
  };

  async function logout() {
    console.log("Logout: ");
    await signOut();
  }

  return isLogin ? (
    <div className="z-20 bg-gray-900">

      <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white bg-gray-900 border-b ">
        {/* Logo */}
        <h1 className="w-full text-2xl font-bold ">MahaLaxmi Traders</h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex">
          {getDesktopMenu()}
          <li className="p-4 rounded-xl m-2 cursor-pointer duration-300 ">
            {isAdmin || isLogin ? (
              <Button className="text-black" size="sm" variant="outline" onClick={() => logout()}>
                Sign Out
              </Button>
            ) : (
              <Button className="text-black" size="sm" variant="default">
                <Link href={"/auth/login"}>Sign In</Link>
              </Button>
            )}
          </li>
        </ul>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={
            nav
              ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r z-10 bg-white ease-in-out duration-500"
              : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
          }
        >
          {/* Mobile Logo */}
          <h1 className="w-full text-3xl font-bold text-black m-4">
            MahaLaxmi Traders
          </h1>

          {/* Mobile Navigation Items */}
          {getMobileMenu()}
          <li className="p-4  rounded-xl m-2 cursor-pointer duration-300 ">
            {isAdmin || isLogin ? (
              <Button size="sm" className="text-black" variant="outline" onClick={() => logout()}>
                Sign Out
              </Button>
            ) : (
              <Button className="text-black" size="sm" variant="default">
                <Link href={"/auth/login"}>Sign In</Link>
              </Button>
            )}
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
