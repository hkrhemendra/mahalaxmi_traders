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
import { toast } from "@/components/ui/use-toast";
import { PortfolioSchema } from "@/schema";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

export default function CreatePortfolio() {
  const [user, setUser] = useState<any>({});

  let id = "";
  const [status, setStatus] = useState<any>();

  const form:any = useForm<z.infer<typeof PortfolioSchema>>({
    resolver: zodResolver(PortfolioSchema),
    defaultValues: {
      email: "",
      stock_name: "",
      buy_price: 0,
      buy_quantity: 0,
      sell_price: 0,
      sell_quantity: 0,
      loss: 0,
      profit: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof PortfolioSchema>) {
    console.log("Data ---> ", data);

      try {

        const user:any = await getUserByEmail(data?.email)
        console.log('User ----> ', user)
        if(!user){
            return setStatus('Please enter valid email address. Given email address is not registered.');
        }

        const response = await fetch("/api/portfolio/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock_name: data?.stock_name,
            buy_price: data?.buy_price,
            buy_quantity: data?.buy_quantity,
            sell_price: data?.sell_price,
            sell_quantity: data?.sell_quantity,
            profit: data?.profit,
            loss: data?.loss,
            user: user?._id
          }),
        });

        const jsonResponse = await response.json();
        console.log("JSON response:",jsonResponse);
        if (jsonResponse.status === 200) {
          setStatus("The user has successfully registered");
        }
      } catch (error) {
        console.log("Error: ", error);
        setStatus("Something went wrong. Please try again later");
      }

  }

  const getUserByEmail = async (email: string) => {
    try {
      const response = await fetch(`/api/user/?email=${email}`);
      const jsonResponse = await response.json();

      const user = jsonResponse?.data;
      if(user){
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
        label={"Create Portfolio"}
        backButtonHref="/admin/portfolio/"
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
                name="stock_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="BANK NIFTY" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buy_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buy price</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buy_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buy Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sell_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sell price</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sell_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sell Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loss"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loss</FormLabel>
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
              Create Portfolio
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
}
