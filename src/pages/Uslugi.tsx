import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

function BusinessFaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card
      className="border-0 shadow-sm overflow-hidden cursor-pointer"
      style={{ background: "#fff" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5">
        <h3 className="font-semibold text-sm pr-4" style={{ color: "#2d2016" }}>{q}</h3>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: "#c2410c", flexShrink: 0 }} />
      </div>
      {open && (
        <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#7a5c44" }}>{a}</div>
      )}
    </Card>
  );
}

const NAV_SECTIONS = [
  { id: "ai-video", label: "📹 Видео и клипы" },
  { id: "artist-from-zero", label: "🎤 Артисты с нуля" },
  { id: "business-music", label: "🎬 Музыка для бизнеса" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Uslugi() {
  const [activeSection, setActiveSection] = useState<string>("ai-video");
  const [menuOpen, setMenuOpen] = useState(false);

  useState(() => {
    const handleScroll = () => {
      for (const s of [...NAV_SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="min-h-screen font-sans" style={{ background: "#faf7f4", color: "#2d2016" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'); body { font-family: 'Montserrat', sans-serif; }`}</style>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b" style={{ background: "rgba(26,15,7,0.96)", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Icon name="ArrowLeft" size={16} style={{ color: "#c2410c" }} />
            <span className="font-bold text-sm" style={{ color: "#c9a882" }}>На главную</span>
          </Link>
          <span className="font-extrabold text-base tracking-wider text-white">AI MUSELAB</span>
          <a
            href="https://t.me/izmailova8888"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm text-white transition-transform hover:scale-105"
            style={{ background: "#c2410c" }}
          >
            <Icon name="Send" size={13} />
            Telegram
          </a>
          <button
            className="sm:hidden p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#f5c97a" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Таб-навигация (десктоп) */}
        <div className="hidden sm:block border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="container mx-auto px-6 flex gap-1 overflow-x-auto">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border-b-2"
                style={{
                  color: activeSection === s.id ? "#f5c97a" : "#9a7a65",
                  borderBottomColor: activeSection === s.id ? "#c2410c" : "transparent",
                  background: "transparent",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Мобильное меню */}
        {menuOpen && (
          <div className="sm:hidden border-t px-4 py-3 flex flex-col gap-1" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(26,15,7,0.98)" }}>
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => { scrollTo(s.id); setMenuOpen(false); }}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  color: activeSection === s.id ? "#f5c97a" : "#c9a882",
                  background: activeSection === s.id ? "rgba(194,65,12,0.15)" : "transparent",
                }}
              >
                {s.label}
              </button>
            ))}
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-sm text-white"
              style={{ background: "#c2410c" }}
            >
              <Icon name="Send" size={14} />
              Написать в Telegram
            </a>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ─── ВИДЕО И КЛИПЫ AI ─────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════ */}

      <section id="ai-video" className="pt-40 pb-16 px-6" style={{ background: "#2d2016" }}>
        <div className="container mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-6" style={{ background: "rgba(245,201,122,0.15)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.3)" }}>
            Видео и клипы AI
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Видеоконтент и клипы с AI
          </h1>
          <p className="text-lg" style={{ color: "#c9a882" }}>
            Профессиональные музыкальные клипы, лирик-видео и визуальный контент — от идеи до финального монтажа
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { icon: "Video", title: "Музыкальный клип", desc: "Полноценный видеоклип под вашу песню. Сценарий, съёмка, монтаж, цветокоррекция — под ключ.", tag: "Популярно" },
              { icon: "FileText", title: "Лирик-видео", desc: "Стильное видео с текстом песни. Идеально для публикации в YouTube и социальных сетях.", tag: "" },
              { icon: "Sparkles", title: "Визуализация с AI", desc: "Генеративные визуальные образы под музыку с использованием нейросетей. Уникальная эстетика.", tag: "Новинка" },
              { icon: "Megaphone", title: "Рекламные ролики с AI", desc: "Видео для запуска продукта, промо, бренда.", tag: "" },
              { icon: "Smartphone", title: "Контент для соцсетей", desc: "Reels, Shorts, TikTok, визуальные нарезки.", tag: "" },
              { icon: "PresentationIcon", title: "Анимированные презентации", desc: "Для выступлений, запусков, обучения.", tag: "" },
              { icon: "MonitorPlay", title: "Product demo видео", desc: "Демонстрация продукта, сервиса, приложения.", tag: "" },
            ].map((s, i) => (
              <Card key={i} className="p-6 border-0 shadow-md relative" style={{ background: "#fff" }}>
                {s.tag && (
                  <span className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#fde8d8", color: "#c2410c" }}>{s.tag}</span>
                )}
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#fde8d8" }}>
                  <Icon name={s.icon as "Video"} size={22} style={{ color: "#c2410c" }} />
                </div>
                <h3 className="font-extrabold text-base mb-2" style={{ color: "#2d2016" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a5c44" }}>{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold text-center mb-14" style={{ color: "#2d2016" }}>Как это работает</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Обсуждаем идею", desc: "Вы описываете задачу, стиль и настроение. Мы предлагаем концепцию." },
              { num: "02", title: "Создаём сценарий", desc: "Прорабатываем визуальный ряд, раскадровку и план съёмки." },
              { num: "03", title: "Производство", desc: "Съёмка или генерация визуала, монтаж, звук, цветокоррекция." },
              { num: "04", title: "Готовый файл", desc: "Получаете финальный видеофайл в нужном формате и разрешении." },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black mb-3" style={{ color: "#e8d5b7" }}>{step.num}</div>
                <h3 className="font-extrabold mb-2" style={{ color: "#2d2016" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a5c44" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#2d2016" }}>
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Обсудим ваш проект?</h2>
          <p className="mb-8" style={{ color: "#c9a882" }}>Стоимость и сроки — индивидуально. Напишите — ответим в течение 15 минут.</p>
          <a
            href="https://t.me/izmailova8888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-white text-lg transition-transform hover:scale-105"
            style={{ background: "#c2410c" }}
          >
            <Icon name="Send" size={20} />
            Написать в Telegram
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ─── АРТИСТЫ С НУЛЯ ───────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════ */}

      <section id="artist-from-zero" className="py-24 px-6" style={{ background: "#1a0f07" }}>
        <div className="container mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-6" style={{ background: "rgba(245,201,122,0.15)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.3)" }}>
            Артисты с нуля
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Создание артиста под ключ
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#c9a882" }}>
            Музыкальный бренд, песни, визуальный стиль, релизы, дистрибуция и развитие артиста — от идеи до первых слушателей.
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "Star", title: "Создание музыкального бренда", desc: "Позиционирование, образ, стиль.", badge: "Старт" },
              { icon: "Disc3", title: "Запись альбома или EP", desc: "Работа над релизом под ключ.", badge: "" },
              { icon: "Globe", title: "Дистрибуция на платформы", desc: "Яндекс, VK, Spotify, Apple Music.", badge: "" },
              { icon: "LayoutTemplate", title: "SMM-стратегия", desc: "Контент-план, Reels, визуальная упаковка.", badge: "" },
              { icon: "Palette", title: "Обложки и визуальный стиль", desc: "Арт-дирекшн, обложки, айдентика.", badge: "" },
              { icon: "TrendingUp", title: "PR и продвижение", desc: "Запуск, релизная коммуникация.", badge: "Хит" },
            ].map((s) => (
              <Card key={s.title} className="p-6 border-0 shadow-sm relative" style={{ background: "#fff" }}>
                {s.badge && (
                  <span className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#fde8d8", color: "#c2410c" }}>{s.badge}</span>
                )}
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#fde8d8" }}>
                  <Icon name={s.icon as "Star"} size={22} style={{ color: "#c2410c" }} />
                </div>
                <h3 className="font-extrabold text-base mb-2" style={{ color: "#2d2016" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a5c44" }}>{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#2d2016" }}>Этапы работы</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Концепция", desc: "Определяем образ, жанр, целевую аудиторию и позиционирование." },
              { num: "02", title: "Контент", desc: "Создаём песни, визуальный стиль, обложки и контент-план." },
              { num: "03", title: "Релиз", desc: "Записываем, сводим, мастерим и выпускаем треки на платформы." },
              { num: "04", title: "Продвижение", desc: "PR, SMM, плейлисты, питчинг и рост аудитории." },
            ].map((step, i) => (
              <div key={i} className="text-center p-5 rounded-2xl" style={{ background: "#faf7f4", border: "1px solid #e8d5b7" }}>
                <div className="text-4xl font-black mb-3" style={{ color: "#e8d5b7" }}>{step.num}</div>
                <h3 className="font-extrabold text-base mb-2" style={{ color: "#2d2016" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a5c44" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#1a0f07" }}>
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Готовы запустить артиста?</h2>
          <p className="mb-8" style={{ color: "#c9a882" }}>Расскажите о своей идее — обсудим формат и план работы.</p>
          <a
            href="https://t.me/izmailova8888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-white text-lg transition-transform hover:scale-105"
            style={{ background: "#c2410c" }}
          >
            <Icon name="Send" size={20} />
            Запустить проект
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ─── МУЗЫКА ДЛЯ БИЗНЕСА ──────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════ */}

      <section id="business-music" className="py-24 px-6" style={{ background: "#2d2016" }}>
        <div className="container mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-6" style={{ background: "rgba(245,201,122,0.15)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.3)" }}>
            Музыка для бизнеса
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Музыка для бизнеса, брендов и digital-проектов
          </h2>
          <p className="text-base md:text-lg mb-5 leading-relaxed" style={{ color: "#c9a882" }}>
            Создаём музыку, которая работает на узнаваемость бренда, эмоцию аудитории и коммерческий результат: от джинглов и рекламных треков до корпоративных гимнов и саунд-дизайна.
          </p>
          <p className="text-sm leading-relaxed px-4 py-3 rounded-xl inline-block" style={{ color: "#f5c97a", background: "rgba(245,201,122,0.08)", border: "1px solid rgba(245,201,122,0.2)" }}>
            AI Muse Lab помогает компаниям звучать профессионально, современно и узнаваемо. Мы создаём музыку под конкретную задачу бизнеса, формат площадки и стиль коммуникации.
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#2d2016" }}>Для кого эта услуга</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "Building2", title: "Компании и бренды", desc: "Музыка для рекламы, презентаций, мероприятий и фирменного звучания." },
              { icon: "Megaphone", title: "Рекламные агентства", desc: "Быстрое создание качественного трека под бриф." },
              { icon: "Music2", title: "Продюсерские центры", desc: "Авторские композиции, джинглы, саунд-дизайн." },
              { icon: "Rocket", title: "Стартапы", desc: "Звук бренда, который помогает выделиться." },
              { icon: "Youtube", title: "YouTube-каналы и медиа", desc: "Заставки, интро, фоновая музыка, темы для рубрик." },
              { icon: "Mic2", title: "Подкасты", desc: "Фирменные заставки, подложки, аудиобрендинг." },
              { icon: "Smartphone", title: "Приложения и игры", desc: "Музыка для интерфейсов, onboarding, рекламных материалов." },
            ].map((item) => (
              <Card key={item.title} className="p-5 border-0 shadow-sm flex gap-4 items-start" style={{ background: "#fff" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#fde8d8" }}>
                  <Icon name={item.icon as "Music2"} size={20} style={{ color: "#c2410c" }} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm mb-1" style={{ color: "#2d2016" }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#7a5c44" }}>{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#2d2016" }}>Семь направлений услуг</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { num: "01", title: "Корпоративные гимны и бренд-песни", desc: "Трек, который передаёт ценности компании, усиливает командный дух и работает на бренд." },
              { num: "02", title: "Музыка для рекламных роликов", desc: "Запоминающаяся музыка под видео, digital-рекламу, промо-ролики." },
              { num: "03", title: "Фоновая музыка для видео-контента", desc: "Музыкальные подложки для Reels, YouTube, интервью, корпоративного контента." },
              { num: "04", title: "Джинглы и звуковые логотипы", desc: "Короткие фирменные аудиосигнатуры для узнаваемости бренда." },
              { num: "05", title: "Музыка для подкастов и YouTube", desc: "Интро, аутро, темы рубрик, фирменное звучание канала." },
              { num: "06", title: "Саундтреки для презентаций и мероприятий", desc: "Музыка для форумов, бизнес-презентаций, запусков продуктов." },
              { num: "07", title: "Музыка для приложений и игр", desc: "Интерфейсная музыка, брендированные аудиоэлементы." },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 p-5 rounded-2xl" style={{ background: "#faf7f4", border: "1px solid #e8d5b7" }}>
                <div className="text-2xl font-black flex-shrink-0" style={{ color: "#e8d5b7" }}>{item.num}</div>
                <div>
                  <h3 className="font-extrabold text-base mb-1" style={{ color: "#2d2016" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#7a5c44" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#2d2016" }}>Пакеты и цены</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                badge: "",
                name: "Базовый",
                sub: "Для малого бизнеса",
                price: "от 35 000 ₽",
                features: ["1 задача: джингл / подложка / аудиологотип", "Длительность до 30 секунд", "1 концепция", "До 2 правок", "Коммерческое использование", "Срок: 5–7 дней", "WAV/MP3"],
                fit: "Малый бизнес, личный бренд, подкаст, YouTube",
                highlight: false,
              },
              {
                badge: "Популярно",
                name: "Стандарт",
                sub: "Для рекламы и контента",
                price: "от 75 000 ₽",
                features: ["Музыка для ролика/бренда/подкаста", "Длительность до 60 секунд", "2 концепции на выбор", "До 3 правок", "Коммерческие права", "Адаптация под 2 формата", "Срок: 7–10 дней"],
                fit: "Бренды, агентства, медиа, онлайн-школы",
                highlight: true,
              },
              {
                badge: "",
                name: "Премиум",
                sub: "Для комплексных задач",
                price: "от 150 000 ₽",
                features: ["Музыкальная концепция под бренд", "До 3 треков/версий", "Длительность до 90 сек каждая", "До 5 правок", "Расширенные права", "Исходники по согласованию", "Приоритетная работа", "Срок: 10–14 дней"],
                fit: "Средний и крупный бизнес, рекламные кампании",
                highlight: false,
              },
              {
                badge: "Full buyout",
                name: "Эксклюзив",
                sub: "Full buyout",
                price: "от 300 000 ₽",
                features: ["Уникальное музыкальное решение", "Эксклюзивные права с полным выкупом", "Индивидуальная стратегия", "Несколько форматов и версий", "До 7 правок", "Приоритетные сроки", "Исходники, stems, мастер-версии", "Долгосрочное сопровождение"],
                fit: "Крупные бренды, сетевые компании, digital-платформы",
                highlight: false,
              },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-2xl p-6 flex flex-col relative"
                style={{
                  background: pkg.highlight ? "#fff" : "#faf7f4",
                  border: pkg.highlight ? "2px solid #c2410c" : "1px solid #e8d5b7",
                  boxShadow: pkg.highlight ? "0 8px 32px rgba(194,65,12,0.15)" : "none",
                }}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap" style={{ background: "#c2410c", color: "#fff" }}>{pkg.badge}</span>
                )}
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#c2410c" }}>{pkg.name}</p>
                <p className="text-sm mb-4" style={{ color: "#7a5c44" }}>{pkg.sub}</p>
                <p className="text-3xl font-extrabold mb-5" style={{ color: "#2d2016" }}>{pkg.price}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#4a3728" }}>
                      <Icon name="Check" size={14} style={{ color: "#c2410c", flexShrink: 0, marginTop: 2 }} /> {f}
                    </li>
                  ))}
                </ul>
                <p className="text-xs mb-4 italic" style={{ color: "#9a7a65" }}>Подходит: {pkg.fit}</p>
                <a
                  href="https://t.me/izmailova8888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-transform hover:scale-105"
                  style={{
                    background: pkg.highlight ? "#c2410c" : "transparent",
                    color: pkg.highlight ? "#fff" : "#c2410c",
                    border: pkg.highlight ? "none" : "2px solid #c2410c",
                  }}
                >
                  Обсудить
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#2d2016" }}>Процесс работы</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Бриф и задача", desc: "Вы рассказываете о бренде, аудитории, канале и цели." },
              { num: "02", title: "Музыкальная концепция", desc: "Предлагаем стиль, темп, настроение и формат." },
              { num: "03", title: "Создание демо", desc: "Готовим первый вариант трека." },
              { num: "04", title: "Правки и адаптация", desc: "Дорабатываем по комментариям." },
              { num: "05", title: "Финализация и мастеринг", desc: "Готовим финальный звук в нужных форматах." },
              { num: "06", title: "Передача прав и материалов", desc: "Вы получаете файлы и пакет прав." },
            ].map((step) => (
              <div key={step.num} className="text-center p-5 rounded-2xl" style={{ background: "#faf7f4", border: "1px solid #e8d5b7" }}>
                <div className="text-4xl font-black mb-3" style={{ color: "#e8d5b7" }}>{step.num}</div>
                <h3 className="font-extrabold text-base mb-2" style={{ color: "#2d2016" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a5c44" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#2d2016" }}>Частые вопросы</h2>
          <div className="space-y-3">
            {[
              { q: "Вы передаёте коммерческие права?", a: "Да, в бизнес-пакетах обязательно." },
              { q: "Можно ли выкупить музыку полностью?", a: "Да, пакет «Эксклюзив» с full buyout." },
              { q: "Вы работаете по брифу агентства?", a: "Да, встраиваемся в команду." },
              { q: "Можно несколько версий трека?", a: "Да, короткие, длинные, вертикальные версии." },
              { q: "Делаете срочно?", a: "Да, срочность рассчитывается отдельно." },
              { q: "Подходит для подкастов и YouTube?", a: "Да, это ключевое направление." },
              { q: "Только с AI?", a: "Нет, AI — инструмент продюсирования." },
              { q: "Можно начать с маленькой задачи?", a: "Да, пакет «Базовый» для джинглов." },
            ].map((item, i) => (
              <BusinessFaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: "#1a0f07" }}>
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
            Нужна музыка, которая будет работать на ваш бренд?
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: "#c9a882" }}>
            Расскажите о проекте, задаче, формате и сроках — мы предложим музыкальное решение под ваш бизнес.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-transform hover:scale-105"
              style={{ background: "#c2410c" }}
            >
              <Icon name="MessageSquare" size={18} />
              Обсудить проект
            </a>
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-transform hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <Icon name="Send" size={18} />
              Написать в Telegram
            </a>
          </div>
          <p className="mt-5 text-xs" style={{ color: "#5a3d2b" }}>Ответим в течение 15 минут</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-sm" style={{ background: "#1a0f07", color: "#5a3d2b" }}>
        <Link to="/" className="hover:underline" style={{ color: "#9a7a65" }}>← Вернуться к песням на заказ</Link>
      </footer>
    </div>
  );
}
