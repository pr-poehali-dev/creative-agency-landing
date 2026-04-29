import { useState } from "react";
import Icon from "@/components/ui/icon";

interface CalcState {
  urgent: boolean | null;
  ownVoice: boolean | null;
  rights: boolean | null;
  publication: boolean | null;
  liveVocal: boolean | null;
  lyricVideo: boolean | null;
  artistProject: boolean | null;
}

const GIFT_EMOJI = "🎁";

function calcPrice(s: CalcState): { base: number; total: number; lines: string[] } {
  const lines: string[] = [];
  let base = 5000;
  lines.push("Стандарт (текст + аранжировка) — 5 000 ₽");

  if (s.ownVoice) {
    base += 2000;
    lines.push("+ Ваш голос в треке — 2 000 ₽");
  }
  if (s.rights) {
    base += 4900;
    lines.push("+ Передача авторских прав — 4 900 ₽");
  }
  if (s.publication) {
    base += 5000;
    lines.push("+ Публикация в Яндекс Музыке / VK — 5 000 ₽");
  }
  if (s.liveVocal) {
    base += 20900;
    lines.push("+ Живой вокал вокалиста — 20 900 ₽");
  }
  if (s.lyricVideo) {
    base += 3000;
    lines.push("+ Лирик-видео — от 3 000 ₽");
  }
  if (s.artistProject) {
    base += 55000;
    lines.push("+ Стать артистом под ключ — от 55 000 ₽");
  }

  let total = base;
  if (s.urgent) {
    total = Math.round(base * 1.5);
  }

  return { base, total, lines };
}

interface Props {
  onClose?: () => void;
  inline?: boolean;
}

export default function OrderCalculator({ onClose, inline }: Props) {
  const [step, setStep] = useState<"urgent" | "options" | "form" | "done">("urgent");
  const [state, setState] = useState<CalcState>({
    urgent: null,
    ownVoice: null,
    rights: null,
    publication: null,
    liveVocal: null,
    lyricVideo: null,
    artistProject: null,
  });
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const urgentBlocked = state.urgent && (state.liveVocal || state.publication);

  function toggleOption(key: keyof CalcState, value: boolean) {
    setState((prev) => {
      const next = { ...prev, [key]: prev[key] === value ? null : value };
      // При срочности отключаем несовместимые опции
      if (next.urgent) {
        next.liveVocal = false;
        next.publication = false;
      }
      return next;
    });
  }

  const { base, total, lines } = calcPrice(state);
  const hasUrgent = state.urgent === true;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const text = [
        `Новая заявка с калькулятора!`,
        `Имя: ${form.name}`,
        `Телефон: ${form.phone}`,
        ``,
        `Выбранные опции:`,
        ...lines,
        hasUrgent ? `⚡ СРОЧНО (2-3 часа) +50%` : `Срок: стандартный 2-3 дня`,
        ``,
        `Итого: ${total.toLocaleString("ru")} ₽`,
        form.comment ? `\nКомментарий: ${form.comment}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      // Попытка отправить через бэкенд
      const resp = await fetch("/api/contact-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, message: text }),
      }).catch(() => null);

      // Если нет бэкенда — открываем Telegram с текстом
      if (!resp || !resp.ok) {
        window.open(
          `https://t.me/izmailova8888?text=${encodeURIComponent(text)}`,
          "_blank"
        );
      }
      setStep("done");
    } finally {
      setSubmitting(false);
    }
  }

  const wrap = inline
    ? "w-full"
    : "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm";

  const card = inline
    ? "w-full rounded-3xl overflow-hidden"
    : "w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto";

  return (
    <div className={wrap} onClick={!inline && onClose ? (e) => e.target === e.currentTarget && onClose() : undefined}>
      <div className={card} style={{ background: "linear-gradient(160deg, #1A0533 0%, #0D1B4B 100%)", border: "1px solid rgba(168,85,247,0.3)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4" style={{ borderBottom: "1px solid rgba(168,85,247,0.15)" }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#C084FC" }}>Калькулятор стоимости</p>
            <h2 className="text-xl font-extrabold text-white">Рассчитайте цену и получите подарок {GIFT_EMOJI}</h2>
          </div>
          {!inline && onClose && (
            <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center transition hover:bg-white/10" style={{ color: "#C084FC" }}>
              <Icon name="X" size={20} />
            </button>
          )}
        </div>

        <div className="px-6 py-6">

          {/* ШАГИ */}
          {step !== "done" && (
            <div className="flex gap-2 mb-6">
              {["urgent", "options", "form"].map((s, i) => (
                <div key={s} className="flex-1 h-1.5 rounded-full transition-all" style={{ background: ["urgent", "options", "form"].indexOf(step) >= i ? "linear-gradient(90deg,#A855F7,#EC4899)" : "rgba(168,85,247,0.2)" }} />
              ))}
            </div>
          )}

          {/* ШАГ 1 — Срочность */}
          {step === "urgent" && (
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Как быстро нужна песня?</h3>
              <p className="text-sm mb-5" style={{ color: "rgba(196,181,253,0.7)" }}>От этого зависит итоговая стоимость</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => { setState(p => ({ ...p, urgent: false })); setStep("options"); }}
                  className="flex flex-col items-start p-4 rounded-2xl text-left transition-all hover:scale-105"
                  style={{ background: "rgba(168,85,247,0.1)", border: "1.5px solid rgba(168,85,247,0.3)", color: "#F6F1FF" }}
                >
                  <span className="text-2xl mb-2">📅</span>
                  <span className="font-bold text-white text-base">Стандарт</span>
                  <span className="text-sm mt-1" style={{ color: "rgba(196,181,253,0.7)" }}>2–3 дня</span>
                  <span className="text-sm font-semibold mt-2" style={{ color: "#C084FC" }}>от 5 000 ₽</span>
                </button>
                <button
                  onClick={() => { setState(p => ({ ...p, urgent: true, liveVocal: false, publication: false })); setStep("options"); }}
                  className="flex flex-col items-start p-4 rounded-2xl text-left transition-all hover:scale-105"
                  style={{ background: "rgba(236,72,153,0.1)", border: "1.5px solid rgba(236,72,153,0.4)", color: "#F6F1FF" }}
                >
                  <span className="text-2xl mb-2">⚡</span>
                  <span className="font-bold text-white text-base">Срочно</span>
                  <span className="text-sm mt-1" style={{ color: "rgba(196,181,253,0.7)" }}>2–3 часа</span>
                  <span className="text-sm font-semibold mt-2" style={{ color: "#F472B6" }}>+50% к цене</span>
                </button>
              </div>
              {hasUrgent && (
                <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.3)", color: "#FCA5A5" }}>
                  ⚡ При срочном заказе живой вокал и публикация недоступны — только стандарт и ваш голос.
                </div>
              )}
            </div>
          )}

          {/* ШАГ 2 — Опции */}
          {step === "options" && (
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Выберите опции</h3>
              <p className="text-sm mb-5" style={{ color: "rgba(196,181,253,0.7)" }}>Можно несколько. Цена пересчитается автоматически.</p>

              <div className="space-y-3 mb-6">
                {[
                  {
                    key: "ownVoice" as keyof CalcState,
                    icon: "Mic",
                    label: "Ваш голос в треке",
                    desc: "Присылаете голос — он звучит в вашей песне",
                    price: "+2 000 ₽",
                    disabled: false,
                  },
                  {
                    key: "rights" as keyof CalcState,
                    icon: "FileCheck",
                    label: "Передача авторских прав",
                    desc: "Для рекламы, бизнеса, коммерческого использования",
                    price: "+4 900 ₽",
                    disabled: false,
                  },
                  {
                    key: "publication" as keyof CalcState,
                    icon: "Radio",
                    label: "Публикация в Яндекс Музыке / VK",
                    desc: "Официальный релиз на стриминговых платформах",
                    price: "+5 000 ₽",
                    disabled: !!state.urgent,
                    disabledNote: "Недоступно при срочном заказе",
                  },
                  {
                    key: "liveVocal" as keyof CalcState,
                    icon: "Music2",
                    label: "Живой вокал вокалиста",
                    desc: "Профессиональный певец запишет вашу песню",
                    price: "+20 900 ₽",
                    disabled: !!state.urgent,
                    disabledNote: "Недоступно при срочном заказе",
                  },
                  {
                    key: "lyricVideo" as keyof CalcState,
                    icon: "Video",
                    label: "Лирик-видео",
                    desc: "Красивое видео с текстом для соцсетей",
                    price: "от +3 000 ₽",
                    disabled: false,
                  },
                  {
                    key: "artistProject" as keyof CalcState,
                    icon: "Star",
                    label: "Стать артистом под ключ",
                    desc: "Бренд, релизы, дистрибуция, развитие",
                    price: "от +55 000 ₽",
                    disabled: false,
                  },
                ].map((opt) => {
                  const active = state[opt.key] === true;
                  return (
                    <button
                      key={opt.key}
                      disabled={opt.disabled}
                      onClick={() => !opt.disabled && toggleOption(opt.key, true)}
                      className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
                      style={{
                        background: opt.disabled ? "rgba(255,255,255,0.03)" : active ? "rgba(168,85,247,0.18)" : "rgba(255,255,255,0.06)",
                        border: `1.5px solid ${opt.disabled ? "rgba(255,255,255,0.08)" : active ? "#A855F7" : "rgba(168,85,247,0.25)"}`,
                        opacity: opt.disabled ? 0.45 : 1,
                        cursor: opt.disabled ? "not-allowed" : "pointer",
                      }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: active ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.07)" }}>
                        <Icon name={opt.icon as "Mic"} size={18} style={{ color: active ? "#C084FC" : "#9CA3AF" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm" style={{ color: opt.disabled ? "#6B7280" : "#F6F1FF" }}>{opt.label}</span>
                          {opt.disabled && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.15)", color: "#FCA5A5" }}>{opt.disabledNote}</span>}
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(196,181,253,0.6)" }}>{opt.desc}</p>
                      </div>
                      <span className="text-sm font-bold shrink-0" style={{ color: active ? "#F472B6" : "#9CA3AF" }}>{opt.price}</span>
                      {active && <Icon name="CheckCircle2" size={18} style={{ color: "#A855F7", shrink: 0 }} />}
                    </button>
                  );
                })}
              </div>

              {/* Итог */}
              <div className="rounded-2xl p-4 mb-5" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: "#C084FC" }}>Итоговая стоимость:</span>
                  <div className="text-right">
                    {hasUrgent && base !== total && (
                      <div className="text-xs line-through" style={{ color: "rgba(196,181,253,0.5)" }}>{base.toLocaleString("ru")} ₽</div>
                    )}
                    <span className="text-2xl font-extrabold text-white">{total.toLocaleString("ru")} ₽</span>
                    {hasUrgent && <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(236,72,153,0.2)", color: "#F472B6" }}>⚡ срочно +50%</span>}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep("urgent")} className="px-4 py-3 rounded-xl font-semibold text-sm transition hover:bg-white/10" style={{ color: "#C084FC", border: "1px solid rgba(168,85,247,0.3)" }}>
                  ← Назад
                </button>
                <button
                  onClick={() => setStep("form")}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm transition hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}
                >
                  Получить расчёт и подарок {GIFT_EMOJI}
                </button>
              </div>
            </div>
          )}

          {/* ШАГ 3 — Форма */}
          {step === "form" && (
            <form onSubmit={handleSubmit}>
              <div className="rounded-2xl p-4 mb-5" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}>
                <p className="text-sm font-semibold mb-2" style={{ color: "#C084FC" }}>Ваш заказ:</p>
                <ul className="space-y-1">
                  {lines.map((l, i) => (
                    <li key={i} className="text-sm" style={{ color: "#E9D5FF" }}>· {l}</li>
                  ))}
                  {hasUrgent && <li className="text-sm font-bold" style={{ color: "#F472B6" }}>⚡ Срочно 2-3 часа (+50%)</li>}
                </ul>
                <div className="mt-3 pt-3 flex justify-between items-center" style={{ borderTop: "1px solid rgba(168,85,247,0.2)" }}>
                  <span className="text-sm" style={{ color: "#C084FC" }}>Итого:</span>
                  <span className="text-xl font-extrabold text-white">{total.toLocaleString("ru")} ₽</span>
                </div>
              </div>

              {/* Подарок */}
              <div className="rounded-2xl p-4 mb-5 flex items-start gap-3" style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.3)" }}>
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="font-bold text-white text-sm mb-0.5">Подарок за заявку</p>
                  <p className="text-xs" style={{ color: "rgba(196,181,253,0.8)" }}>Видео-слайдшоу из ваших фото бесплатно — к каждому треку</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#C084FC" }}>Ваше имя *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Как вас зовут?"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(168,85,247,0.3)", color: "#F6F1FF" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#C084FC" }}>Телефон или Telegram *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+7 900 000-00-00 или @username"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(168,85,247,0.3)", color: "#F6F1FF" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#C084FC" }}>Комментарий (необязательно)</label>
                  <textarea
                    value={form.comment}
                    onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
                    placeholder="Расскажите пару слов о поводе..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition resize-none"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(168,85,247,0.3)", color: "#F6F1FF" }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep("options")} className="px-4 py-3 rounded-xl font-semibold text-sm transition hover:bg-white/10" style={{ color: "#C084FC", border: "1px solid rgba(168,85,247,0.3)" }}>
                  ← Назад
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)", opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Отправляем..." : <><Icon name="Send" size={16} /> Отправить заявку</>}
                </button>
              </div>
              <p className="text-center text-xs mt-3" style={{ color: "rgba(196,181,253,0.5)" }}>Ответим в течение 15 минут</p>
            </form>
          )}

          {/* ГОТОВО */}
          {step === "done" && (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-white mb-2">Заявка принята!</h3>
              <p className="mb-2" style={{ color: "rgba(196,181,253,0.8)" }}>Юлия свяжется с вами в течение 15 минут.</p>
              <div className="rounded-2xl p-4 mb-5 flex items-start gap-3 text-left" style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.3)" }}>
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="font-bold text-white text-sm mb-0.5">Ваш подарок</p>
                  <p className="text-xs" style={{ color: "rgba(196,181,253,0.8)" }}>Видео-слайдшоу из ваших фото — бесплатно к треку</p>
                </div>
              </div>
              {onClose && (
                <button onClick={onClose} className="px-8 py-3 rounded-xl font-bold text-white" style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}>
                  Закрыть
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
