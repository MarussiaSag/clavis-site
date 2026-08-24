import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminPanelShell } from "@/components/admin-panel-shell";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

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
