"use client";
import Shimmer from "@/components/simmer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserByEmail } from "@/lib/getUserData";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const columns: string[] = ["Invested Amount", "Transaction Type", "TimeStamp"];

export function WalletTable() {
  const [userId, setUserId] = useState();
  const [walletData, setWalletData] = useState<any>([]);
  const { data: session }: any = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUserId = async () => {
    const user = await getUserByEmail(session?.user?.email);
    if (user && (!user?.error || !user?.errors)) {
      setUserId(user?._id);
    }
  };

  const getWallet = async () => {
    setIsLoading(true);
    try {
      console.log('UserID: ', userId)
      const response = await fetch(`/api/wallet/?user=${userId}`);
      const jsonResponse = await response.json();
      console.log("Wallet: ", jsonResponse);
      if (jsonResponse?.status === 200) {
        setWalletData(jsonResponse?.data);
      }
    } catch (error) {
      console.log('Error: ', error)
    }
    setIsLoading(false);
  };

  useEffect(() => {
    updateUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getWallet();
    }
  }, [userId]);

  return isLoading ? (
    <Shimmer />
  ) : (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow className="text-center">
          {columns.map((column: string) => (
            <TableHead key={column} className="text-center w-[100px]">
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {walletData.map((ele: any) => (
          <TableRow className="text-center" key={ele._id}>
            <TableCell className="font-medium">{ele.invested_amount}</TableCell>
            <TableCell>{ele?.transaction_type}</TableCell>
            <TableCell>{ele.createdAt.split('T')[0]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
