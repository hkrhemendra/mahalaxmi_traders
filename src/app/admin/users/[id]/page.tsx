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
import { RegisterSchema } from "@/schema";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

export default function UserId() {
  const [user, setUser] = useState<any>({});

  let id = "";
  const pathName = usePathname();
  const pathNameArray = pathName.split("/");
  const [status, setStatus] = useState<any>();

  if (pathNameArray.length === 4) {
    id = pathNameArray[3];
  }

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      name: "",
      aadhar_number: 0,
      pan: '',
      dob: '',
    },
    values: {
      email: user?.email,
      phone: user?.phone,
      name: user?.name,
      password: "${default}$",
      aadhar_number: user?.aadhar_number,
      pan: user?.pan,
      dob: user?.dob,
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    console.log("Data ---> ", data);
    if (id === "create") {
      if (data?.password === "${default}$") {
        return setStatus(
          "Please enter new password. Default password will not work"
        );
      }
      try {
        const response = await fetch("/api/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            aadhar_number: data?.aadhar_number,
            pan: data?.pan,
            dob: data?.dob,
            ...(data?.password !== "${default}$" && {
              password: data?.password,
            }),
          }),
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.status === 200) {
          setStatus("The user has successfully registered");
        }
      } catch (error) {
        console.log("Error: ", error);
        setStatus("Something went wrong. Please try again later");
      }
    } else {
      try {
        const response = await fetch(`/api/user/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            aadhar_number: data?.aadhar_number,
            pan: data?.pan,
            dob: data?.dob,
            ...(data?.password !== "${default}$" && {
              password: data?.password,
            }),
          }),
        });

        const jsonResponse = await response.json();
        console.log("update response: ", jsonResponse);
        if (jsonResponse.status === 200) {
          setStatus("The update was successful");
        }
      } catch (error) {
        console.log("Error: ", error);
        setStatus("Something went wrong. Please try again later");
      }
    }
  }

  const getUserById = async () => {
    try {
      const response = await fetch(`/api/user/${id}`);
      const jsonResponse = await response.json();
      const [user] = jsonResponse?.data;
      setUser(user);
      console.log("JSON Response: ", jsonResponse);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  console.log("User: ", user);

  useEffect(() => {
    if (id !== "create") {
      getUserById();
    }
  }, []);

  useEffect(() => {}, [user]);

  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      <CardWrapper
        label={id === "create" ? "Create User" : "Edit User"}
        backButtonHref="/admin/users"
        backButtonLabel="Back"
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" placeholder="9999999999" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aadhar_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhar Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="344455667788" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="AAAAA0000B" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="10/10/2000" />
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
            <FormMessage>{status}</FormMessage>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
}
