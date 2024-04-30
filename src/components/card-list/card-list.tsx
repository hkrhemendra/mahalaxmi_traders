import SingleCard from "./single-card";
import { IoPersonAddSharp } from "react-icons/io5";
import { HiDocumentAdd } from "react-icons/hi";
import { RiCheckboxCircleFill } from "react-icons/ri";

const tradinAlgoList = [
  {
    name: "Momentum Trading",
    description:
      "Utilize momentum indicators to identify trends and capitalize on price movements.",
    image:
      "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Mean Reversion Trading",
    description:
      "Trade based on the assumption that prices will eventually revert to their historical averages.",
    image:
      "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Arbitage",
    description:
      "Exploit price differences of the same asset in different markets to make risk-free profits.",
    image:
      "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function CardList() {
  return (
    <div>
      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Open a Demat Account
              </h2>
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
                Open demat account seamlessly
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <IoPersonAddSharp className="text-[200px] w-full" />
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Easy Registration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Sign up for a demat account in just a few simple steps.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <HiDocumentAdd className="text-[200px] w-full" />
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Document Verification</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Securely submit and verify your documents online.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <RiCheckboxCircleFill className="text-[200px] w-full text-gray-900" />
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Quick Approval</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Experience fast approval and start trading without delays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
