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

export default function CreateWallet() {
  const [user, setUser] = useState<any>({});

  let id = "";
  const [status, setStatus] = useState<any>();

  const form = useForm<z.infer<typeof WalletSchema>>({
    resolver: zodResolver(WalletSchema),
    defaultValues: {
      email: "",
      invested_amount: 0,
      net_loss: 0,
      net_profit: 0
    },
  });

  async function onSubmit(data: z.infer<typeof WalletSchema>) {
    console.log("Data ---> ", data);

    try {
      const user: any = await getUserByEmail(data?.email);
      console.log("User ----> ", user);
      if (!user) {
        return setStatus(
          "Please enter valid email address. Given email address is not registered."
        );
      }

      const response = await fetch("/api/wallet/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invested_amount: data?.invested_amount,
          net_profit: data?.net_profit,
          net_loss: data?.net_loss,
          user: user?._id,
        }),
      });

      const jsonResponse = await response.json();
      console.log("JSON response:", jsonResponse);
      if (jsonResponse.status === 200) {
        toast.success("The wallet was successfully saved");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Something went wrong. Please try again later");
    }
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
                      <Input {...field} type="number" placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="net_profit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Profit</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="net_loss"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Loss</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="0" />
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
      </CardWrapper>
    </div>
  );
}
