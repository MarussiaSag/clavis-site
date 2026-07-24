import { redirect } from "next/navigation";
import { AdminPanelShell } from "@/components/admin-panel-shell";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminPanelShell>{children}</AdminPanelShell>;
}
