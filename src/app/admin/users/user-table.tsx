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
import { userAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

const columns: string[] = [
  "ID",
  "Name",
  "Email",
  "Phone",
  "PAN Number",
  "Aadhar Number",
  "DOB",
  "Action",
];

export function UserTable() {
  const [data, setData] = useState<any>([]);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`/api/user`);
      const jsonResponse = await response.json();
      setData(jsonResponse?.data);
      console.log("JSON Response: ", jsonResponse);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });
      const jsonResponse = await response.json();
      console.log("Delete Response: ", jsonResponse);
      if ((jsonResponse.status = 200)) {
        toast.success("Deleted Successfully");
        getAllUsers();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Table>
      <TableCaption>A list of your users</TableCaption>
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
            <TableCell className="font-medium">{ele._id}</TableCell>
            <TableCell className="font-medium">{ele.name}</TableCell>
            <TableCell>{ele.email}</TableCell>
            <TableCell className="">{ele.phone}</TableCell>
            <TableCell className="">{ele.pan}</TableCell>

            <TableCell className="">{ele.aadhar_number}</TableCell>
            <TableCell className="">{ele.dob}</TableCell>

            {/* <TableCell className="">{ele.password}</TableCell> */}
            <TableCell className="flex gap-5 justify-center">
              <Button variant={"outline"}>
                {" "}
                <Link href={`/admin/users/${ele._id}`}>
                  <CiEdit className="text-xl" />{" "}
                </Link>
              </Button>
              <Button onClick={() => deleteUser(ele._id)}>
                {" "}
                <MdDeleteOutline className="text-xl" />{" "}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
