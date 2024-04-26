import { Button } from "@/components/ui/button";
import { WalletTable } from "./wallet-table";
import Link from "next/link";

export default function Wallet() {
  return (
    <div className="flex flex-wrap h-screen justify-center items-start lg:items-center p-5 m-5">
      <div className="w-full" >
        <div className="flex flex-col gap-5 lg:flex-row flex-1 flex-wrap lg:justify-between my-5 ">
          <Button><Link href={'/wallet/withdrawal'}>Withdrawal</Link></Button>
          <Button> <Link href={'/deposit'} >Deposit</Link> </Button>
        </div>
        <WalletTable />
      </div>
    </div>
  );
}
