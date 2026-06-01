"use client";

import { useActionState } from "react";
import { adminLoginAction, type AdminLoginState } from "@/app/actions/auth";

const initial: AdminLoginState = null;

type AdminLoginFormProps = {
  redirectFrom?: string;
};

export function AdminLoginForm({ redirectFrom }: AdminLoginFormProps) {
  const [state, formAction, isPending] = useActionState(adminLoginAction, initial);

  return (
    <form action={formAction} className="space-y-4">
      {redirectFrom ? <input type="hidden" name="from" value={redirectFrom} /> : null}
      {state?.error ? (
        <p className="rounded border border-[#751f26] bg-[#f4f1ed] px-4 py-3 text-sm text-[#4d131a]">
          {state.error}
        </p>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="admin-username" className="text-xs uppercase tracking-[0.2em] text-[#4d131a]/80">
          Логин
        </label>
        <input
          id="admin-username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="w-full border border-[#a38d83] bg-[#f4f1ed] px-4 py-3"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="admin-password" className="text-xs uppercase tracking-[0.2em] text-[#4d131a]/80">
          Пароль
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full border border-[#a38d83] bg-[#f4f1ed] px-4 py-3"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#751f26] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#f4f1ed] transition-colors hover:bg-[#4d131a] disabled:opacity-60"
      >
        {isPending ? "Вход…" : "Войти"}
      </button>
    </form>
  );
}
