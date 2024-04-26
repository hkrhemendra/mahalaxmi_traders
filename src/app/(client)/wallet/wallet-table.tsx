
"use client"
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

const columns: string[] = ["Invested Amount", "Net Profit", "Net Loss"];

const data = [
  {
    id: "1",
    date: "12/12/2024",
    amount: "500",
    creditDebit: "DEBIT",
  },
  {
    id: "2",
    date: "12/12/2024",
    amount: "500",
    creditDebit: "CREDIT",
  },
];

export function WalletTable() {

  const [userId, setUserId] = useState();
  const [walletData, setWalletData] = useState<any>([]);
  const { data: session }: any = useSession();

  const updateUserId = async () => {
    const user = await getUserByEmail(session?.user?.email);
    if(user && (!user?.error || !user?.errors) ){
      setUserId(user?._id)
    }
  }

  const getWallet = async () => {
    const response = await fetch(`/api/wallet/?user=${userId}`)
    const jsonResponse = await response.json();
    console.log('Wallet: ', jsonResponse)
    if(jsonResponse?.status === 200){
      setWalletData(jsonResponse?.data);
    }
  }

  useEffect(() => {
    updateUserId();
  }, [])

  useEffect(() => {
    if(userId){
      getWallet();
    }
  }, [userId])

  return (
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
        {walletData.map((ele:any) => (
          <TableRow className="text-center" key={ele._id}>
            <TableCell className="font-medium">{ele.invested_amount}</TableCell>
            <TableCell>{ele.net_profit}</TableCell>
            <TableCell>
              {ele.net_loss}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
