"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from 'next-auth/react';
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
import CardWrapper from "@/components/card-wapper/card-wrapper";
import { LoginSchema } from "@/schema";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  
  const [error, setError] = useState<string>();
  const  searchParams = useSearchParams();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    console.log('Data: ', data);
    signIn('credentials', {
      ...data,
      callbackUrl: '/'
    })
  }

  useEffect(() => {

    if(searchParams.get('error')){
      setError(searchParams.get('error') ?? '')
    }

  }, [])

  return (
    <div className="flex flex-1 flex-wrap justify-center items-center h-[100vh]">
      <CardWrapper
        label="Create an account"
        backButtonHref="/"
        backButtonLabel="Home"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="*********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <FormMessage> {error} </FormMessage>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
}
