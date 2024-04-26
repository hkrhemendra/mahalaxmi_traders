import { GoGraph } from "react-icons/go";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiMessageRoundedCheck } from "react-icons/bi";

const serviceList = [
  {
    name: "Market Analysis",
    description:
      "In-depth analysis of financial markets to guide your investment decisions.",
    icon: <GoGraph className="text-2xl text-white" />,
  },
  {
    name: "Global Insights",
    description:
      "Access to global trends and insights for a diversified investment strategy.",
    icon: <AiOutlineGlobal className="text-2xl text-white"  />,
  },
  {
    name: "Consultation",
    description:
      "Personalized consultancy sessions to align our strategies with your goals.",
    icon: <BiMessageRoundedCheck className="text-2xl text-white"  />,
  },
];

export function ServicesList() {
  return (
    <>
      {/* component */}
      <link
        rel="stylesheet"
        href="https://cdn.tailgrids.com/tailgrids-fallback.css"
      />
      {/* ====== Services Section Start */}
      <section className="pt-20 lg:pt-[120px] pb-12 lg:pb-[90px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="text-center mx-auto mb-12 lg:mb-20 max-w-[510px]">
                <span className="font-semibold text-lg text-purple-600 mb-2 block">
                  Our Services
                </span>
                <h2
                  className="
            font-bold
            text-3xl
            sm:text-4xl
            md:text-[40px]
            text-dark
            mb-4
            "
                >
                  What We Offer
                </h2>
                {/* <p className="text-base text-body-color">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p> */}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            {serviceList.map((ele: any) => (
              <div key={ele.name} className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div
                  className="
         p-10
         md:px-7
         xl:px-10
         rounded-[20px]
         bg-white
         shadow-md
         hover:shadow-lg
         mb-8
         "
                >
                  <div
                    className="
            w-[70px]
            h-[70px]
            flex
            items-center
            justify-center
            bg-purple-600
            rounded-2xl
            mb-8
            "
                  >
                   {ele.icon}
                  </div>
                  <h4 className="font-semibold text-xl text-dark mb-3">
                    {ele.name}
                  </h4>
                  <p className="text-body-color">
                   {ele.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ====== Services Section End */}
    </>
  );
}
