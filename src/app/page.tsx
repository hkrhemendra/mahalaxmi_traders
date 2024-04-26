import Banner from "@/components/banner/banner";
import CardList from "@/components/card-list/card-list";
import Footer from "@/components/footer/page";
import Pricing from "@/components/pricing/pricing";
import { ServicesList } from "@/components/services/services";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Banner */}
      <Banner/>
      <CardList/>
      <ServicesList/>
      <Pricing/>
      <Footer/>
    </div>
  );
}
