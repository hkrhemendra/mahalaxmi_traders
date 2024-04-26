import { Button } from "@/components/ui/button";
import { UserTable } from "./user-table";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

export default function Users() {
  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      <div>
        <div className="flex justify-between my-10">
          <Button>
            {" "}
            <IoIosArrowBack className="me-2" /> Back{" "}
          </Button>
          <Button> <Link href='/admin/users/create' >Create</Link> </Button>
        </div>
        <UserTable />
      </div>
    </div>
  );
}
