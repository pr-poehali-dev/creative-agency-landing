import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const contacts = [
  {
    icon: "Phone",
    title: "Телефон",
    value: "+7 981 863-66-99",
    href: "tel:+79818636699",
    desc: "Позвонить напрямую",
    color: "#c2410c",
    extra: { icon: "MessageSquare", label: "Отправить SMS", href: "sms:+79818636699" },
  },
  {
    icon: "Send",
    title: "Telegram",
    value: "@Izmailova8888",
    href: "https://t.me/Izmailova8888",
    desc: "Написать в Telegram",
    color: "#229ED9",
  },
  {
    icon: "Mail",
    title: "Email",
    value: "aimuselab@yandex.ru",
    href: "mailto:aimuselab@yandex.ru",
    desc: "Написать на почту",
    color: "#e84c3d",
  },
  {
    icon: "MessageCircle",
    title: "ВКонтакте",
    value: "Чат в VK",
    href: "https://vk.me/join/ExinMXV6gu/ZObtWc1dZMHNjc7rKY/k4xsU=",
    desc: "Написать в чат ВКонтакте",
    color: "#0077FF",
  },
];

export default function Contacts() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0e0603", color: "#fff" }}>
      <NavBar />

      <main className="flex-1">
        {/* Заголовок */}
        <section className="py-20 px-6 text-center">
          <div className="container mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style={{ background: "rgba(194,65,12,0.15)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.2)" }}>
              <Icon name="Phone" size={13} />
              Связаться с нами
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Контакты
            </h1>
            <p className="text-lg" style={{ color: "#9a7a65" }}>
              Выберите удобный способ — ответим быстро и с удовольствием
            </p>
          </div>
        </section>

        {/* Карточки контактов */}
        <section className="pb-24 px-6">
          <div className="container mx-auto max-w-2xl flex flex-col gap-4">
            {contacts.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-5 px-6 py-5 transition-all hover:scale-[1.01] group rounded-2xl"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${c.color}22` }}>
                    <Icon name={c.icon as "Phone"} size={26} style={{ color: c.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold mb-0.5" style={{ color: "#9a7a65" }}>{c.title}</div>
                    <div className="text-xl font-bold text-white">{c.value}</div>
                    <div className="text-sm mt-0.5" style={{ color: "#5a3d2b" }}>{c.desc}</div>
                  </div>
                  <Icon name="ChevronRight" size={20} style={{ color: "#3a2010" }} />
                </a>
                {c.extra && (
                  <div className="px-6 pb-4">
                    <a
                      href={c.extra.href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                      style={{ background: "rgba(194,65,12,0.15)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.2)" }}
                    >
                      <Icon name={c.extra.icon as "MessageSquare"} size={13} />
                      {c.extra.label}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Блок с призывом */}
        <section className="pb-24 px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(194,65,12,0.1)", border: "1px solid rgba(194,65,12,0.25)" }}>
              <Icon name="Music2" size={32} style={{ color: "#f5c97a", margin: "0 auto 16px" }} />
              <h2 className="text-2xl font-extrabold mb-2">Готовы создать вашу песню?</h2>
              <p className="mb-6" style={{ color: "#9a7a65" }}>Расскажите историю — мы превратим её в музыку</p>
              <a
                href="tel:+79818636699"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
                style={{ background: "#c2410c" }}
              >
                <Icon name="Phone" size={16} />
                Позвонить сейчас
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}