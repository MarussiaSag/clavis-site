import { createInquiry } from "@/app/actions";
import { SiteHeader } from "@/components/site-header";

export default function ContactsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="grid w-full gap-12 px-6 py-14 md:grid-cols-2 md:px-10">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-[#4d131a]/80">Контакты</p>
          <h1 className="text-5xl">Обсудим ваш проект</h1>
          <p className="text-[#4d131a]/85">
            Заполните форму, и я свяжусь с вами с идеями по планировке, стилю и
            бюджету.
          </p>
        </section>
        <form action={createInquiry} className="space-y-4 border border-[#a38d83] p-6">
          <input
            name="name"
            placeholder="Имя"
            required
            className="w-full border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
          />
          <input
            name="phone"
            placeholder="Телефон"
            className="w-full border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
          />
          <textarea
            name="message"
            placeholder="Расскажите о задаче"
            required
            rows={5}
            className="w-full border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
          />
          <button
            type="submit"
            className="w-full bg-[#751f26] px-4 py-3 text-sm uppercase tracking-[0.15em] text-[#e7d8d1] hover:bg-[#4d131a]"
          >
            Отправить заявку
          </button>
        </form>
      </main>
    </div>
  );
}
