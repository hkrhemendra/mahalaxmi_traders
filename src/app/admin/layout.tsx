import AdminWrapper from "@/components/wapper/admin-wrapper";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AdminWrapper>{children}</AdminWrapper>
  );
}
