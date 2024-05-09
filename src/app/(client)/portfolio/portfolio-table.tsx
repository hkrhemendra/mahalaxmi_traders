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

const columns: string[] = [
  "Stock Name",
  "Buy Price",
  "Buy Quantity",
  "Sell Price",
  "Sell Quantity",
  "Profit",
  "Loss",
];

export function PortfolioTable() {
  const [userId, setUserId] = useState();
  const [portfolioData, setPortfolioData] = useState<any>([]);
  const { data: session }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const updateUserId = async () => {
    console.log("Session: ", session);
    const user = await getUserByEmail(session?.user?.email);
    console.log("User: ", user);
    if (user && (!user?.error || !user?.errors)) {
      setUserId(user?._id);
    }
  };

  const getPortfolio = async () => {
    setIsLoading(true);
    try {
      console.log('UserID: ', userId)
      const response = await fetch(`/api/portfolio/?user=${userId}`);
      const jsonResponse = await response.json();
      console.log("Portfolio: ", jsonResponse);
      if (jsonResponse?.status === 200) {
        setPortfolioData(jsonResponse?.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    updateUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getPortfolio();
    }
  }, [userId]);

  return isLoading ? (
    <Shimmer />
  ) : (
    <Table>
      <TableCaption>A list of your recent trades.</TableCaption>
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
        {portfolioData.map((ele: any) => (
          <TableRow className="text-center" key={ele._id}>
            <TableCell className="font-medium">{ele?.stock_name}</TableCell>
            <TableCell>{ele?.buy_price}</TableCell>
            <TableCell>{ele?.buy_quantity}</TableCell>
            <TableCell>{ele?.sell_price}</TableCell>
            <TableCell>{ele?.sell_quantity}</TableCell>
            <TableCell className="text-green-500">{ele?.profit}</TableCell>
            <TableCell className="text-red-500">{ele?.loss}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
