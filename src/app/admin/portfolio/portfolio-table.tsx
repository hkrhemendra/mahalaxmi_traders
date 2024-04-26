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

const columns: string[] = [
  "Date",
  "User Name",
  "Stock Name",
  "Buy Price",
  "Buy Quantity",
  "Sell Price",
  "Sell Quantity",
  "Profit",
  "Loss",
];

export function PortfolioDataTable() {
  const [data, setData] = useState<any>([]);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`/api/portfolio`);
      const jsonResponse = await response.json();
      setData(jsonResponse?.data);
      console.log("JSON Response: ", jsonResponse);
    } catch (error) {
      console.log("Error: ", error);
    }
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
    getAllUsers();
  }, []);

  return (
    <div className="overflow-x w-full">
      <Table className="table-auto overflow-scroll w-full" >
        <TableCaption>List of Portfolio</TableCaption>
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
              <TableCell className="font-medium">
                {ele.date?.split("T")[0]}
              </TableCell>
              <TableCell>{ele?.user?.name}</TableCell>
              <TableCell>{ele.stock_name}</TableCell>
              <TableCell className="">{ele.buy_price}</TableCell>
              <TableCell className="">{ele.buy_quantity}</TableCell>
              <TableCell className="">{ele.sell_price}</TableCell>
              <TableCell className="">{ele.sell_quantity}</TableCell>
              <TableCell className="">{ele.profit ?? 0}</TableCell>
              <TableCell className="">{ele.loss ?? 0}</TableCell>

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
    </div>
  );
}
