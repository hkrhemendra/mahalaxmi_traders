import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { WalletDataTable } from "./wallet-table";

export default function Wallet() {
  return (
    <div className="flex flex-wrap flex-1 justify-center items-start lg:mt-10 h-screen">
      <div>
        <div className="flex flex-col lg:flex-row gap-5 flex-1 flex-wrap lg:justify-between m-5 p-5">
          <Button>
            {" "}
            <IoIosArrowBack className="me-2" /> Back{" "}
          </Button>
          <Button>
            {" "}
            <Link href="/admin/wallet/create">Create</Link>{" "}
          </Button>
        </div>
        <WalletDataTable/>
      </div>
    </div>
  );
}
