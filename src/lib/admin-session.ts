/** Сессия админки — без импорта next/headers (совместимо с middleware). */

export const ADMIN_SESSION_COOKIE = "clavis_admin_session";

/** Локально (`next dev`) админка доступна без логина. В production не срабатывает. */
export function isDevAdminBypass(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getSessionToken(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "clavis-admin-dev-secret-change-me";
}

export function verifySessionToken(token: string | undefined): boolean {
  if (isDevAdminBypass()) return true;
  if (!token) return false;
  return token === getSessionToken();
}
