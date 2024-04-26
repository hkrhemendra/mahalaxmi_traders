"use client";
import { useEffect, useState } from "react";
import UpdateQr from "./update_qr";
import toast from "react-hot-toast";

export default function QrImage() {
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
  }, [])

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center gap-5 lg:items-center">
      {
        qr && (
            <div className="w-full flex justify-center">
                <img className="w-[300px]" src={qr} alt="Sorry no image available right now"/>
            </div>
        )
      }
      <div className="w-full flex justify-center" >
        <UpdateQr />
      </div>
    </div>
  );
}
