"use client";
import CardWrapper from "@/components/card-wapper/card-wrapper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function QrCode() {
  const [qr, setQr] = useState();

  const getQrCodeImage = async () => {
    try {
      const response = await fetch(`/api/image`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        setQr(jsonResponse?.data?.[0]?.image_link);
      } else {
        toast.error("Something went wrong. Please contact the developer.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please contact the developer.");
    }
  };

  useEffect(() => {
    getQrCodeImage();
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5">
      {qr && (
        <div className="w-full lg:w-1/2 flex justify-center items-center" >
          <CardWrapper
            label="Deposit"
            backButtonHref="/wallet/"
            backButtonLabel="Back"
          >
            <div className="w-full flex justify-center">
              <img
                className="w-[300px]"
                src={qr}
                alt="Sorry no image available right now"
              />
            </div>
          </CardWrapper>
        </div>
      )}
    </div>
  );
}
