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
import { QRImageSchema } from "@/schema";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

export default function UpdateQR() {
  const [imageId, setImageId] = useState<any>();

  let id = "";
  const [status, setStatus] = useState<any>();

  const form = useForm<z.infer<typeof QRImageSchema>>({
    resolver: zodResolver(QRImageSchema),
    defaultValues: {
      image_link: "",
    },
  });

  async function onSubmit(data: z.infer<typeof QRImageSchema>) {
    console.log("Data ---> ", data);

    try {
      let response;
      if (imageId) {
        console.log("In Patch");
        response = await fetch(`/api/image/${imageId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image_link: data?.image_link,
          }),
        });
      } else {
        console.log("In POST");
        response = await fetch("/api/image/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image_link: data?.image_link,
          }),
        });
      }

      const jsonResponse = response && (await response.json());
      console.log("JSON response:", jsonResponse);

      if (jsonResponse.status === 200) {
        toast.success("QR Code has been updated successfully");
      } else {
        toast.error("Something went wrong please try again later");
      }
    } catch (error) {
      toast.error("Something went wrong please try again later");
    }
  }

  const getQrImages = async () => {
    try {
      const response = await fetch(`/api/image`);
      const jsonResponse = await response.json();
      console.log("JSON response:", jsonResponse);
      if (response.status === 200) {
        const imageLink = jsonResponse?.data?.[0]?.image_link;
        if (imageLink) {
          setImageId(jsonResponse?.data[0]?._id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQrImages();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center w-full m-10">
      <CardWrapper
        label={"Create Portfolio"}
        backButtonHref="/admin/wallet/"
        backButtonLabel="Back"
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="image_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="https://testimage.com/jj.png"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormMessage>{status}</FormMessage>
            <Button type="submit" className="w-full">
              Update Image
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
}
