"use client";
import CardWrapper from "@/components/card-wapper/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { WalletSchema } from "@/schema";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreateWallet() {
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let id = "";
  const [status, setStatus] = useState<any>();

  const form = useForm<z.infer<typeof WalletSchema>>({
    resolver: zodResolver(WalletSchema),
    defaultValues: {
      email: "",
      invested_amount: 0,
      transaction_type: "",
    },
  });

  async function onSubmit(data: z.infer<typeof WalletSchema>) {
    
    console.log("Data ---> ", data);
    setIsLoading(true);
    try {
      const user: any = await getUserByEmail(data?.email);
      console.log("User ----> ", user);
      if (!user) {
        return toast("Please enter valid email address. Given email address is not registered.");
      }

      const response = await fetch("/api/wallet/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invested_amount: data?.invested_amount,
          transaction_type: data?.transaction_type,
          user: user?._id,
        }),
      });

      const jsonResponse = await response.json();
      console.log("JSON Creation API:", jsonResponse);
      if (jsonResponse.status === 200) {
        toast.success("The wallet was successfully saved");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Something went wrong. Please try again later");
    }
    setIsLoading(false);
  }

  const getUserByEmail = async (email: string) => {
    try {
      const response = await fetch(`/api/user/?email=${email}`);
      const jsonResponse = await response.json();

      const user = jsonResponse?.data;
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {}, [user]);

  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      <CardWrapper
        label={"Create Wallet"}
        backButtonHref="/admin/wallet/"
        backButtonLabel="Back"
      >
        {
          isLoading ? <Skeleton/> : 
          <Form {...form}>

          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="johndoe@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invested_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invested Amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="XXXXX" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transaction_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Type</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Deposit / Withdrawal" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormMessage>{status}</FormMessage>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        }
       
      </CardWrapper>
    </div>
  );
}
