const priceList = [
  {
    name: "Silver Membership",
    level: "1",
    price: "5000",
    profit: "500",
  },
  {
    name: "Gold Membership",
    level: "2",
    price: "10,000",
    profit: "1,000",
  },
  {
    name: "Platinum Membership",
    level: "3",
    price: "20,000",
    profit: "2000",
  },
];

export default function Pricing() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Membership Plans
          </h2>
          {/* <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p> */}
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* Pricing Card */}
          {priceList.map((ele: any) => (
            <div
              key={ele.name}
              className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
            >
              <h3 className="text-purple-600 mb-4 text-3xl font-semibold">{ele.name}</h3>
              <h3 className="text-purple-500 mb-4 text-3xl font-semibold">Level {ele.level}</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Daily returns of ₹{ele.profit} in trading
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">₹{ele.price}</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
