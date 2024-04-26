import { Button } from "@/components/ui/button";
import { PortfolioDataTable } from "./portfolio-table";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

export default function Portfolio() {
  return (
    <div className="flex justify-center items-start lg:items-center h-screen">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-5 flex-1 flex-wrap lg:justify-between m-5 p-5">
          <Button>
            {" "}
            <IoIosArrowBack className="me-2" /> Back{" "}
          </Button>
          <Button>
            {" "}
            <Link href="/admin/portfolio/create">Create</Link>{" "}
          </Button>
        </div>
        <PortfolioDataTable />
      </div>
    </div>
  );
}
