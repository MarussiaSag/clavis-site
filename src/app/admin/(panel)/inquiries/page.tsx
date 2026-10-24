import { clearAllInquiriesAction, deleteInquiryAction } from "@/app/actions";
import { AdminPageHeader } from "@/components/admin-panel-shell";
import { prisma } from "@/lib/prisma";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <>
      <AdminPageHeader
        title="Заявки"
        description="Сообщения с формы на странице контактов."
      />
      <section className="space-y-4">
        {inquiries.length === 0 ? (
          <p className="text-[#4d131a]/80">Пока заявок нет.</p>
        ) : (
          <>
            <form action={clearAllInquiriesAction}>
              <button
                type="submit"
                className="border border-[#751f26] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#751f26] transition-colors hover:bg-[#751f26] hover:text-[#f4f1ed]"
              >
                Удалить все ({inquiries.length})
              </button>
            </form>
            <div className="space-y-3">
              {inquiries.map((inquiry) => (
                <article
                  key={inquiry.id}
                  className="flex flex-col gap-3 border border-[#a38d83] bg-white/40 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="font-semibold text-[#151210]">{inquiry.name}</p>
                    <p className="text-sm text-[#4d131a]/80">{inquiry.email}</p>
                    {inquiry.phone ? (
                      <p className="text-sm text-[#4d131a]/80">{inquiry.phone}</p>
                    ) : null}
                    <p className="whitespace-pre-wrap break-words text-[#2a2420]">{inquiry.message}</p>
                    <p className="text-[11px] text-[#8a8a8a]">
                      {inquiry.createdAt.toLocaleString("ru-RU")}
                    </p>
                  </div>
                  <form action={deleteInquiryAction} className="shrink-0">
                    <input type="hidden" name="id" value={inquiry.id} />
                    <button
                      type="submit"
                      className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#751f26] transition-colors hover:text-[#3d0d0a]"
                    >
                      Удалить
                    </button>
                  </form>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
