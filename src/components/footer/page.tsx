export default function Footer() {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <a
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Mahalaxmi Traders
            </span>
          </a>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-800">
              Mahalaxmi Traders is a well-known trading company that operates in
              multiple sectors, including agriculture, textiles, and consumer
              goods. With a strong presence in the market, Mahalaxmi Traders has
              built a reputation for reliability, quality products, and
              excellent customer service.
            </p>
            <p className="mt-4 text-sm text-gray-800">
              In addition to their core trading activities, Mahalaxmi Traders
              also provides value-added services such as logistics, warehousing,
              and product customization, further enhancing their offerings and
              ensuring a seamless experience for their clients.
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900">
            Contacts
          </p>
          <div className="flex">
            <p className="mr-1 text-gray-800">Email:</p>
            <a
              href="mailto:info@lorem.mail"
              aria-label="Our email"
              title="Our email"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              support@mahalaxmitrader.com
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Address:</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our address"
              title="Our address"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Gamdevi road andheri east mumbai
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
