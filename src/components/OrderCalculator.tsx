import { useState } from "react";
import Icon from "@/components/ui/icon";

const CONTACT_URL = "https://functions.poehali.dev/9f0dc5b8-e0c8-4fea-bb5e-bbf79a9c6595";

// ─── Шаги смыслов ────────────────────────────────────────────
const meaningSteps = [
  {
    id: "who",
    question: "Кому дарите песню?",
    options: ["Маме / Папе", "Любимому человеку", "Другу / Подруге", "Всей семье"],
    emoji: "🎁",
  },
  {
    id: "occasion",
    question: "Какой повод?",
    options: ["День рождения", "Свадьба / Годовщина", "Просто так, от сердца", "Другое"],
    emoji: "🎉",
  },
  {
    id: "genre",
    question: "Какой жанр нравится получателю?",
    options: ["Спокойная лирика", "Поп / Эстрада", "Рок / Авторская", "Не знаю — выберите сами"],
    emoji: "🎵",
  },
];

// ─── Тарифы ───────────────────────────────────────────────────
const TARIFFS = [
  {
    id: "sms",
    name: "Музыкальное СМС",
    price: 1990,
    desc: "1 минута · AI-аранжировка · Срок: 1 час",
    emoji: "💬",
  },
  {
    id: "priznanie",
    name: "Признание",
    price: 5000,
    desc: "Полная песня · Авторский текст по интервью · 1 день",
    emoji: "❤️",
  },
  {
    id: "syurpriz",
    name: "Сюрприз",
    price: 9900,
    desc: "Признание + права + релиз на стримингах",
    emoji: "🎁",
    popular: true,
  },
  {
    id: "hit",
    name: "Хит",
    price: 29900,
    desc: "Живой вокал · Студийная запись · Бэк-вокал",
    emoji: "🎤",
  },
];

// ─── Калькулятор цены ─────────────────────────────────────────
interface CalcState {
  urgent: boolean | null;
  tariff: string;
}

function calcPrice(s: CalcState): { base: number; total: number; lines: string[] } {
  const tariff = TARIFFS.find(t => t.id === s.tariff) ?? TARIFFS[1];
  const lines = [`${tariff.name} — ${tariff.price.toLocaleString("ru")} ₽`];
  const base = tariff.price;
  const total = s.urgent ? Math.round(base * 1.5) : base;
  return { base, total, lines };
}

type Step = "meaning0" | "meaning1" | "meaning2" | "urgent" | "options" | "form" | "done";
const stepOrder: Step[] = ["meaning0", "meaning1", "meaning2", "urgent", "options", "form"];

interface Props {
  onClose?: () => void;
  inline?: boolean;
}

export default function OrderCalculator({ onClose, inline }: Props) {
  const [step, setStep]       = useState<Step>("meaning0");
  const [meanings, setMeanings] = useState<string[]>([]);
  const [calc, setCalc]       = useState<CalcState>({
    urgent: null, tariff: "priznanie",
  });
  const [form, setForm]         = useState({ name: "", phone: "", email: "", comment: "" });
  const [consents, setConsents] = useState({ pd: false, marketing: false });
  const [submitting, setSubmitting] = useState(false);

  const meaningIdx  = step === "meaning0" ? 0 : step === "meaning1" ? 1 : step === "meaning2" ? 2 : -1;
  const meaningStep = meaningIdx >= 0 ? meaningSteps[meaningIdx] : null;
  const currentIdx  = stepOrder.indexOf(step);
  const { base, total, lines } = calcPrice(calc);
  const hasUrgent = calc.urgent === true;

  function pickMeaning(val: string) {
    const next = [...meanings, val];
    setMeanings(next);
    if (step === "meaning0")      setStep("meaning1");
    else if (step === "meaning1") setStep("meaning2");
    else                          setStep("urgent");
  }

  function goBack() {
    if      (step === "meaning1") { setMeanings(m => m.slice(0,1)); setStep("meaning0"); }
    else if (step === "meaning2") { setMeanings(m => m.slice(0,2)); setStep("meaning1"); }
    else if (step === "urgent")   { setMeanings(m => m.slice(0,2)); setStep("meaning2"); }
    else if (step === "options")  setStep("urgent");
    else if (step === "form")     setStep("options");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const messageText = [
        `=== ЗАЯВКА С КАЛЬКУЛЯТОРА ===`,
        ``,
        `👤 О получателе:`,
        `  Кому дарите: ${meanings[0] || "—"}`,
        `  Повод: ${meanings[1] || "—"}`,
        `  Жанр: ${meanings[2] || "—"}`,
        ``,
        `🎵 Выбранные опции:`,
        ...lines.map(l => `  · ${l}`),
        hasUrgent ? `  ⚡ СРОЧНО (2–3 часа) +50%` : `  📅 Срок: стандартный 2–3 дня`,
        ``,
        `💰 Итоговая стоимость: ${total.toLocaleString("ru")} ₽`,
        form.comment ? `\n💬 Комментарий: ${form.comment}` : "",
      ].filter(Boolean).join("\n");

      await fetch(CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, contact: form.phone, client_email: form.email, message: messageText, channel: "email" }),
      });
    } catch { /* отправляем всё равно на done */ }
    setSubmitting(false);
    setStep("done");
  }

  const wrapCls = inline ? "w-full" : "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm";
  const cardCls = inline ? "w-full rounded-3xl overflow-hidden" : "w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto";

  return (
    <div
      className={wrapCls}
      onClick={!inline && onClose ? (e) => { if (e.target === e.currentTarget) onClose(); } : undefined}
    >
      <div className={cardCls} style={{ background: "linear-gradient(160deg, #1A0533 0%, #0D1B4B 100%)", border: "1px solid rgba(168,85,247,0.3)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4" style={{ borderBottom: "1px solid rgba(168,85,247,0.15)" }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#C084FC" }}>Заполните форму</p>
            <h2 className="text-xl font-extrabold text-white">Рассчитайте стоимость и получите подарок 🎁</h2>
          </div>
          {!inline && onClose && (
            <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center transition hover:bg-white/10 ml-3 shrink-0" style={{ color: "#C084FC" }}>
              <Icon name="X" size={20} />
            </button>
          )}
        </div>

        <div className="px-6 py-6">

          {/* Прогресс */}
          {step !== "done" && (
            <div className="flex gap-1.5 mb-6">
              {stepOrder.map((s, i) => (
                <div key={s} className="flex-1 h-1.5 rounded-full transition-all duration-300"
                  style={{ background: i <= currentIdx ? "linear-gradient(90deg,#A855F7,#EC4899)" : "rgba(168,85,247,0.2)" }} />
              ))}
            </div>
          )}

          {/* ── Шаги смыслов ── */}
          {meaningStep && (
            <div>
              <div className="text-4xl text-center mb-3">{meaningStep.emoji}</div>
              <h3 className="text-xl font-bold text-white text-center mb-1">{meaningStep.question}</h3>
              <p className="text-sm text-center mb-6" style={{ color: "rgba(196,181,253,0.6)" }}>
                Шаг {meaningIdx + 1} из {meaningSteps.length} — расскажите нам о получателе
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {meaningStep.options.map(opt => (
                  <button key={opt} onClick={() => pickMeaning(opt)}
                    className="px-4 py-4 rounded-2xl text-sm font-semibold transition-all hover:scale-105 text-left"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#F6F1FF", border: "1.5px solid rgba(168,85,247,0.3)" }}>
                    {opt}
                  </button>
                ))}
              </div>
              {meaningIdx > 0 && (
                <button onClick={goBack} className="text-sm transition hover:opacity-80" style={{ color: "#C084FC" }}>← Назад</button>
              )}
            </div>
          )}

          {/* ── Срочность ── */}
          {step === "urgent" && (
            <div>
              <div className="text-4xl text-center mb-3">⏱️</div>
              <h3 className="text-xl font-bold text-white text-center mb-1">Как быстро нужна песня?</h3>
              <p className="text-sm text-center mb-6" style={{ color: "rgba(196,181,253,0.6)" }}>От этого зависит итоговая стоимость</p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button onClick={() => { setCalc(p => ({ ...p, urgent: false })); setStep("options"); }}
                  className="flex flex-col items-start p-4 rounded-2xl text-left transition-all hover:scale-105"
                  style={{ background: "rgba(168,85,247,0.1)", border: "1.5px solid rgba(168,85,247,0.3)" }}>
                  <span className="text-2xl mb-2">📅</span>
                  <span className="font-bold text-white text-base">Стандарт</span>
                  <span className="text-sm mt-1" style={{ color: "rgba(196,181,253,0.7)" }}>2–3 дня</span>
                  <span className="text-sm font-semibold mt-2" style={{ color: "#C084FC" }}>от 5 000 ₽</span>
                </button>
                <button onClick={() => { setCalc(p => ({ ...p, urgent: true, liveVocal: false, publication: false })); setStep("options"); }}
                  className="flex flex-col items-start p-4 rounded-2xl text-left transition-all hover:scale-105"
                  style={{ background: "rgba(236,72,153,0.1)", border: "1.5px solid rgba(236,72,153,0.4)" }}>
                  <span className="text-2xl mb-2">⚡</span>
                  <span className="font-bold text-white text-base">Срочно</span>
                  <span className="text-sm mt-1" style={{ color: "rgba(196,181,253,0.7)" }}>2–3 часа</span>
                  <span className="text-sm font-semibold mt-2" style={{ color: "#F472B6" }}>+50% к цене</span>
                </button>
              </div>
              <button onClick={goBack} className="text-sm transition hover:opacity-80" style={{ color: "#C084FC" }}>← Назад</button>
            </div>
          )}

          {/* ── Выбор тарифа ── */}
          {step === "options" && (
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Выберите тариф</h3>
              <p className="text-sm mb-4" style={{ color: "rgba(196,181,253,0.7)" }}>Цена зависит от выбранного тарифа</p>
              <div className="space-y-2.5 mb-5">
                {TARIFFS.map(t => {
                  const active = calc.tariff === t.id;
                  return (
                    <button key={t.id} onClick={() => setCalc(p => ({ ...p, tariff: t.id }))}
                      className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all relative"
                      style={{
                        background: active ? "rgba(168,85,247,0.18)" : "rgba(255,255,255,0.05)",
                        border: `1.5px solid ${active ? "#A855F7" : "rgba(168,85,247,0.25)"}`,
                      }}>
                      {t.popular && (
                        <span className="absolute -top-2.5 left-4 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "linear-gradient(135deg,#A855F7,#EC4899)", color: "#fff" }}>
                          Популярный
                        </span>
                      )}
                      <span className="text-2xl shrink-0">{t.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-sm block" style={{ color: "#F6F1FF" }}>{t.name}</span>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(196,181,253,0.55)" }}>{t.desc}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-sm font-bold" style={{ color: active ? "#F472B6" : "#9CA3AF" }}>{t.price.toLocaleString("ru")} ₽</span>
                        {active && <Icon name="CheckCircle2" size={16} style={{ color: "#A855F7" }} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Итог */}
              <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: "#C084FC" }}>Итоговая стоимость:</span>
                  <div className="text-right">
                    {hasUrgent && base !== total && (
                      <div className="text-xs line-through" style={{ color: "rgba(196,181,253,0.4)" }}>{base.toLocaleString("ru")} ₽</div>
                    )}
                    <span className="text-2xl font-extrabold text-white">{total.toLocaleString("ru")} ₽</span>
                    {hasUrgent && <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(236,72,153,0.2)", color: "#F472B6" }}>⚡ +50%</span>}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={goBack} className="px-4 py-3 rounded-xl font-semibold text-sm transition hover:bg-white/10" style={{ color: "#C084FC", border: "1px solid rgba(168,85,247,0.3)" }}>
                  ← Назад
                </button>
                <button onClick={() => setStep("form")}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm transition hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}>
                  Получить расчёт и подарок 🎁
                </button>
              </div>
            </div>
          )}

          {/* ── Форма ── */}
          {step === "form" && (
            <form onSubmit={handleSubmit}>
              <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.25)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#C084FC" }}>Ваш заказ</p>
                <div className="text-xs space-y-0.5 mb-3" style={{ color: "#D8B4FE" }}>
                  <div>🎁 Кому: {meanings[0]} · {meanings[1]} · {meanings[2]}</div>
                  {lines.map((l, i) => <div key={i}>· {l}</div>)}
                  {hasUrgent && <div className="font-bold" style={{ color: "#F472B6" }}>⚡ Срочно 2–3 часа (+50%)</div>}
                </div>
                <div className="flex justify-between items-center pt-2" style={{ borderTop: "1px solid rgba(168,85,247,0.2)" }}>
                  <span className="text-xs" style={{ color: "#C084FC" }}>Итого:</span>
                  <span className="text-lg font-extrabold text-white">{total.toLocaleString("ru")} ₽</span>
                </div>
              </div>

              <div className="rounded-2xl p-3.5 mb-4 flex items-start gap-3" style={{ background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.25)" }}>
                <span className="text-xl">🎁</span>
                <div>
                  <p className="font-bold text-white text-sm">Подарок за заявку</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(196,181,253,0.7)" }}>Видео-слайдшоу из ваших фото — бесплатно к каждому треку</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#C084FC" }}>Ваше имя *</label>
                  <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Как вас зовут?"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(168,85,247,0.3)", color: "#F6F1FF" }} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#C084FC" }}>Телефон или Telegram *</label>
                  <input required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+7 900 000-00-00 или @username"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(168,85,247,0.3)", color: "#F6F1FF" }} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#C084FC" }}>Ваша почта *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="example@mail.ru"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(168,85,247,0.3)", color: "#F6F1FF" }} />
                  <p className="text-xs mt-1" style={{ color: "rgba(196,181,253,0.5)" }}>Пришлём подтверждение заявки с номером</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#C084FC" }}>Комментарий (необязательно)</label>
                  <textarea value={form.comment} onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
                    placeholder="Расскажите пару слов о поводе или пожеланиях..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(168,85,247,0.3)", color: "#F6F1FF" }} />
                </div>
              </div>

              {/* Галочки согласий */}
              <div className="space-y-3 mb-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consents.pd}
                    onChange={e => setConsents(p => ({ ...p, pd: e.target.checked }))}
                    className="mt-0.5 shrink-0 w-4 h-4 rounded accent-purple-500"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "rgba(196,181,253,0.7)" }}>
                    Я даю согласие на сбор и обработку персональных данных в соответствии с{" "}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#C084FC" }}>
                      Политикой конфиденциальности
                    </a>{" "}
                    согласно ФЗ-152 «О персональных данных» *
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consents.marketing}
                    onChange={e => setConsents(p => ({ ...p, marketing: e.target.checked }))}
                    className="mt-0.5 shrink-0 w-4 h-4 rounded accent-purple-500"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "rgba(196,181,253,0.7)" }}>
                    Согласен(на) получать информационные и рекламные рассылки от AI Muse Lab (необязательно)
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={goBack} className="px-4 py-3 rounded-xl font-semibold text-sm transition hover:bg-white/10" style={{ color: "#C084FC", border: "1px solid rgba(168,85,247,0.3)" }}>
                  ← Назад
                </button>
                <button type="submit" disabled={submitting || !consents.pd}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)", opacity: (submitting || !consents.pd) ? 0.5 : 1 }}>
                  {submitting ? "Отправляем..." : <><Icon name="Send" size={16} /> Отправить заявку</>}
                </button>
              </div>
              <p className="text-center text-xs mt-3" style={{ color: "rgba(196,181,253,0.45)" }}>Юлия ответит в течение 15 минут</p>
            </form>
          )}

          {/* ── Готово ── */}
          {step === "done" && (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-white mb-2">Заявка принята!</h3>
              <p className="mb-4" style={{ color: "rgba(196,181,253,0.8)" }}>Юлия свяжется с вами в течение 15 минут.</p>
              <div className="rounded-2xl p-4 mb-5 flex items-start gap-3 text-left" style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.3)" }}>
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="font-bold text-white text-sm">Ваш подарок</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(196,181,253,0.7)" }}>Видео-слайдшоу из ваших фото — бесплатно к треку</p>
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