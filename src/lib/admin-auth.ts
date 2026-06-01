import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  getSessionToken,
  verifySessionToken,
} from "@/lib/admin-session";

export { ADMIN_SESSION_COOKIE, getSessionToken, verifySessionToken };

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "admin",
  };
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expected = getAdminCredentials();
  return username === expected.username && password === expected.password;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Требуется авторизация администратора.");
  }
}
