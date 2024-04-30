"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Navbar from "../navbar/navbar";
import CardList from "../card-list/card-list";
import Footer from "../footer/page";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function HomeComponent() {
  const [isLogin, setIsLogin] = useState(false);

  const { data: session }: any = useSession();
  useEffect(() => {
    if (session?.user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [session]);

  return (
    <>
      <main>
        <section className="bg-gray-900 py-20 text-gray-50">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 md:px-6 lg:flex-row lg:items-start lg:gap-12">
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Unlock Your Trading Potential
              </h1>
              <p className="max-w-md text-lg">
                Discover the power of our comprehensive trading services and
                take your financial journey to new heights.
              </p>
              {!isLogin ? (
                <Button size="lg" variant="default">
                  <Link href={"/auth/login"}>Get Started</Link>
                </Button>
              ) : (
                <></>
              )}
            </div>
            <img
              alt="Hero Image"
              className="aspect-video w-full max-w-md rounded-lg object-cover lg:max-w-none"
              height="400"
              src="https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width="600"
            />
          </div>
        </section>
        
        <section className="bg-gray-100 py-20 dark:bg-gray-800" id="services">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Explore our comprehensive range of trading services.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-950 dark:text-gray-50">
                <ViewIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-semibold">Market Analysis</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive in-depth market analysis and insights to make informed
                  trading decisions.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-950 dark:text-gray-50">
                <ViewIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-semibold">Portfolio Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Optimize your portfolio and manage your investments with our
                  expert guidance.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-950 dark:text-gray-50">
                <ViewIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-semibold">Risk Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Implement effective risk management strategies to protect your
                  trading capital.
                </p>
              </div>
            </div>
          </div>
        </section>


        <section className="bg-gray-900 py-20 text-gray-50" id="pricing">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Pricing
              </h2>
              <p className="mt-2 text-gray-400">
                Choose the plan that best suits your trading needs.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Silver</CardTitle>
                  <CardDescription>
                    Perfect for individual traders.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">₹15000</div>
                  <p className="text-gray-400">per month</p>
                  <ul className="space-y-2 text-gray-400">
                    <li>Market analysis</li>
                    <li>Portfolio tracking</li>
                    <li>Email support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Gold</CardTitle>
                  <CardDescription>Ideal for active traders.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">₹25000</div>
                  <p className="text-gray-400">per month</p>
                  <ul className="space-y-2 text-gray-400">
                    <li>Market analysis</li>
                    <li>Portfolio tracking</li>
                    <li>Risk management</li>
                    <li>Priority support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Platinum</CardTitle>
                  <CardDescription>
                    Tailored for institutional traders.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">₹35000</div>
                  <p className="text-gray-400">per month</p>
                  <ul className="space-y-2 text-gray-400">
                    <li>Market analysis</li>
                    <li>Portfolio tracking</li>
                    <li>Risk management</li>
                    <li>Dedicated account manager</li>
                    <li>Advanced analytics</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <CardList />
      </main>
      <Footer />
    </>
  );
}

function ViewIcon(props: any) {
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
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  );
}
