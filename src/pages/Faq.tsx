import { useState } from "react";
import { Link } from "react-router-dom";
import CookieBanner from "@/components/CookieBanner";
import NavBar from "@/components/NavBar";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { usePageMeta } from "@/hooks/usePageMeta";
import Icon from "@/components/ui/icon";

type FaqItem = { q: string; a: string | string[] };
type FaqSection = { id: string; icon: string; title: string; items: FaqItem[] };

const sections: FaqSection[] = [
  {
    id: "price",
    icon: "Banknote",
    title: "Стоимость и оплата",
    items: [
      {
        q: "Сколько стоит заказать песню?",
        a: "Цены начинаются от 5 000 ₽ за базовый пакет с AI-вокалом. Пакет с живым вокалом и передачей авторских прав — 19 000 ₽.",
      },
      {
        q: "Что входит в стоимость?",
        a: ["Авторский текст по вашей истории", "Профессиональная музыка и аранжировка", "Запись вокала (AI или живой)", "Сведение и мастеринг студийного качества", "До 3–5 бесплатных правок", "Готовый MP3 файл навсегда ваш"],
      },
      {
        q: "Есть ли скрытые платежи?",
        a: "Нет! Вся стоимость указана сразу. Никаких доплат за правки или пересылку файла.",
      },
      {
        q: "Как происходит оплата?",
        a: "Мы работаем по предоплате 50%, остальное — после того, как вы услышите демо-версию и одобрите её.",
      },
    ],
  },
  {
    id: "timing",
    icon: "Clock",
    title: "Сроки и процесс",
    items: [
      {
        q: "За сколько дней вы создаёте песню?",
        a: ["Базовые пакеты: 2–3 рабочих дня", "Пакет с живым вокалом: 5–7 дней", "Срочный заказ (доплата 50%): 24–48 часов"],
      },
      {
        q: "Как происходит процесс создания?",
        a: ["Вы заполняете анкету или пишете нам в Telegram", "Мы проводим глубинное интервью (15–30 минут) — узнаём историю, детали, эмоции", "Юлия пишет текст и создаёт музыку (1–2 дня)", "Вы слушаете демо-версию и даёте обратную связь", "Мы вносим правки (если нужно)", "Получаете готовый трек в высоком качестве"],
      },
      {
        q: "Сколько правок можно сделать?",
        a: ["Базовые пакеты: до 3 бесплатных правок", "Пакеты с живым вокалом: до 5 правок", "Дополнительные правки: 1 000 ₽ за правку"],
      },
    ],
  },
  {
    id: "vocal",
    icon: "Mic",
    title: "О вокале и качестве",
    items: [
      {
        q: "Чем отличается AI-вокал от живого?",
        a: "AI-вокал — современное звучание, быстрее (2–3 дня), дешевле (от 5 000 ₽), подходит для личных подарков. Живой вокал — настоящие эмоции профессионального исполнителя, студийная запись, 5–7 дней, от 19 000 ₽. Идеально для свадеб и публичных выступлений.",
      },
      {
        q: "Можно ли использовать мой голос в песне?",
        a: "Да! У нас есть пакет «Ваш голос». Вы присылаете запись вашего голоса, и мы вписываем его в профессиональный трек.",
      },
      {
        q: "Какое качество записи?",
        a: "Студийное качество 320 kbps MP3 (или WAV по запросу). Звучит так же, как песни на Яндекс Музыке или Spotify.",
      },
    ],
  },
  {
    id: "text",
    icon: "PenLine",
    title: "Текст и музыка",
    items: [
      {
        q: "Как вы пишете текст?",
        a: "Мы не используем шаблоны! Каждый текст пишется индивидуально на основе вашей истории. Юлия проводит с вами интервью, узнаёт детали, эмоции, важные моменты — и всё это попадает в текст.",
      },
      {
        q: "Могу ли я предложить свой текст?",
        a: "Да! Если у вас уже есть стихи, мы можем создать музыку под ваш текст. Или доработать текст вместе с вами.",
      },
      {
        q: "Какие жанры музыки вы делаете?",
        a: ["Душевная лирика", "Поп-музыка", "Рок-баллада", "Рэп и хип-хоп", "Диско и танцевальная", "Романтика", "Авторская песня", "Детские песни", "Корпоративные гимны"],
      },
      {
        q: "Могу ли я выбрать мелодию?",
        a: "Да! Вы можете отправить нам примеры песен, которые вам нравятся по стилю, и мы создадим что-то похожее — уникальное, без нарушения авторских прав.",
      },
    ],
  },
  {
    id: "rights",
    icon: "FileCheck",
    title: "Авторские права",
    items: [
      {
        q: "Могу ли я использовать песню в коммерческих целях?",
        a: ["Базовые пакеты (5 000–10 000 ₽): только для личного использования (подарок, семейное видео)", "Пакеты с передачей прав (от 12 000 ₽): вы получаете коммерческие права и можете использовать в рекламе, соцсетях, на YouTube"],
      },
      {
        q: "Можно ли опубликовать песню на стриминговых платформах?",
        a: "Да! Пакет «Публикация» (15 000 ₽) включает выпуск песни на Яндекс Музыке, VK Музыке, Spotify, Apple Music.",
      },
    ],
  },
  {
    id: "personal",
    icon: "Heart",
    title: "Личные вопросы",
    items: [
      {
        q: "Я стесняюсь рассказывать личные истории...",
        a: "Мы понимаем! Юлия работает с очень личными историями ежедневно. Всё конфиденциально, никогда не публикуем без вашего разрешения. Многие клиенты говорят, что интервью само по себе оказалось ценным — приятно вспомнить и переосмыслить важные моменты.",
      },
      {
        q: "А если песня мне не понравится?",
        a: "Такого ещё не было за 100+ заказов! Но если вдруг — мы делаем правки до тех пор, пока вы не будете довольны. Или возвращаем деньги, если не можем попасть в ваше настроение.",
      },
      {
        q: "Сколько времени нужно на интервью?",
        a: "15–30 минут. Мы можем общаться в Telegram голосовыми, текстом, или созвониться.",
      },
    ],
  },
  {
    id: "delivery",
    icon: "Gift",
    title: "Доставка и формат",
    items: [
      {
        q: "В каком виде я получу песню?",
        a: "Готовый MP3 файл (или WAV) высокого качества. Присылаем на email или Telegram.",
      },
      {
        q: "Будет ли видео?",
        a: ["В пакете «Живой вокал» мы дарим видео-слайдшоу из ваших фото!", "Дополнительно: лирик-видео (текст + визуалы)", "Полноценный музыкальный клип", "AI-визуалы под музыку"],
      },
    ],
  },
  {
    id: "seasonal",
    icon: "Calendar",
    title: "Сезонные вопросы",
    items: [
      {
        q: "Успеете ли сделать к празднику?",
        a: "Да, если до праздника больше 5 дней. Если меньше — есть срочный заказ (доплата 50%, срок 24–48 часов).",
      },
      {
        q: "Сколько заказов вы берёте в неделю?",
        a: "Не более 5 заказов, чтобы каждому уделить максимум внимания. Перед праздниками бронируйте заранее!",
      },
    ],
  },
  {
    id: "geo",
    icon: "Globe",
    title: "География",
    items: [
      {
        q: "Вы работаете только в Санкт-Петербурге?",
        a: "Нет! Мы работаем дистанционно по всей России, СНГ и миру. Весь процесс онлайн — через Telegram.",
      },
      {
        q: "Можно ли приехать к вам в студию?",
        a: "Да, если вы в Санкт-Петербурге, можно встретиться для интервью или присутствовать на записи вокала (по договорённости).",
      },
    ],
  },
];

export default function Faq() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("price");
  useBreadcrumb([
    { name: "Главная", item: "https://aimuselab.ru/" },
    { name: "FAQ", item: "https://aimuselab.ru/faq" },
  ]);
  usePageMeta({
    title: "Частые Вопросы о Заказе Песни | FAQ AI Muse Lab",
    description: "Ответы на все вопросы о создании персональной песни на заказ: процесс, сроки, цены, правки, авторские права. Узнайте всё перед заказом!",
  });

  const toggleItem = (key: string) => setOpenItem(openItem === key ? null : key);

  return (
    <div style={{ background: "#0d0702", minHeight: "100vh" }}>

      <NavBar />

      {/* ─── HERO ─── */}
      <section className="py-16 px-6 text-center" style={{ background: "linear-gradient(180deg, #1a0d04 0%, #0d0702 100%)" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <Icon name="HelpCircle" size={14} style={{ color: "#f5c97a" }} />
            <span className="text-sm text-white/80">Всё, что нужно знать перед заказом</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Частые вопросы<br />
            <span style={{ color: "#f5c97a" }}>о заказе песни</span>
          </h1>
          <p className="text-base" style={{ color: "#c9a882" }}>
            Ответы на все вопросы о процессе, сроках, ценах и правках
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Боковое меню */}
            <aside className="lg:w-56 flex-shrink-0">
              <div className="lg:sticky lg:top-24 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                {sections.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveSection(s.id);
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all text-left flex-shrink-0"
                    style={activeSection === s.id
                      ? { background: "#c2410c", color: "#fff" }
                      : { background: "rgba(255,255,255,0.05)", color: "#c9a882" }
                    }
                  >
                    <Icon name={s.icon as "Clock"} size={14} />
                    {s.title}
                  </button>
                ))}
              </div>
            </aside>

            {/* FAQ секции */}
            <div className="flex-1 space-y-10">
              {sections.map(section => (
                <div key={section.id} id={section.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(194,65,12,0.2)" }}>
                      <Icon name={section.icon as "Clock"} size={18} style={{ color: "#f5c97a" }} />
                    </div>
                    <h2 className="text-xl font-extrabold text-white">{section.title}</h2>
                  </div>
                  <div className="space-y-2">
                    {section.items.map((item, idx) => {
                      const key = `${section.id}-${idx}`;
                      const isOpen = openItem === key;
                      return (
                        <div
                          key={key}
                          className="rounded-2xl overflow-hidden cursor-pointer transition-all"
                          style={{ background: "#1a0d04", border: `1px solid ${isOpen ? "#c2410c" : "#2a1a0e"}` }}
                          onClick={() => toggleItem(key)}
                        >
                          <div className="flex items-center justify-between px-5 py-4 gap-4">
                            <h3 className="font-semibold text-sm" style={{ color: "#fff" }}>{item.q}</h3>
                            <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: "#c2410c", flexShrink: 0 }} />
                          </div>
                          {isOpen && (
                            <div className="px-5 pb-5">
                              {Array.isArray(item.a) ? (
                                <ul className="space-y-2">
                                  {item.a.map((line, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#c9a882" }}>
                                      <Icon name="Check" size={13} style={{ color: "#f5c97a", marginTop: 3, flexShrink: 0 }} />
                                      {line}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm leading-relaxed" style={{ color: "#c9a882" }}>{item.a}</p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "#2d2016" }}>
            Не нашли ответ на свой вопрос?
          </h2>
          <p className="text-sm mb-6" style={{ color: "#5a3d2b" }}>
            Ответим в течение 15 минут в рабочее время (09:00–21:00 МСК)
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ background: "#c2410c" }}
            >
              <Icon name="Send" size={17} />
              @izmailova8888
            </a>
            <a
              href="https://t.me/AIMusalab_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-transform hover:scale-105"
              style={{ background: "#fff", color: "#2d2016", border: "1px solid #e5c9b5" }}
            >
              <Icon name="Bot" size={17} />
              @AIMusalab_bot
            </a>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
            style={{ background: "#2d2016" }}
          >
            <Icon name="Music2" size={17} />
            Заказать песню
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-6 border-t" style={{ background: "#0d0702", borderColor: "#2a1a0e" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 mb-6 text-xs" style={{ color: "#7a5c44" }}>
            <div>
              <p className="font-semibold mb-1" style={{ color: "#c9a882" }}>ИП Измайлова Юлия Александровна</p>
              <p>ИНН: 665895132301</p>
              <p>198207, г. Санкт-Петербург, пр-кт Ленинский, д 117, корп 1, кв 234</p>
              <p>Без НДС (УСН)</p>
            </div>
            <div className="flex flex-col gap-2 text-xs md:text-right">
              <Link to="/public-offer" className="hover:underline" style={{ color: "#c9a882" }}>Договор-оферта</Link>
              <Link to="/privacy-policy" className="hover:underline" style={{ color: "#c9a882" }}>Политика конфиденциальности</Link>
              <a href="https://t.me/izmailova8888" className="hover:underline" style={{ color: "#c9a882" }}>Telegram: @izmailova8888</a>
            </div>
          </div>
          <div className="border-t pt-4 text-center text-xs" style={{ borderColor: "#2a1a0e", color: "#7a5c44" }}>
            <p>© 2026 ИП Измайлова Юлия Александровна · Все права защищены</p>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}