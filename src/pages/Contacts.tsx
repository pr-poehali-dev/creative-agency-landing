import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const CONTACT_URL = "https://functions.poehali.dev/9f0dc5b8-e0c8-4fea-bb5e-bbf79a9c6595";

const contacts = [
  {
    icon: "Phone",
    title: "Телефон",
    value: "+7 981 863-66-99",
    href: "tel:+79818636699",
    desc: "Позвонить напрямую",
    color: "#c2410c",
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

type Channel = "sms" | "email";

export default function Contacts() {
  const [channel, setChannel] = useState<Channel>("email");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message, channel }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setName(""); setContact(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Контакты</h1>
            <p className="text-lg" style={{ color: "#9a7a65" }}>
              Выберите удобный способ — ответим быстро и с удовольствием
            </p>
          </div>
        </section>

        {/* Карточки контактов */}
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-2xl flex flex-col gap-4">
            {contacts.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-5 px-6 py-5 rounded-2xl transition-all hover:scale-[1.02] group"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
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
            ))}
          </div>
        </section>

        {/* Срочная форма */}
        <section className="pb-24 px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(194,65,12,0.2)" }}>
                  <Icon name="Zap" size={20} style={{ color: "#f5c97a" }} />
                </div>
                <h2 className="text-2xl font-extrabold">Срочная связь</h2>
              </div>
              <p className="text-sm mb-6" style={{ color: "#9a7a65" }}>
                Отправьте сообщение напрямую — придёт SMS или письмо на почту Юлии
              </p>

              {/* Выбор канала */}
              <div className="flex gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setChannel("sms")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: channel === "sms" ? "rgba(194,65,12,0.3)" : "rgba(255,255,255,0.05)",
                    border: channel === "sms" ? "1px solid #c2410c" : "1px solid rgba(255,255,255,0.1)",
                    color: channel === "sms" ? "#f5c97a" : "#9a7a65",
                  }}
                >
                  <Icon name="MessageSquare" size={16} />
                  SMS
                </button>
                <button
                  type="button"
                  onClick={() => setChannel("email")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: channel === "email" ? "rgba(194,65,12,0.3)" : "rgba(255,255,255,0.05)",
                    border: channel === "email" ? "1px solid #c2410c" : "1px solid rgba(255,255,255,0.1)",
                    color: channel === "email" ? "#f5c97a" : "#9a7a65",
                  }}
                >
                  <Icon name="Mail" size={16} />
                  Email
                </button>
              </div>

              {status === "success" ? (
                <div className="rounded-xl py-8 text-center" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <Icon name="CheckCircle" size={40} style={{ color: "#22c55e", margin: "0 auto 12px" }} />
                  <p className="font-bold text-lg text-white">Сообщение отправлено!</p>
                  <p className="text-sm mt-1" style={{ color: "#9a7a65" }}>
                    {channel === "sms" ? "SMS отправлено на телефон Юлии" : "Письмо отправлено на почту Юлии"}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-xs underline"
                    style={{ color: "#9a7a65" }}
                  >
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#9a7a65" }}>Ваше имя</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Как к вам обращаться?"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#9a7a65" }}>
                      {channel === "sms" ? "Ваш телефон" : "Ваш email или телефон"}
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={e => setContact(e.target.value)}
                      placeholder={channel === "sms" ? "+7 900 000-00-00" : "email или телефон для ответа"}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#9a7a65" }}>Сообщение</label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Опишите вопрос или пожелание..."
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all resize-none"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                    {channel === "sms" && (
                      <p className="text-xs mt-1" style={{ color: "#5a3d2b" }}>SMS обрезается до 100 символов</p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="text-sm rounded-xl px-4 py-3" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                      Ошибка отправки. Попробуйте ещё раз или напишите напрямую.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60"
                    style={{ background: "#c2410c" }}
                  >
                    {status === "sending" ? (
                      <>
                        <Icon name="Loader" size={16} />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Icon name={channel === "sms" ? "MessageSquare" : "Mail"} size={16} />
                        {channel === "sms" ? "Отправить SMS Юлии" : "Отправить письмо Юлии"}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
