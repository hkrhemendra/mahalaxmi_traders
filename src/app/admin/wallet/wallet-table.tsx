"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import Shimmer from "@/components/simmer";

const columns: string[] = [
  "User Name",
  "Invested Amount",
  "Net Profit",
  "Net Loss",
];

export function WalletDataTable() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllWalletData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/wallet`);
      const jsonResponse = await response.json();
      setData(jsonResponse?.data);
      console.log("JSON Response: ", jsonResponse);
    } catch (error) {
      console.log("Error: ", error);
    }
    setIsLoading(false);
  };

  //   const deleteUser = async (id: string) => {
  //     try {
  //       const response = await fetch(`/api/user/${id}`, {
  //         method: 'DELETE'
  //       })
  //       const jsonResponse = await response.json();
  //       console.log('Delete Response: ', jsonResponse)
  //       if(jsonResponse.status = 200){
  //         toast.success('Deleted Successfully')
  //         getAllUsers()
  //       }
  //     } catch (error) {
  //       console.log('Error: ', error)
  //     }
  //   }

  useEffect(() => {
    getAllWalletData();
  }, []);

  return (
    <div className="overflow-x w-full">
      {isLoading ? (
        <Shimmer />
      ) : (
        <Table className="table-auto overflow w-full">
          <TableCaption>List of Wallet Data</TableCaption>
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
            {data.map((ele: any) => (
              <TableRow className="text-center" key={ele._id}>
                <TableCell>{ele?.user?.name}</TableCell>
                <TableCell>{ele.invested_amount}</TableCell>
                <TableCell className="text-green-500">
                  {ele.net_profit}
                </TableCell>
                <TableCell className="text-red-500">{ele.net_loss}</TableCell>
                {/* <TableCell className="flex gap-5 justify-center">
                <Button variant={"outline"}>
                  {" "}
                  <Link href={`/admin/users/${ele._id}`} ><CiEdit className="text-xl" />{" "}</Link>
                </Button>
                <Button>
                  {" "}
                  <MdDeleteOutline className="text-xl" />{" "}
                </Button>
              </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
