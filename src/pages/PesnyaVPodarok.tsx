import { useState } from "react";
import { Link } from "react-router-dom";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import OrderCalculator from "@/components/OrderCalculator";
import AudioPlayer, { Track } from "@/components/AudioPlayer";
import GiftForm from "@/components/GiftForm";

const playerTracks: Track[] = [
  {
    id: "lichnyj-geroj",
    title: "Личный герой",
    occasion: "для любимого человека",
    emoji: "❤️",
    publicKey: "https://disk.yandex.ru/d/Qt-vD587OVtjOQ",
    desc: "Девушка поздравила своего парня, героя войны, с днём рождения. Её слова: «Мне вас сам Бог послал» — стали самым тёплым отзывом.",
  },
  {
    id: "zryachee-serdce",
    title: "Зрячее сердце",
    occasion: "для бабушки",
    emoji: "🌸",
    publicKey: "https://disk.yandex.ru/d/ma-Q1rEWWSh4WQ",
    desc: "Семья поздравляла свою слепую бабушку. В её памяти живы картинки из прошлого — и эта песня стала талисманом любви всей семьи.",
  },
  {
    id: "kajfuyu-s-yanoj",
    title: "Кайфую с Яной",
    occasion: "для подруги на день рождения",
    emoji: "🎉",
    publicKey: "https://disk.yandex.ru/d/Qt-vD587OVtjOQ",
    desc: "Весёлая, искренняя, настоящая. Именно такой и должна быть дружеская песня.",
  },
];

const HERO_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/4fee9940-7db1-4128-9a82-27b34ded74bb.jpg";
const VINYL_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/1b51b62f-525c-42f3-ac36-5114e5d51e17.jpg";
const STUDIO_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/add1436d-d6f3-42b3-bc70-66cf247e9536.jpg";
const WEDDING_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/0a89312a-7bdc-4e0f-958a-d1062ca38446.jpg";
const COVER1_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/c3024fbc-b575-4801-a8b2-ffcef7caee5f.jpeg";
const COVER2_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/a263451b-c1d7-43c5-a9ca-b43d7bfe2bed.jpeg";
const COVER3_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/7e8e6a9e-1aab-4a3b-a55f-28113b0e8b6e.jpeg";
const COVER4_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/7cf5bea0-aa19-4fde-bd50-fc17c9c1f460.jpeg";
const COVER5_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/d8217d7f-3d50-4075-be56-5768907430cc.jpeg";


const faqItems = [
  {
    q: "Как именно создаётся песня? Расскажите про процесс",
    a: "process-block",
  },
  {
    q: "Вы используете искусственный интеллект?",
    a: "Да, честно. Я использую AI (Suno, Udio) как профессиональный инструмент для создания аранжировки. Но я НЕ просто «генерирую за 5 минут». Я провожу глубинное интервью, лично пишу текст с хитовой структурой, сочиняю мелодию и загружаю её в AI. Работаю в студии как продюсер: подбираю голоса, инструменты, пишу детальные промты для каждой части. Могу добавить живой вокал (пакет Premium).",
  },
  {
    q: "Чем вы отличаетесь от тех, кто «генерирует в Suno»?",
    a: "1. Глубинное интервью — вытаскиваю смыслы, которые вы сами не замечаете. 2. Профессиональный текст — пишу сама с пониманием ритма, хитовой структуры, эмоциональных крючков. 3. Авторская мелодия — сочиняю её сама и загружаю в AI. 4. Продюсерская работа — подбираю голоса, инструменты, персоны. Результат: профессиональная песня, которую невозможно отличить от студийной.",
  },
  {
    q: "Могу ли я использовать песню в бизнесе, рекламе, соцсетях?",
    a: "Базовый пакет — для личного использования. Если планируете использовать трек коммерчески (реклама, монетизация, продажа), выберите пакет с передачей коммерческих авторских прав — он специально создан для этого.",
  },
  {
    q: "Сколько времени занимает создание?",
    a: "Пакет «Стандарт» — 2–3 дня. Пакет с живым вокалом — 5–7 дней. Срочный заказ обсуждается индивидуально — пишите в Telegram.",
  },
];

const steps = [
  {
    num: "01",
    icon: "FileText",
    title: "Вы заполняете анкету",
    desc: "Рассказываете историю, важные даты, имена, любимый жанр получателя. Это займёт 5–10 минут.",
  },
  {
    num: "02",
    icon: "PenLine",
    title: "Я пишу текст и создаю музыку",
    desc: "На основе смыслов из интервью лично пишу текст и подбираю аранжировку. При желании — добавляем живой вокал или голос самого заказчика.",
    img: STUDIO_IMG,
  },
  {
    num: "03",
    icon: "Play",
    title: "Вы слушаете демо",
    desc: "Присылаем черновой вариант. Вы можете внести правки бесплатно — добавить слова, изменить темп, скорректировать настроение.",
  },
  {
    num: "04",
    icon: "Gift",
    title: "Получаете готовый трек",
    desc: "Качественный аудиофайл + видео-слайдшоу из ваших фото в подарок. Файл ваш навсегда.",
  },
];

const portfolioTracks = [
  {
    img: COVER1_IMG,
    title: "Зрячее сердце",
    occasion: "Юбилей бабушки 85 лет",
    desc: "Семья поздравляла свою слепую бабушку. В её памяти живы картинки из прошлого — и эта песня стала талисманом любви всей семьи к своему любимому человеку.",
    genre: "Душевная лирика",
    icon: "Heart",
    link: "https://vk.ru/audio69559731_456239232",
    lyrics: `Куплет 1:
Ты помнишь тот поезд и первый твой шаг,
На Север холодный, сквозь вьюгу и мрак?
Пусть сказка любви не осталась навек,
Но жизнь началась, как течение рек.

Ты выбрала жизнь, не боясь ничего,
И светлую долю сплела из него.
Твой трудный маршрут сквозь метели и снег —
Дал корни семье, дав начало для всех.

Припев:
И пусть твои глазки не видят рассвет,
Ты — зрячее сердце, дарящее свет.
И письма от Генки, как вечный огонь,
Согреют в морозы родную ладонь.

Большая любовь — это мы, твоя кровь,
В заботе семьи расцвела она вновь!
И дочки, и сын, и внучата твои —
Надежная гавань огромной любви.

Куплет 2:
Устало от бед и тревог твое тело,
Но сколько добра ты на свете успела!
Теперь отдавайся и неге, и сну,
Под эту мелодию встретив весну.

Пусть наши ладони согреют твой дом,
И тихая музыка льется кругом.
Те нежные письма из первой любви —
Всегда с тобой рядом, как искра в крови...

Припев:
И пусть твои глазки не видят рассвет,
Ты — зрячее сердце, дарящее свет.
И письма от Генки, как вечный огонь,
Согреют в морозы родную ладонь.

Большая любовь — это мы, твоя кровь,
В заботе семьи расцвела она вновь!
И дочки, и сын, и внучата твои —
Надежная гавань огромной любви.

Мост:
Послушай, родная... сквозь годы вдали,
То голос не наш над простором земли.
То ты — молодая, сквозь время летишь,
В красивом наряде так мягко паришь...

Из прошлого в вечность протянута нить,
Чтоб всех нас любить... чтобы просто здесь быть.

Припев:
И пусть твои глазки не видят рассвет,
Ты — зрячее сердце, дарящее свет.
И письма от Генки, как вечный огонь,
Согреют в морозы родную ладонь.

Большая любовь — это мы, твоя кровь,
В заботе семьи расцвела она вновь...

Как тот сиреневый, ласковый дым...
Мы держим за руки и рядом стоим.
Ты — зрячее сердце...

Пой... отдыхай...
Твоя любовь с нами.
Просто... знай.`,
  },
  {
    img: COVER2_IMG,
    title: "Мирный воин",
    occasion: "Папе на 23 февраля",
    desc: "Отец-добытчик, который сражается не на войне, а в ежедневной жизни. Защищает семью, помогает внуку расти и создаёт наследие для своих близких.",
    genre: "Авторская песня",
    icon: "Shield",
    link: "https://vk.ru/audio69559731_456239231",
    lyrics: `Куплет 1:
В наших краях нельзя играть в игру
Здесь нужно быть солдатом и в миру
Здесь не забалуешь, здесь суровый край
Хочешь жить достойно — значит, созидай.
Ты выбрал путь, где нужно рисковать
Чтоб нам с тобою бед и горьких слёз не знать.

Припев:
Отец родной!
Ты — наша сила, ты — наша стена!
Отец родной!
За твоей спиной всегда весна.
Ты добываешь счастье и покой
Своим умом, и сердцем... и рукой.
Ты наш герой!

Куплет 2:
Светлое небо, тёплый, прочный кров
Это плоды твоих мужских трудов.
Лидер по духу, смелостью берёшь
Ты защищаешь нас, ты нас ведёшь.
В этой жизни сложной ты нашёл ответ:
С нами твоя сила и твой яркий свет.

Припев:
Отец родной!
Ты — наша сила, ты — наша стена!
Отец родной!
За твоей спиной всегда весна.
Ты добываешь счастье и покой
Своим умом, и сердцем... и рукой.
Ты наш герой!

Мост:
Пусть эта песня радует тебя
Мы ценим, любим... И, судьбу благодаря,
Мы знаем точно — ты наш капитан,
Хранитель наших душ и наших стран.
Твоё сердце знает — мы всегда с тобой!

Финал:
Отец родной!
Ты — наша сила, ты — наша стена!
Отец родной!
За твоей спиной всегда весна.
Ты добываешь счастье и покой
Своим умом, и сердцем... и рукой.

Ты наш герой...
Ты наш герой...
Всегда...`,
  },
];

const reviews = [
  {
    name: "Евгения Левченко",
    city: "Братск",
    text: "Огромное спасибо за работу! Вы даже не представляете, какие эмоции были у мужа — 100% попадание в самое сердце. Всё, что я хотела сказать, но не могла выразить словами — вы взяли и воплотили это в реальность. Муж был в слезах. Это бесценно.",
    emoji: "😭",
  },
];


export default function PesnyaVPodarok() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openLyrics, setOpenLyrics] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);

  const scrollToCalc = () => {
    document.getElementById("calculator-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    document.getElementById("calculator-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: "#0E0B1A", color: "#F6F1FF" }}>

      {/* Модальный калькулятор */}
      {calcOpen && <OrderCalculator onClose={() => setCalcOpen(false)} />}

      {/* Sticky CTA button */}
      <a
        href="https://t.me/izmailova8888"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl text-white text-sm font-semibold transition-transform hover:scale-105"
        style={{ background: "linear-gradient(135deg, #A855F7 0%, #FF4DA6 100%)", boxShadow: "0 8px 24px rgba(168,85,247,0.5)" }}
      >
        <Icon name="Send" size={18} />
        Написать в Telegram
      </a>

      {/* ─── NAV ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50" style={{ background: "rgba(14,11,26,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(168,85,247,0.2)" }}>
        <div className="container mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">

          {/* Логотип */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/589a2648-75cb-485c-aeed-7d4aae46cdaa.jpeg"
              alt="AI Muse Lab — авторские песни на заказ"
              className="h-10 w-auto rounded-xl object-cover"
              style={{ maxWidth: 120 }}
            />
          </Link>

          {/* Ссылки — десктоп */}
          <div className="hidden md:flex items-center gap-0.5">
            {[
              { to: "/uslugi", label: "Услуги", icon: "Sparkles" },
              { to: "/portfolio", label: "Портфолио", icon: "Headphones" },
              { to: "/otzyvy", label: "Отзывы", icon: "Star" },
              { to: "/o-nas", label: "О нас", icon: "User" },
              { to: "/faq", label: "FAQ", icon: "HelpCircle" },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:text-white hover:bg-white/5"
                style={{ color: "#B8ABCF" }}
              >
                <Icon name={link.icon as "Star"} size={13} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-2">
            {/* Кнопка «На главную» — на внутренних страницах не нужна, здесь скролл к форме */}
            <button
              onClick={scrollToForm}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 text-white"
              style={{ background: "linear-gradient(135deg, #A855F7 0%, #FF4DA6 100%)" }}
            >
              <Icon name="Mic" size={13} />
              Заказать песню
            </button>
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={{ background: "rgba(168,85,247,0.1)", color: "#B8ABCF", border: "1px solid rgba(168,85,247,0.3)" }}
            >
              <Icon name="Send" size={12} />
              Telegram
            </a>
            {/* Гамбургер */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-all"
              style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Меню"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={17} style={{ color: "#A855F7" }} />
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t" style={{ background: "rgba(14,11,26,0.99)", borderColor: "rgba(168,85,247,0.2)" }}>
            <div className="px-4 py-4 flex flex-col gap-1">
              {[
                { to: "/uslugi", label: "Услуги", icon: "Sparkles", desc: "Все наши направления" },
                { to: "/portfolio", label: "Портфолио", icon: "Headphones", desc: "Послушать примеры" },
                { to: "/otzyvy", label: "Отзывы", icon: "Star", desc: "Что говорят клиенты" },
                { to: "/o-nas", label: "О нас", icon: "User", desc: "Юлия и команда" },
                { to: "/faq", label: "FAQ", icon: "HelpCircle", desc: "Частые вопросы" },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/5"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(168,85,247,0.15)" }}>
                    <Icon name={link.icon as "Star"} size={15} style={{ color: "#A855F7" }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{link.label}</div>
                    <div className="text-xs" style={{ color: "#B8ABCF" }}>{link.desc}</div>
                  </div>
                  <Icon name="ChevronRight" size={14} style={{ color: "#A855F7", marginLeft: "auto" }} />
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: "rgba(168,85,247,0.2)" }}>
                <button
                  onClick={() => { scrollToForm(); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #A855F7 0%, #FF4DA6 100%)" }}
                >
                  <Icon name="Mic" size={16} />
                  Заказать песню
                </button>
                <a
                  href="https://t.me/izmailova8888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(168,85,247,0.1)", color: "#B8ABCF", border: "1px solid rgba(168,85,247,0.3)" }}
                >
                  <Icon name="Send" size={15} />
                  Написать в Telegram
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center" style={{ background: "#0A0718" }}>
        {/* Фоновое фото */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})`, opacity: 0.12 }} />
        {/* Градиентная маска */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,7,24,0.7) 0%, rgba(10,7,24,0.85) 60%, #0A0718 100%)" }} />
        {/* Центральное сияние */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(168,85,247,0.25) 0%, transparent 65%)" }} />
        {/* Боковые акценты */}
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-1/4 -right-20 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,77,166,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
        {/* Логотип как декоративный фон */}
        <img
          src="https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/589a2648-75cb-485c-aeed-7d4aae46cdaa.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -55%)", width: "80%", maxWidth: 800, opacity: 0.18, mixBlendMode: "screen", filter: "blur(0px)" }}
        />

        <div className="relative z-10 container mx-auto max-w-4xl px-6 pt-24 pb-10 text-center flex flex-col items-center">

          {/* Бейдж */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.35)", color: "#C4B5FD" }}>
            <span style={{ color: "#A855F7" }}>✦</span> Юлия Измайлова — профессиональный композитор · 5 альбомов
          </div>
          {/* Заголовок */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-8" style={{ letterSpacing: "-0.02em" }}>
            Ваша история × Технологии будущего<br />
            <span style={{ background: "linear-gradient(135deg, #C084FC 0%, #F472B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>=&nbsp;Идеальная песня</span>
          </h1>
          {/* Главная CTA кнопка */}
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl mb-12"
            style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)", boxShadow: "0 8px 32px rgba(168,85,247,0.5)" }}
          >
            <Icon name="Music2" size={20} />
            Создать свою песню
          </button>

          <p className="text-base font-bold uppercase tracking-widest mb-6" style={{ background: "linear-gradient(90deg, #C084FC, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.2em" }}>
            ✦ AI Muse Lab создаёт ✦
          </p>

          {/* 1 карточка — Песни и хиты на заказ */}
          <div className="w-full max-w-xs mx-auto text-left">
            <div
              className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div className="relative h-28 overflow-hidden">
                <img src={WEDDING_IMG} alt="Песни и хиты на заказ" className="w-full h-full object-cover" style={{ opacity: 0.45 }} loading="lazy" decoding="async" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #3B0764 0%, #6B21A8 60%, #9333EA 100%)", opacity: 0.75 }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <Icon name="Gift" size={22} style={{ color: "#fff" }} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-4" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)" }}>
                <h3 className="font-bold text-white text-base mb-2 leading-snug">Песни и хиты на заказ</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "rgba(196,181,253,0.75)" }}>Персональные песни по вашей истории, живой вокал, семейные хиты.</p>
                <button
                  onClick={() => document.getElementById("gift-song-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 w-full"
                  style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)", color: "#fff" }}
                >
                  Выбрать песню
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 pb-8 flex justify-center text-white/40 animate-bounce">
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* ─── PROBLEM BLOCK ────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#A855F7" }}>Задумайтесь</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#1A1030" }}>
            Что подарить человеку,<br />у которого всё есть?
          </h2>
          <p className="text-center text-lg md:text-xl mb-14 max-w-xl mx-auto" style={{ color: "#6B5E91", lineHeight: 1.6 }}>
            Вы уже думали об этом. И, скорее всего, снова остановились на чём-то стандартном.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bad */}
            <div className="p-8 rounded-2xl" style={{ background: "#F8F5FF", border: "1px solid #E9E3F7" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#FEE2E2" }}>
                  <Icon name="X" size={20} style={{ color: "#EF4444" }} />
                </div>
                <h3 className="font-bold text-xl" style={{ color: "#6B5E91" }}>Стандартный подарок</h3>
              </div>
              <ul className="space-y-4">
                {["Постоит на полке и забудется через неделю", "Деньги потрачены, а радости — на час", "Такой же подарок уже дарили другие", "Безделушка без смысла и истории"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-base" style={{ color: "#9688B8" }}>
                    <Icon name="Minus" size={16} style={{ color: "#C4B5FD", flexShrink: 0, marginTop: 3 }} />
                    <span style={{ textDecoration: "line-through" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Good */}
            <div className="p-8 rounded-2xl relative" style={{ background: "linear-gradient(135deg, #FAF5FF 0%, #FDF2F8 100%)", border: "2px solid #A855F7", boxShadow: "0 8px 40px rgba(168,85,247,0.15)" }}>
              <div className="absolute -top-4 right-6">
                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}>Рекомендуем</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(236,72,153,0.15) 100%)" }}>
                  <Icon name="Heart" size={20} style={{ color: "#A855F7" }} />
                </div>
                <h3 className="font-bold text-xl" style={{ color: "#1A1030" }}>Персональная песня</h3>
              </div>
              <ul className="space-y-4">
                {["Слёзы радости на глазах в момент подарка", "Переслушивают снова и снова — годами", "Становится семейной реликвией", "Единственная в мире — только о вашем человеке"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-base font-medium" style={{ color: "#1A1030" }}>
                    <Icon name="CheckCircle2" size={18} style={{ color: "#A855F7", flexShrink: 0, marginTop: 2 }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#F3EFFF" }}>
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#A855F7" }}>Процесс</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#1A1030" }}>
            Как это работает?
          </h2>
          <p className="text-center text-lg md:text-xl mb-14 max-w-lg mx-auto" style={{ color: "#6B5E91", lineHeight: 1.6 }}>
            Всего 4 шага. Вам нужно только рассказать историю.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="p-7 rounded-2xl relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid rgba(168,85,247,0.12)", boxShadow: "0 2px 16px rgba(168,85,247,0.07)" }}>
                <div className="absolute -top-3 -right-3 text-8xl font-black pointer-events-none select-none" style={{ color: "rgba(168,85,247,0.06)", lineHeight: 1 }}>{step.num}</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.1) 100%)" }}>
                    <Icon name={step.icon as "FileText"} size={22} style={{ color: "#A855F7" }} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: "#1A1030" }}>{step.title}</h3>
                </div>
                <p className="text-base leading-relaxed" style={{ color: "#6B5E91" }}>{step.desc}</p>
                {step.img && (
                  <div className="mt-4 rounded-xl overflow-hidden h-36">
                    <img src={step.img} alt={`Процесс создания авторской песни на заказ — ${step.title}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ────────────────────────────────────────── */}
      <section id="portfolio-section" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0F0A1E 0%, #1A0A30 50%, #0A0F20 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(168,85,247,0.1) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 30% at 80% 30%, rgba(236,72,153,0.08) 0%, transparent 60%)" }} />
        <div className="container mx-auto max-w-2xl relative z-10">

          {/* Заголовок */}
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.35)", color: "#C084FC" }}
          >
            Портфолио · Слушай прямо здесь
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-white leading-tight">
            Послушай прежде, чем заказывать —{" "}
            <span style={{ background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              3 реальные песни по историям людей
            </span>
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(196,181,253,0.8)" }}>
            Боишься, что песня не тронет? Послушай — и пойми, каково это, когда музыка попадает прямо в сердце.
          </p>

          {/* Плеер */}
          <AudioPlayer tracks={playerTracks} />

          {/* Послушать больше */}
          <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(168,85,247,0.2)", backdropFilter: "blur(10px)" }}>
            <h3 className="text-xl font-extrabold text-white mb-5">Послушать больше примеров работ</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-7 text-base" style={{ color: "rgba(196,181,253,0.8)" }}>
              <div className="flex items-start gap-2">
                <span className="text-base leading-none mt-0.5">💡</span>
                <span><strong className="text-white">Более 100 работ</strong> в разных жанрах: от душевной лирики до зажигательного диско</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base leading-none mt-0.5">❤️</span>
                <span><strong className="text-white">Для любого повода:</strong> день рождения, свадьба, юбилей, годовщина</span>
              </div>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #A855F7 0%, #FF4DA6 100%)" }}
            >
              <Icon name="Headphones" size={18} />
              Все примеры работ →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ──────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#FDF8F0" }}>
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#A855F7" }}>Отзывы</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#1A1030" }}>
            Что говорят те, кто уже подарил
          </h2>
          <p className="text-center text-lg md:text-xl mb-14 max-w-lg mx-auto" style={{ color: "#6B5E91", lineHeight: 1.6 }}>
            Настоящие истории, настоящие эмоции
          </p>
          {/* Один отзыв */}
          <div className="max-w-2xl mx-auto mb-10">
            {reviews.map((r, i) => (
              <div key={i} className="p-8 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid rgba(168,85,247,0.12)", boxShadow: "0 4px 32px rgba(168,85,247,0.1)" }}>
                <div className="text-4xl mb-4">{r.emoji}</div>
                <p className="text-lg leading-relaxed mb-6 italic" style={{ color: "#2D2050" }}>«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-base" style={{ color: "#1A1030" }}>{r.name}</p>
                    <p className="text-sm" style={{ color: "#9688B8" }}>г. {r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Статистика */}
          <div className="max-w-2xl mx-auto rounded-2xl p-8" style={{ background: "#FFFFFF", border: "1px solid rgba(168,85,247,0.15)", boxShadow: "0 4px 24px rgba(168,85,247,0.08)" }}>
            <div className="grid grid-cols-2 gap-5 mb-8">
              {[
                { icon: "⭐⭐⭐⭐⭐", label: "средний рейтинг", value: "5.0 из 5.0" },
                { icon: "✅", label: "довольных клиентов по всей России", value: "100+" },
                { icon: "💬", label: "рекомендуют нас своим друзьям", value: "98%" },
                { icon: "😭", label: "получателей плакали от счастья", value: "100%" },
              ].map(stat => (
                <div key={stat.value} className="text-center">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-extrabold" style={{ color: "#A855F7" }}>{stat.value}</div>
                  <div className="text-sm mt-1" style={{ color: "#9688B8" }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/otzyvy"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}
              >
                <Icon name="MessageSquare" size={18} />
                Читать все отзывы →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────── */}
      <section id="gift-song-section" className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div style={{ height: 4, background: "linear-gradient(90deg, #A855F7 0%, #EC4899 100%)" }} />
        <div className="container mx-auto max-w-6xl pt-14">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#A855F7" }}>Стоимость</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#1A1030" }}>
            Цены и тарифы
          </h2>
          <p className="text-center text-lg md:text-xl mb-14 max-w-lg mx-auto" style={{ color: "#6B5E91", lineHeight: 1.6 }}>
            Никаких скрытых платежей — всё включено
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">

            {/* Тариф 1 — Музыкальное СМС */}
            <div className="p-7 rounded-2xl flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg" style={{ border: "1px solid #E9E3F7", background: "#FAFAFE" }}>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: "#EDE9FE", color: "#7C3AED" }}>
                  Музыкальное СМС
                </span>
              </div>
              <h3 className="font-extrabold text-xl mb-3" style={{ color: "#1A1030" }}>Музыкальное СМС</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#6B5E91" }}>1 минута вашей истории. Идеально для короткого, но очень личного поздравления в соцсетях или мессенджере.</p>
              <div className="text-4xl font-extrabold mb-6" style={{ color: "#A855F7" }}>1 990 ₽</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Ваш текст или смысл текста",
                  "AI-аранжировка в выбранном стиле",
                  "Срок: 1 час",
                  "Файл в MP3",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#4A3F6B" }}>
                    <Icon name="Check" size={14} style={{ color: "#A855F7", flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-4 rounded-xl font-bold" variant="outline" style={{ borderColor: "#A855F7", color: "#A855F7" }}>
                Заказать мини
              </Button>
            </div>

            {/* Тариф 2 — Признание */}
            <div className="p-7 rounded-2xl flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg" style={{ border: "1px solid #E9E3F7", background: "#FAFAFE" }}>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: "#FCE7F3", color: "#9D174D" }}>
                  Признание
                </span>
              </div>
              <h3 className="font-extrabold text-xl mb-3" style={{ color: "#1A1030" }}>Признание</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#6B5E91" }}>Полноценная песня, которая расскажет всё, что у вас на сердце. Для тех, кто хочет тронуть до слёз.</p>
              <div className="text-4xl font-extrabold mb-6" style={{ color: "#A855F7" }}>5 000 ₽</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Полная песня (куплеты, припевы)",
                  "AI-аранжировка",
                  "Авторский текст на основе личного интервью с композитором",
                  "Срок: 1 день",
                  "Файл в MP3",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#4A3F6B" }}>
                    <Icon name="Check" size={14} style={{ color: "#A855F7", flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-4 rounded-xl font-bold" variant="outline" style={{ borderColor: "#A855F7", color: "#A855F7" }}>
                Заказать признание
              </Button>
            </div>

            {/* Тариф 3 — Сюрприз (выделенная) */}
            <div className="p-7 rounded-2xl relative flex flex-col" style={{ border: "2px solid #A855F7", background: "linear-gradient(135deg, #FAF5FF 0%, #FDF2F8 100%)", boxShadow: "0 16px 48px rgba(168,85,247,0.18)", transform: "scale(1.02)" }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <Badge className="px-4 py-1.5 text-sm font-bold rounded-full" style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)", color: "#fff" }}>
                  Популярный выбор
                </Badge>
              </div>
              <div className="mb-4 mt-2">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: "rgba(168,85,247,0.12)", color: "#7C3AED" }}>
                  Сюрприз
                </span>
              </div>
              <h3 className="font-extrabold text-xl mb-3" style={{ color: "#1A1030" }}>Сюрприз</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#6B5E91" }}>Всё из «Признания» + полные права и релиз на стримингах. Чтобы ваш подарок услышал весь мир.</p>
              <div className="text-4xl font-extrabold mb-6" style={{ color: "#A855F7" }}>9 900 ₽</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Всё из тарифа «Признание»",
                  "Передача коммерческих прав",
                  "Публикация на Яндекс Музыке и VK Музыке",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-medium" style={{ color: "#1A1030" }}>
                    <Icon name="Check" size={14} style={{ color: "#A855F7", flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-4 rounded-xl font-bold text-white" style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}>
                Устроить сюрприз
              </Button>
            </div>

            {/* Тариф 4 — Хит */}
            <div className="p-7 rounded-2xl flex flex-col" style={{ border: "2px solid #EC4899", background: "linear-gradient(135deg, #FDF2F8 0%, #FAF5FF 100%)" }}>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "rgba(255,77,166,0.2)", color: "#FF4DA6" }}>
                  Хит
                </span>
              </div>
              <h3 className="font-extrabold text-xl mb-3" style={{ color: "#1A1030" }}>Хит</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#6B5E91" }}>Максимальное звучание. Студийный живой вокал, бэк-вокал, сведение. Для особенных моментов.</p>
              <div className="text-4xl font-extrabold mb-6" style={{ color: "#EC4899" }}>29 900 ₽</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Всё из тарифа «Сюрприз»",
                  "Живой профессиональный вокал вместо AI",
                  "Студийная запись и сведение",
                  "Бэк-вокал",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-medium" style={{ color: "#1A1030" }}>
                    <Icon name="Check" size={14} style={{ color: "#EC4899", flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-4 rounded-xl font-bold text-white" style={{ background: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)" }}>
                Создать хит
              </Button>
            </div>

          </div>

          <div className="mt-10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 justify-between" style={{ background: "#F3EFFF", border: "1px solid rgba(168,85,247,0.2)" }}>
            <div className="flex items-start gap-3">
              <Icon name="Clock" size={20} style={{ color: "#A855F7", flexShrink: 0, marginTop: 2 }} />
              <div>
                <p className="font-bold text-base" style={{ color: "#1A1030" }}>Не более 5 заказов в неделю</p>
                <p className="text-base mt-0.5" style={{ color: "#6B5E91" }}>Как композитор я глубоко погружаюсь в каждую историю. Перед праздниками все слоты занимаются заранее — бронируйте место.</p>
              </div>
            </div>
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-transform hover:scale-105 shrink-0"
              style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}
            >
              <Icon name="Send" size={15} />
              Забронировать место
            </a>
          </div>
          <p className="text-center mt-4 text-sm" style={{ color: "#9688B8" }}>
            Не уверены какой пакет подходит? Напишите нам — поможем выбрать за 5 минут.
          </p>
        </div>
      </section>

      {/* ─── GIFT FORM ────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0F0A1E 0%, #1A0A30 50%, #0A0F20 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 60%)" }} />
        <div className="container mx-auto max-w-lg relative z-10">
          <div className="text-center mb-8">
            <div
              className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.35)", color: "#C084FC" }}
            >
              Подарок от нас
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-white leading-tight">
              Ещё не решили? Получите подарок, пока выбираете
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(196,181,253,0.75)" }}>
              Расскажите в двух словах, зачем вы сегодня зашли, и выберите подарок. Я отправлю его на указанный Telegram / WhatsApp или почту.
            </p>
          </div>
          <GiftForm />
        </div>
      </section>

      {/* ─── CALCULATOR ───────────────────────────────────────── */}
      <section id="calculator-section" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A0533 0%, #0D1B4B 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(168,85,247,0.2) 0%, transparent 60%)" }} />
        <div className="absolute top-10 left-10 text-8xl opacity-5 pointer-events-none select-none">🎵</div>
        <div className="absolute bottom-10 right-10 text-8xl opacity-5 pointer-events-none select-none">🎶</div>
        <div className="container mx-auto max-w-lg relative z-10">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#C084FC" }}>Заполнить форму</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-white">
            Заполните форму и узнайте стоимость
          </h2>
          <p className="text-center text-lg mb-10" style={{ color: "rgba(196,181,253,0.8)" }}>
            Несколько вопросов — и вы получите точный расчёт + подарок 🎁
          </p>
          <OrderCalculator inline />
        </div>
      </section>

      {/* ─── ABOUT AUTHOR ─────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "#FFF5F7" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(236,72,153,0.06) 0%, transparent 60%)" }} />
        <div className="container mx-auto max-w-4xl relative z-10">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#EC4899" }}>Автор</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12" style={{ color: "#1A1030" }}>
            Кто создаёт ваши песни?
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Фото */}
            <div className="flex-shrink-0">
              <img
                src="https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/344bf7da-4f0c-4b6b-ab42-6cc2b9daded2.jpeg"
                alt="Юлия Измайлова — основательница AI Muse Lab"
                className="w-52 h-52 md:w-64 md:h-64 rounded-3xl object-cover shadow-xl"
                style={{ border: "2px solid #EC4899", boxShadow: "0 16px 48px rgba(236,72,153,0.2)" }}
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Текст */}
            <div className="flex-1">
              <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#EC4899" }}>Основательница AI Muse Lab</p>
              <h3 className="text-2xl font-extrabold mb-4" style={{ color: "#1A1030" }}>Юлия Измайлова</h3>
              <p className="text-base mb-1" style={{ color: "#6B5E91" }}>профессиональный композитор и автор текстов</p>
              <div className="space-y-3 my-5">
                {[
                  "10+ лет опыта создания авторских песен",
                  "5 выпущенных альбомов (GALAKTIKA)",
                  "Более 100 персональных песен для клиентов",
                  "Публикации на Яндекс Музыке, Spotify, VK Музыке",
                ].map(item => (
                  <div key={item} className="flex items-start gap-2 text-base" style={{ color: "#4A3F6B" }}>
                    <Icon name="Check" size={15} style={{ color: "#A855F7", marginTop: 2, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-5 mb-6" style={{ background: "#FFFFFF", border: "1px solid rgba(236,72,153,0.2)", boxShadow: "0 4px 16px rgba(236,72,153,0.08)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#EC4899" }}>Личный подход</p>
                <p className="text-base leading-relaxed" style={{ color: "#4A3F6B" }}>
                  Каждую историю Юлия изучает лично. Проводит глубинное интервью, вникает в детали, переносит эмоции в текст и музыку.
                </p>
                <p className="text-base font-semibold mt-2" style={{ color: "#1A1030" }}>
                  Это не автоматическая генерация — это авторская работа с душой.
                </p>
              </div>
              <Link
                to="/o-nas"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}
              >
                <Icon name="User" size={16} />
                Узнать больше о команде →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#F7F5FF" }}>
        <div className="container mx-auto max-w-3xl">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#A855F7" }}>FAQ</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14" style={{ color: "#1A1030" }}>
            Вопросы и ответы
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-pointer rounded-2xl transition-all"
                style={{ background: "#FFFFFF", border: openFaq === i ? "1px solid #A855F7" : "1px solid #E9E3F7", boxShadow: openFaq === i ? "0 4px 24px rgba(168,85,247,0.12)" : "0 2px 8px rgba(0,0,0,0.04)" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className="font-semibold text-base pr-4" style={{ color: "#1A1030" }}>{item.q}</h3>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={20} style={{ color: "#A855F7", flexShrink: 0 }} />
                </div>
                {openFaq === i && item.a !== "process-block" && (
                  <div className="px-6 pb-6 text-base leading-relaxed" style={{ color: "#4A3F6B" }}>
                    {item.a}
                  </div>
                )}
                {openFaq === i && item.a === "process-block" && (
                  <div className="px-6 pb-6">
                    <p className="text-base mb-4" style={{ color: "#4A3F6B" }}>
                      Да, я использую AI (Suno, Udio) — но это не «генерация за 5 минут». Это профессиональное продюсирование с помощью технологий будущего.
                    </p>
                    <div className="grid sm:grid-cols-5 gap-3 mb-5">
                      {[
                        { icon: "MessageSquare", step: "01", title: "Глубинное интервью", desc: "Лично беседую с вами, вытаскиваю смыслы и детали, которые вы сами не замечаете" },
                        { icon: "PenLine", step: "02", title: "Хитовый текст", desc: "Пишу текст сама — с пониманием ритма, хитовой структуры, эмоциональных крючков" },
                        { icon: "Music2", step: "03", title: "Авторская мелодия", desc: "Сочиняю неповторимую мелодию, подбираю жанр, настроение, делаю детальную разбивку" },
                        { icon: "Cpu", step: "04", title: "AI-продюсирование", desc: "Работаю в AI-студии как продюсер: голоса, персоны, инструменты, промты для каждой части" },
                        { icon: "Sparkles", step: "05", title: "Финализация", desc: "Могу добавить живой вокал на аранжировку — до идеального студийного звучания" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl" style={{ background: "#F3EFFF", border: "1px solid rgba(168,85,247,0.15)" }}>
                          <div className="text-xs font-black mb-2 w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}>{item.step}</div>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: "rgba(168,85,247,0.12)" }}>
                            <Icon name={item.icon as "Music2"} size={16} style={{ color: "#A855F7" }} />
                          </div>
                          <h4 className="font-bold text-xs mb-1" style={{ color: "#1A1030" }}>{item.title}</h4>
                          <p className="text-xs leading-relaxed" style={{ color: "#6B5E91" }}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl p-4" style={{ background: "#F3EFFF", border: "1px solid rgba(168,85,247,0.15)" }}>
                      <p className="text-base" style={{ color: "#4A3F6B" }}>
                        <strong style={{ color: "#1A1030" }}>Аналогия:</strong> Фотограф использует Photoshop. Без таланта — Photoshop бесполезен. Так же и с AI в музыке. Вы платите за экспертизу + мощь технологий.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Блок «Ещё остались вопросы?» */}
          <div className="mt-10 rounded-2xl p-8" style={{ background: "#FFFFFF", border: "1px solid rgba(168,85,247,0.15)", boxShadow: "0 4px 24px rgba(168,85,247,0.08)" }}>
            <h3 className="text-xl font-extrabold mb-3" style={{ color: "#1A1030" }}>Ещё остались вопросы?</h3>
            <p className="text-base mb-5" style={{ color: "#6B5E91" }}>У нас есть подробная страница с ответами на 25+ вопросов:</p>
            <div className="grid sm:grid-cols-2 gap-2 mb-6">
              {[
                { icon: "💰", text: "Стоимость и оплата" },
                { icon: "⏱️", text: "Сроки и процесс" },
                { icon: "🎤", text: "О вокале и качестве" },
                { icon: "✍️", text: "Текст и музыка" },
                { icon: "📜", text: "Авторские права" },
                { icon: "✨", text: "...и многое другое!" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 text-base" style={{ color: "#4A3F6B" }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #A855F7 0%, #FF4DA6 100%)" }}
            >
              <Icon name="HelpCircle" size={16} />
              Все вопросы и ответы →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── OTHER SERVICES PROMO ─────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1C0A2E 0%, #2D0A1E 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 60% at 80% 50%, rgba(236,72,153,0.1) 0%, transparent 60%)" }} />
        <div className="container mx-auto max-w-5xl relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest mb-4 text-center" style={{ color: "#F9A8D4" }}>Дополнительные услуги</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-10 text-center">Кроме персональных песен я работаю с...</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "Film", title: "Музыкальные клипы", desc: "Профессиональное видео для вашего трека", price: "от 20 000 ₽" },
              { icon: "Captions", title: "Лирик-видео", desc: "Анимированный текст + визуалы для YouTube и соцсетей", price: "от 8 000 ₽" },
              { icon: "Palette", title: "Визуальный контент", desc: "Обложки релизов, карточки для соцсетей, аватары", price: "от 3 000 ₽" },
              { icon: "Star", title: "Артист под ключ", desc: "Трек + карточки + обучение релизам и продвижению на стримингах", price: "от 60 000 ₽" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-2" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(249,168,212,0.2)", backdropFilter: "blur(10px)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(249,168,212,0.15)" }}>
                  <Icon name={s.icon as "Film"} size={20} style={{ color: "#F9A8D4" }} />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-base leading-relaxed mb-4 flex-1" style={{ color: "rgba(249,168,212,0.75)" }}>{s.desc}</p>
                <p className="text-base font-extrabold" style={{ color: "#F9A8D4" }}>{s.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/uslugi"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)" }}
            >
              <Icon name="Video" size={18} />
              Подробнее об услугах
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────── */}
      <section id="form-section" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #6B21A8 0%, #9D174D 100%)" }}>
        {/* Фоновые музыкальные ноты */}
        <div className="absolute top-8 left-8 text-9xl pointer-events-none select-none" style={{ opacity: 0.06, fontSize: 120 }}>🎵</div>
        <div className="absolute bottom-8 right-8 text-9xl pointer-events-none select-none" style={{ opacity: 0.06, fontSize: 100 }}>🎶</div>
        <div className="absolute top-1/2 left-1/3 text-9xl pointer-events-none select-none" style={{ opacity: 0.04, fontSize: 80 }}>🎸</div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />
        <div className="relative z-10 container mx-auto max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>Готовы начать?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
            Готовы подарить эмоции,<br />которые не купить в магазине?
          </h2>
          <p className="text-lg md:text-xl mb-10" style={{ color: "rgba(255,255,255,0.8)" }}>
            Напишите нам — и мы свяжемся в течение 15 минут
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/AIMusalab_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg transition-transform hover:scale-105 shadow-xl"
              style={{ background: "#FFFFFF", color: "#7C3AED", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
            >
              <Icon name="Bot" size={22} />
              Оставить заявку через бота
            </a>
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg transition-transform hover:scale-105 shadow-xl"
              style={{ background: "rgba(255,255,255,0.15)", color: "#FFFFFF", border: "2px solid rgba(255,255,255,0.4)" }}
            >
              <Icon name="Send" size={22} />
              Написать лично
            </a>
          </div>
          <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Отвечаем в течение 15 минут в рабочее время
          </p>
        </div>
      </section>

      {/* ─── SEO TEXT (скрыт визуально, индексируется поисковиками) ───── */}
      <section aria-hidden="false" className="sr-only">
        <h2>Заказать авторскую песню в подарок — AI Muse Lab</h2>
        <h3>Персональная песня на заказ от 5 000 рублей</h3>
        <p>
          AI Muse Lab — сервис по созданию уникальных авторских персональных песен на заказ. Вы можете заказать
          персональную песню в подарок на день рождения, свадьбу, юбилей, годовщину, 8 марта, 23 февраля,
          выпускной, корпоратив, новый год или просто так — без повода. Мы пишем авторский текст и музыку
          специально под вашу историю. Результат готов за 2–3 дня.
        </p>
        <h3>Что такое персональная песня в подарок?</h3>
        <p>
          Персональная песня — это уникальный музыкальный подарок, созданный специально для вашего человека
          на основе его истории, имён, важных дат и воспоминаний. Это не шаблон и не генерация — это авторский
          трек, который будет только у вашего близкого. Именно поэтому персональная песня вызывает настоящие
          слёзы радости и становится семейной реликвией.
        </p>
        <h3>Стоимость авторской песни на заказ</h3>
        <p>
          Цены на создание авторской песни: базовый пакет «Стандарт» — 5 000 рублей, с голосом заказчика —
          7 000 рублей, коммерческое использование с передачей авторских прав — 9 900 рублей, с публикацией
          на Яндекс Музыке и VK Музыке — 14 900 рублей, с живым вокалом профессионального вокалиста — 29 900 рублей.
          Все пакеты включают бесплатные правки.
        </p>
        <h3>Для каких поводов заказывают песню в подарок</h3>
        <p>
          Песня на день рождения — самый популярный повод. Также заказывают: песню на юбилей (50, 60, 70 лет),
          песню на свадьбу или годовщину свадьбы, песню для мамы, песню для папы, песню для мужа, песню для жены,
          песню для любимого человека, песню на 8 марта, песню на 23 февраля, песню для бабушки или дедушки,
          корпоративную песню-гимн компании, песню для выпускников, детскую песню.
        </p>
        <h3>Как заказать авторскую песню онлайн</h3>
        <p>
          Заказать авторскую персональную песню онлайн очень просто. Нажмите кнопку «Создать свою песню» или
          напишите нам в Telegram @izmailova8888. Юлия Измайлова — профессиональный композитор с 10+ летним
          опытом — лично свяжется с вами, проведёт интервью и создаст уникальный трек по вашей истории.
          Работаем по всей России и СНГ дистанционно.
        </p>
        <h3>Чем отличается авторская песня от AI-генерации</h3>
        <p>
          В отличие от простой AI-генерации в Suno или Udio, мы проводим глубинное интервью, лично пишем
          авторский текст с хитовой структурой и эмоциональными крючками, сочиняем оригинальную мелодию.
          AI используется как профессиональный студийный инструмент под руководством опытного продюсера.
          Результат — профессиональная песня, которую невозможно отличить от студийной записи.
        </p>
        <p>
          Стоимость создания персональной песни: от 5 000 рублей. Живой вокал профессионального вокалиста,
          публикация на стриминговых платформах: Яндекс Музыка, VK Музыка, Spotify, Apple Music.
          Все пакеты включают гарантию правок. Более 100 довольных клиентов по всей России.
        </p>
      </section>

      <Footer />

      <CookieBanner />
    </div>
  );
}