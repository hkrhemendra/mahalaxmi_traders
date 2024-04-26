import { Menu } from "@/type/menu";

export const menu: Menu[] = [
  {
    name: "Live",
    href: "https://in.tradingview.com/chart/?symbol=NSE%3ANIFTY",
  },
  {
    name: "Portfolio",
    href: "/portfolio",
  },
  {
    name: "Wallet",
    href: "/wallet",
  },
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "Download App",
    href: "",
  },
];

export const adminMenu: Menu[] = [
  {
    name: "Users",
    href: "/admin/users",
  },
  {
    name: "Portfolio",
    href: "/admin/portfolio",
  },
  {
    name: "Wallet",
    href: "/admin/wallet",
  },
  {
    name: "QR Code",
    href: "/admin/qr_image",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];
