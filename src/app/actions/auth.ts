"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  getSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export type AdminLoginState = { error?: string } | null;

export async function adminLoginAction(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminCredentials(username, password)) {
    return { error: "Неверный логин или пароль." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, getSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  const from = String(formData.get("from") ?? "").trim();
  redirect(from.startsWith("/admin") && from !== "/admin/login" ? from : "/admin/basics");
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
