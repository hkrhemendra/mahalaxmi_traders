"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WithdrawalSchema } from "@/schema";
import CardWrapper from "@/components/card-wapper/card-wrapper";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/lib/getUserData";
import { toast } from 'react-hot-toast';

export default function Login() {
  const form = useForm<z.infer<typeof WithdrawalSchema>>({
    resolver: zodResolver(WithdrawalSchema),
    defaultValues: {
      amount: 0,
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
    },
  });

  const { data: session }: any = useSession();

  async function onSubmit(data: z.infer<typeof WithdrawalSchema>) {
    const user = await getUserByEmail(session?.user?.email);

    const response = await fetch(`/api/withdrawal`, {
      method: "POST",
      body: JSON.stringify({
        account_number: data.accountNumber,
        amount: data.amount,
        account_holder: data.accountHolderName,
        ifsc_code: data.ifscCode,
        user: user?._id,
      }),
    });

    if(response.status === 200) {
      toast.success('Withdrawal request has been sent successfully', {
        duration: 5000
      })
    }

  }

  return (
    <div className="flex flex-1 flex-wrap justify-center items-center h-[100vh]">
      <CardWrapper
        label="Account Details"
        backButtonHref="/wallet/"
        backButtonLabel="Wallet"
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="00" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountHolderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of Account Holder</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="0900990009990009"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ifscCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IFSC Code</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="ABCD333" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
                Submit
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
}
