import { AdminLoginForm } from "@/components/admin-login-form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f1ed] px-6 py-12">
      <div className="w-full max-w-md space-y-8 border border-[#a38d83] bg-[#fafafa] p-8 md:p-10">
        <header className="space-y-2 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#b07d55]">
            Clavis
          </p>
          <h1 className="font-serif text-3xl text-[#151210]">Вход в админку</h1>
        </header>
        <AdminLoginForm redirectFrom={from} />
      </div>
    </div>
  );
}
