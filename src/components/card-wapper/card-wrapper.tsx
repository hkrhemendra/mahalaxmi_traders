import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

interface CardWrapperProps {
  label: string;
  backButtonHref?: string;
  backButtonLabel?: string;
  children: React.ReactNode;
}

import { IoIosArrowBack } from "react-icons/io";

const CardWrapper = ({
  label,
  backButtonHref,
  backButtonLabel,
  children,
}: CardWrapperProps) => {
  return (
    <>
      <Card className="w-full m-5 lg:w-1/2 shadow-md">
        <CardHeader className="text-center" >
          <h3 className="font-bold text-xl">{label}</h3>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          {backButtonHref && backButtonLabel && (
            <Button className="" variant="outline">
              <Link className="flex items-center" href={backButtonHref}>
                <IoIosArrowBack className="me-2" />
                {backButtonLabel}
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default CardWrapper;
