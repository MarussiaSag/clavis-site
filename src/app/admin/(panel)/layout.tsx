import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return children;
}
