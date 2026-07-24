import { AdminPageHeader } from "@/components/admin-panel-shell";
import { prisma } from "@/lib/prisma";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
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
          <div className="space-y-3">
            {inquiries.map((inquiry) => (
              <article key={inquiry.id} className="space-y-1 border border-[#a38d83] bg-white/40 p-4">
                <p className="font-semibold text-[#151210]">{inquiry.name}</p>
                <p className="text-sm text-[#4d131a]/80">{inquiry.email}</p>
                {inquiry.phone ? <p className="text-sm text-[#4d131a]/80">{inquiry.phone}</p> : null}
                <p className="text-[#2a2420]">{inquiry.message}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
