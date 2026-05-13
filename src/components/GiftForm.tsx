import { useState } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/9f0dc5b8-e0c8-4fea-bb5e-bbf79a9c6595";

const GIFTS = [
  { id: "track", label: "Умный трек «Активация силы»", emoji: "🎵", desc: "уникальная разработка MuseLab" },
  { id: "sms", label: "Музыкальное SMS «Доброе утро»", emoji: "☀️", desc: "" },
];

export default function GiftForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [reason, setReason] = useState("");
  const [gift, setGift] = useState("track");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.trim()) return;
    setStatus("loading");

    const giftLabel = GIFTS.find(g => g.id === gift)?.label ?? gift;
    const message = `Подарок: ${giftLabel}\nПовод/цель: ${reason || "не указан"}\nКонтакт для отправки: ${contact}`;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Гость",
          contact,
          message,
          channel: "email",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">🎁</div>
        <h3 className="text-2xl font-extrabold mb-2" style={{ color: "#f6f1ff" }}>Подарок уже летит к вам!</h3>
        <p className="text-base" style={{ color: "rgba(196,181,253,0.7)" }}>
          Юлия отправит его в ближайшее время на указанный контакт.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Имя */}
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "rgba(196,181,253,0.8)" }}>
          Имя <span style={{ color: "rgba(196,181,253,0.4)" }}>(необязательно)</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Как вас зовут?"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(168,85,247,0.25)",
            color: "#f6f1ff",
          }}
        />
      </div>

      {/* Контакт */}
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "rgba(196,181,253,0.8)" }}>
          Telegram / WhatsApp / почта <span style={{ color: "#ec4899" }}>*</span>
        </label>
        <input
          type="text"
          value={contact}
          onChange={e => setContact(e.target.value)}
          placeholder="@ник или email"
          required
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(168,85,247,0.25)",
            color: "#f6f1ff",
          }}
        />
      </div>

      {/* Повод */}
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "rgba(196,181,253,0.8)" }}>
          Что привело вас сегодня?
        </label>
        <input
          type="text"
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Хочу подарить песню маме, ищу подарок на свадьбу..."
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(168,85,247,0.25)",
            color: "#f6f1ff",
          }}
        />
      </div>

      {/* Выбор подарка */}
      <div>
        <label className="block text-sm font-semibold mb-3" style={{ color: "rgba(196,181,253,0.8)" }}>
          Выберите подарок
        </label>
        <div className="flex flex-col gap-2">
          {GIFTS.map(g => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGift(g.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
              style={{
                background: gift === g.id ? "rgba(168,85,247,0.18)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${gift === g.id ? "rgba(168,85,247,0.5)" : "rgba(168,85,247,0.15)"}`,
              }}
            >
              <span className="text-xl shrink-0">{g.emoji}</span>
              <div>
                <span className="text-sm font-semibold" style={{ color: "#f6f1ff" }}>{g.label}</span>
                {g.desc && <span className="text-xs ml-1" style={{ color: "rgba(196,181,253,0.5)" }}>({g.desc})</span>}
              </div>
              <div
                className="ml-auto w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center"
                style={{ borderColor: gift === g.id ? "#a855f7" : "rgba(168,85,247,0.3)" }}
              >
                {gift === g.id && <div className="w-2 h-2 rounded-full" style={{ background: "#a855f7" }} />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Кнопка */}
      <button
        type="submit"
        disabled={status === "loading" || !contact.trim()}
        className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-105 flex items-center justify-center gap-2"
        style={{
          background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
          boxShadow: "0 0 24px rgba(168,85,247,0.35)",
          opacity: !contact.trim() ? 0.6 : 1,
        }}
      >
        {status === "loading" ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Icon name="Gift" size={18} />
            Забрать подарок
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-center text-sm" style={{ color: "rgba(236,72,153,0.8)" }}>
          Что-то пошло не так — напишите нам напрямую в Telegram
        </p>
      )}
    </form>
  );
}
