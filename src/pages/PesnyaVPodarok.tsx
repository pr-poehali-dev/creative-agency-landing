import { useState } from "react";
import { Link } from "react-router-dom";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/4fee9940-7db1-4128-9a82-27b34ded74bb.jpg";
const VINYL_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/1b51b62f-525c-42f3-ac36-5114e5d51e17.jpg";
const STUDIO_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/add1436d-d6f3-42b3-bc70-66cf247e9536.jpg";
const WEDDING_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/0a89312a-7bdc-4e0f-958a-d1062ca38446.jpg";
const COVER1_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/7f709c21-11a6-43c8-a3cf-b64d5c8b338c.jpg";
const COVER2_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/94eafe8e-96cd-4ff9-b42b-e7a85c4d84d9.jpg";
const COVER3_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/f6343e46-9ca1-436a-bb15-e903c89a11c2.jpg";
const COVER4_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/63cbba21-6de2-47e5-b294-4f527f9a0329.jpg";
const COVER5_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/a26a653d-418e-4648-8a8e-fd98fe7a9976.jpg";


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

// Calculator questions
const calcQuestions = [
  {
    id: "who",
    question: "Кому дарите?",
    options: ["Маме / Папе", "Любимому человеку", "Другу / Подруге", "Всей семье"],
  },
  {
    id: "occasion",
    question: "Какой повод?",
    options: ["День рождения", "Свадьба / Годовщина", "Просто так, от сердца", "Другое"],
  },
  {
    id: "genre",
    question: "Какой жанр нравится получателю?",
    options: ["Спокойная лирика", "Поп / Эстрада", "Рок / Авторская", "Не знаю — вы выберите"],
  },
];

export default function PesnyaVPodarok() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcStep, setCalcStep] = useState(0);
  const [calcAnswers, setCalcAnswers] = useState<string[]>([]);
  const [calcDone, setCalcDone] = useState(false);
  const [openLyrics, setOpenLyrics] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCalcAnswer = (answer: string) => {
    const next = [...calcAnswers, answer];
    setCalcAnswers(next);
    if (calcStep < calcQuestions.length - 1) {
      setCalcStep(calcStep + 1);
    } else {
      setCalcDone(true);
    }
  };

  const scrollToForm = () => {
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: "#faf7f4", color: "#2d2016" }}>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'); body { font-family: 'Montserrat', sans-serif; }`}</style>

      {/* Sticky CTA button */}
      <a
        href="https://t.me/izmailova8888"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl text-white text-sm font-semibold transition-transform hover:scale-105"
        style={{ background: "#2563eb" }}
      >
        <Icon name="Send" size={18} />
        Написать в Telegram
      </a>

      {/* ─── NAV ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50" style={{ background: "rgba(20,10,3,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">

          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#c2410c" }}>
              <Icon name="Music2" size={14} style={{ color: "#fff" }} />
            </div>
            <span className="font-extrabold text-sm text-white tracking-wider hidden sm:block">AI MUSELAB</span>
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
                style={{ color: "#9a7a65" }}
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
              style={{ background: "#c2410c" }}
            >
              <Icon name="Mic" size={13} />
              Заказать песню
            </button>
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.07)", color: "#c9a882", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Icon name="Send" size={12} />
              Telegram
            </a>
            {/* Гамбургер */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-all"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Меню"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={17} style={{ color: "#f5c97a" }} />
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t" style={{ background: "rgba(15,7,2,0.99)", borderColor: "rgba(255,255,255,0.07)" }}>
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
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(194,65,12,0.2)" }}>
                    <Icon name={link.icon as "Star"} size={15} style={{ color: "#f5c97a" }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{link.label}</div>
                    <div className="text-xs" style={{ color: "#7a5c44" }}>{link.desc}</div>
                  </div>
                  <Icon name="ChevronRight" size={14} style={{ color: "#5a3d2b", marginLeft: "auto" }} />
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => { scrollToForm(); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: "#c2410c" }}
                >
                  <Icon name="Mic" size={16} />
                  Заказать песню
                </button>
                <a
                  href="https://t.me/izmailova8888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#c9a882", border: "1px solid rgba(255,255,255,0.08)" }}
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
      <section className="relative overflow-hidden" style={{ background: "#1a0f07" }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,15,7,0.6) 0%, rgba(26,15,7,0.95) 100%)" }} />

        <div className="relative z-10 container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            Ваша история × Технологии будущего<br />
            <span style={{ color: "#f5c97a" }}>=&nbsp;Идеальная песня</span>
          </h1>
          <p className="text-base md:text-lg mb-10" style={{ color: "#c9a882" }}>
            Юлия Измайлова — профессиональный композитор · 5 альбомов · AI-продюсирование
          </p>

          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#f5c97a" }}>
            Наша AI лаборатория создаёт:
          </p>

          {/* 4 карточки */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {[
              {
                emoji: "🎁",
                title: "Песни и хиты на заказ",
                desc: "Персональные песни в подарок, авторские треки по вашей истории, живой вокал, семейные и праздничные хиты.",
                btn: "Выбрать песню",
                href: "#gift-song",
                scroll: "gift-song-section",
              },
              {
                emoji: "🎬",
                title: "Музыка для бизнеса",
                desc: "Бренд-песни, джинглы, музыка для рекламы, YouTube, подкастов, презентаций, приложений и digital-проектов.",
                btn: "Для бизнеса",
                href: "/uslugi#business-music",
                scroll: null,
              },
              {
                emoji: "📹",
                title: "Видео и клипы AI",
                desc: "Музыкальные клипы, рекламные ролики, AI-визуалы, контент для соцсетей и презентационные видео.",
                btn: "Смотреть услуги",
                href: "/uslugi#ai-video",
                scroll: null,
              },
              {
                emoji: "🎤",
                title: "Артисты с нуля",
                desc: "Создание музыкального бренда, песни, визуальный стиль, релизы, дистрибуция и развитие артиста под ключ.",
                btn: "Запустить проект",
                href: "/uslugi#artist-from-zero",
                scroll: null,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <div className="text-3xl mb-3">{card.emoji}</div>
                <h3 className="font-extrabold text-white text-base mb-2">{card.title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#c9a882" }}>{card.desc}</p>
                {card.scroll ? (
                  <button
                    onClick={() => document.getElementById(card.scroll!)?.scrollIntoView({ behavior: "smooth" })}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105 w-full"
                    style={{ background: "#c2410c", color: "#fff" }}
                  >
                    {card.btn}
                  </button>
                ) : (
                  <Link
                    to={card.href}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105 w-full"
                    style={{ background: "rgba(255,255,255,0.10)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
                  >
                    {card.btn}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 pb-8 flex justify-center text-white/40 animate-bounce">
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* ─── PROBLEM BLOCK ────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#2d2016" }}>
            Что подарить человеку,<br />у которого всё есть?
          </h2>
          <p className="text-center text-lg mb-14" style={{ color: "#7a5c44" }}>
            Вы уже думали об этом. И, скорее всего, снова остановились на чём-то стандартном.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bad */}
            <Card className="p-8 border-2" style={{ borderColor: "#e5c9b5", background: "#fff8f0" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#fee2e2" }}>
                  <Icon name="X" size={20} style={{ color: "#dc2626" }} />
                </div>
                <h3 className="font-bold text-xl" style={{ color: "#7a5c44" }}>Стандартный подарок</h3>
              </div>
              <ul className="space-y-3">
                {["Постоит на полке и забудется через неделю", "Деньги потрачены, а радости — на час", "Такой же подарок уже дарили другие", "Безделушка без смысла и истории"].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-base" style={{ color: "#9a7a65" }}>
                    <span className="mt-1 shrink-0">🌸</span> <span style={{ textDecoration: "line-through" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </Card>
            {/* Good */}
            <Card className="p-8 border-2" style={{ borderColor: "#c2410c", background: "#fff4ec" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#fed7aa" }}>
                  <Icon name="Heart" size={20} style={{ color: "#c2410c" }} />
                </div>
                <h3 className="font-bold text-xl" style={{ color: "#c2410c" }}>Персональная песня</h3>
              </div>
              <ul className="space-y-3">
                {["Слёзы радости на глазах в момент подарка", "Переслушивают снова и снова — годами", "Становится семейной реликвией", "Единственная в мире — только о вашем человеке"].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-base font-medium" style={{ color: "#7a2e0e" }}>
                    <span className="mt-1 shrink-0">🎵</span> {t}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#faf7f4" }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#2d2016" }}>
            Как это работает?
          </h2>
          <p className="text-center text-lg mb-14" style={{ color: "#7a5c44" }}>
            Всего 4 простых шага. Вам нужно только рассказать историю.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <Card key={i} className="p-8 border-0 shadow-md relative overflow-hidden" style={{ background: "#fff" }}>
                <div className="absolute top-4 right-5 text-6xl font-black opacity-5" style={{ color: "#c2410c" }}>{step.num}</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: "#fde8d8" }}>
                    <Icon name={step.icon as "FileText"} size={24} style={{ color: "#c2410c" }} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: "#2d2016" }}>{step.title}</h3>
                </div>
                <p className="text-base leading-relaxed" style={{ color: "#7a5c44" }}>{step.desc}</p>
                {step.img && (
                  <div className="mt-4 rounded-xl overflow-hidden h-36">
                    <img src={step.img} alt={`Процесс создания авторской песни на заказ — ${step.title}`} className="w-full h-full object-cover" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ────────────────────────────────────────── */}
      <section id="portfolio-section" className="py-20 px-6" style={{ background: "#2d2016" }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-white">
            Реальные истории — реальные треки
          </h2>
          <p className="text-center text-lg mb-14" style={{ color: "#c9a882" }}>
            Живой вокал, профессиональная запись, настоящие эмоции
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioTracks.map((track, i) => (
              <Card key={i} className="overflow-hidden border-0 hover:shadow-2xl transition-all" style={{ background: "#3d2c1c" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img src={track.img} alt={`Авторская песня «${track.title}» — ${track.occasion}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,15,5,0.85) 40%, transparent)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: "rgba(194,65,12,0.85)", color: "#fff" }}>
                      {track.occasion}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(194,65,12,0.85)" }}>
                      <Icon name="Music" size={18} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={track.icon as "Heart"} size={14} style={{ color: "#f5c97a" }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5c97a" }}>{track.genre}</span>
                  </div>
                  <h3 className="font-extrabold text-white text-lg mb-2">«{track.title}»</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#c9a882" }}>{track.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {track.link && (
                      <a
                        href={track.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-transform hover:scale-105"
                        style={{ background: "#c2410c" }}
                      >
                        <Icon name="Play" size={13} /> Слушать
                      </a>
                    )}
                    {track.lyrics && (
                      <button
                        onClick={() => setOpenLyrics(openLyrics === i ? null : i)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-transform hover:scale-105"
                        style={{ background: "#5a3d2b", color: "#f5c97a" }}
                      >
                        <Icon name={openLyrics === i ? "ChevronUp" : "FileText"} size={13} />
                        {openLyrics === i ? "Скрыть" : "Текст"}
                      </button>
                    )}
                  </div>
                  {openLyrics === i && track.lyrics && (
                    <div className="mt-4 rounded-xl p-4 text-sm whitespace-pre-line leading-relaxed" style={{ background: "#2d2016", color: "#e8d5b7" }}>
                      {track.lyrics}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          {/* Блок «Хотите послушать больше?» */}
          <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: "#241508", border: "1px solid #3d2c1c" }}>
            <h3 className="text-xl font-extrabold text-white mb-5">Хотите послушать больше?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-7 text-sm" style={{ color: "#c9a882" }}>
              <div className="flex items-start gap-2">
                <span className="text-base leading-none mt-0.5">💡</span>
                <span><strong className="text-white">Более 100 работ</strong> в разных жанрах: от душевной лирики до зажигательного диско</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base leading-none mt-0.5">🎵</span>
                <span><strong className="text-white">Все стили:</strong> рок, поп, рэп, романтика, детские песни, корпоративные гимны</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base leading-none mt-0.5">❤️</span>
                <span><strong className="text-white">Для любого повода:</strong> день рождения, свадьба, юбилей, годовщина</span>
              </div>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-transform hover:scale-105"
              style={{ background: "#c2410c" }}
            >
              <Icon name="Headphones" size={18} />
              Послушать все примеры работ →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ──────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#2d2016" }}>
            Что говорят те, кто уже подарил
          </h2>
          <p className="text-center text-lg mb-14" style={{ color: "#7a5c44" }}>
            Настоящие истории, настоящие эмоции
          </p>
          {/* Один отзыв */}
          <div className="max-w-2xl mx-auto mb-10">
            {reviews.map((r, i) => (
              <Card key={i} className="p-8 border-0 shadow-md" style={{ background: "#fff" }}>
                <div className="text-4xl mb-4">{r.emoji}</div>
                <p className="text-base leading-relaxed mb-6 italic" style={{ color: "#5a3d2b" }}>«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "#c2410c" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#2d2016" }}>{r.name}</p>
                    <p className="text-xs" style={{ color: "#9a7a65" }}>г. {r.city}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Статистика */}
          <div className="max-w-2xl mx-auto rounded-2xl p-8" style={{ background: "#fff", border: "1px solid #e5c9b5", boxShadow: "0 4px 24px rgba(194,65,12,0.07)" }}>
            <div className="grid grid-cols-2 gap-5 mb-8">
              {[
                { icon: "⭐⭐⭐⭐⭐", label: "средний рейтинг", value: "5.0 из 5.0" },
                { icon: "✅", label: "довольных клиентов по всей России", value: "100+" },
                { icon: "💬", label: "рекомендуют нас своим друзьям", value: "98%" },
                { icon: "😭", label: "получателей плакали от счастья", value: "100%" },
              ].map(stat => (
                <div key={stat.value} className="text-center">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-extrabold" style={{ color: "#c2410c" }}>{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: "#9a7a65" }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/otzyvy"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-transform hover:scale-105"
                style={{ background: "#c2410c" }}
              >
                <Icon name="MessageSquare" size={18} />
                Читать все отзывы →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#faf7f4" }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#2d2016" }}>
            Цены и пакеты
          </h2>
          <p className="text-center text-lg mb-14" style={{ color: "#7a5c44" }}>
            Никаких скрытых платежей — всё включено
          </p>

          {/* Верхний ряд — 3 карточки */}
          <div className="grid md:grid-cols-3 gap-6 items-start mb-6">

            {/* Package 1 — Стандарт */}
            <Card className="p-7 border-2 flex flex-col" style={{ borderColor: "#e5c9b5", background: "#fff" }}>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "#fef3c7", color: "#92400e" }}>
                  Стандарт
                </span>
              </div>
              <h3 className="font-extrabold text-xl mb-1" style={{ color: "#2d2016" }}>Песня по интервью</h3>
              <p className="text-sm mb-5" style={{ color: "#9a7a65" }}>Для семьи, друзей и близких</p>
              <div className="text-4xl font-extrabold mb-1" style={{ color: "#c2410c" }}>5 000 ₽</div>
              <p className="text-xs mb-6" style={{ color: "#9a7a65" }}>Без передачи авторских прав</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Авторский текст на основе вашей истории",
                  "Профессиональная аранжировка",
                  "До 3 правок бесплатно",
                  "Срок: 2–3 дня",
                  "Файл MP3 навсегда ваш",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#5a3d2b" }}>
                    <Icon name="Check" size={15} style={{ color: "#c2410c", flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-4 rounded-full font-bold" variant="outline" style={{ borderColor: "#c2410c", color: "#c2410c" }}>
                Заказать
              </Button>
            </Card>

            {/* Package 2 — С голосом автора */}
            <Card className="p-7 border-2 flex flex-col" style={{ borderColor: "#e5c9b5", background: "#fff" }}>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "#fce7f3", color: "#9d174d" }}>
                  Ваш голос
                </span>
              </div>
              <h3 className="font-extrabold text-xl mb-1" style={{ color: "#2d2016" }}>С голосом заказчика</h3>
              <p className="text-sm mb-5" style={{ color: "#9a7a65" }}>Вы присылаете голос — он звучит в треке</p>
              <div className="text-4xl font-extrabold mb-1" style={{ color: "#c2410c" }}>7 000 ₽</div>
              <p className="text-xs mb-6" style={{ color: "#9a7a65" }}>Без передачи авторских прав</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Авторский текст на основе вашей истории",
                  "Профессиональная аранжировка",
                  "Ваш голос вписан в трек",
                  "До 3 правок бесплатно",
                  "Срок: 2–3 дня",
                  "Файл MP3 навсегда ваш",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#5a3d2b" }}>
                    <Icon name="Check" size={15} style={{ color: "#c2410c", flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-4 rounded-full font-bold" variant="outline" style={{ borderColor: "#c2410c", color: "#c2410c" }}>
                Заказать
              </Button>
            </Card>

            {/* Package 3 — С авторскими правами (хит центра) */}
            <Card className="p-7 border-2 relative flex flex-col" style={{ borderColor: "#c2410c", background: "#fff4ec" }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <Badge className="px-4 py-1 text-sm font-bold rounded-full" style={{ background: "#c2410c", color: "#fff" }}>
                  Популярный выбор
                </Badge>
              </div>
              <div className="mb-4 mt-2">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "#fed7aa", color: "#7a2e0e" }}>
                  С авторскими правами
                </span>
              </div>
              <h3 className="font-extrabold text-xl mb-1" style={{ color: "#2d2016" }}>Коммерческое использование</h3>
              <p className="text-sm mb-5" style={{ color: "#9a7a65" }}>Для бизнеса, соцсетей, рекламы</p>
              <div className="text-4xl font-extrabold mb-1" style={{ color: "#c2410c" }}>9 900 ₽</div>
              <p className="text-xs mb-6" style={{ color: "#9a7a65" }}>С передачей коммерческих авторских прав</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Авторский текст на основе вашей истории",
                  "Профессиональная аранжировка",
                  "Передача коммерческих прав",
                  "До 5 правок бесплатно",
                  "Срок: 2–3 дня",
                  "Файл MP3 + договор об уступке прав",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-medium" style={{ color: "#5a3d2b" }}>
                    <Icon name="Check" size={15} style={{ color: "#c2410c", flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-4 rounded-full font-bold text-white" style={{ background: "#c2410c" }}>
                Заказать
              </Button>
            </Card>

          </div>

          {/* Нижний ряд — 2 карточки */}
          <div className="grid md:grid-cols-2 gap-6 items-start">

            {/* Package 4 — Публикация в Яндекс Музыке */}
            <Card className="p-7 border-2 relative flex flex-col" style={{ borderColor: "#ea580c", background: "#fff8f0" }}>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "#ffedd5", color: "#9a3412" }}>
                  Публикация
                </span>
              </div>
              <h3 className="font-extrabold text-xl mb-1" style={{ color: "#2d2016" }}>С публикацией в Яндекс Музыке</h3>
              <p className="text-sm mb-5" style={{ color: "#9a7a65" }}>Ваша песня выйдет на стриминговых платформах</p>
              <div className="text-4xl font-extrabold mb-1" style={{ color: "#ea580c" }}>14 900 ₽</div>
              <p className="text-xs mb-6" style={{ color: "#9a7a65" }}>Авторские права + официальный релиз</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Авторский текст на основе вашей истории",
                  "Профессиональная аранжировка",
                  "Передача коммерческих прав",
                  "Публикация на Яндекс Музыке, VK Музыке",
                  "До 5 правок бесплатно",
                  "Срок: 3–5 дней",
                  "Файл MP3 + договор об уступке прав",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-medium" style={{ color: "#5a3d2b" }}>
                    <Icon name="Check" size={15} style={{ color: "#ea580c", flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-4 rounded-full font-bold text-white" style={{ background: "#ea580c" }}>
                Заказать
              </Button>
            </Card>

            {/* Package 5 — Живой вокалист */}
            <Card className="p-7 border-2 flex flex-col" style={{ borderColor: "#7c3aed", background: "#faf5ff" }}>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "#ede9fe", color: "#5b21b6" }}>
                  Живой вокал
                </span>
              </div>
              <h3 className="font-extrabold text-xl mb-1" style={{ color: "#2d2016" }}>С живым голосом вокалиста</h3>
              <p className="text-sm mb-5" style={{ color: "#9a7a65" }}>Для особых событий и максимального впечатления</p>
              <div className="text-4xl font-extrabold mb-1" style={{ color: "#7c3aed" }}>29 900 ₽</div>
              <p className="text-xs mb-6" style={{ color: "#9a7a65" }}>Студийная запись + коммерческие права</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Авторский текст на основе вашей истории",
                  "Профессиональная аранжировка",
                  "Живой вокал — запись в студии",
                  "Бэк-вокал и профессиональное сведение",
                  "Передача коммерческих прав",
                  "До 5 правок бесплатно",
                  "Срок: 5–7 дней",
                  "Видео-слайдшоу из фото — в подарок",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-medium" style={{ color: "#3b0764" }}>
                    <Icon name="Check" size={15} style={{ color: "#7c3aed", flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-4 rounded-full font-bold text-white" style={{ background: "#7c3aed" }}>
                Заказать «Хит»
              </Button>
            </Card>

          </div>

          <div className="mt-8 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 justify-between" style={{ background: "rgba(194,65,12,0.08)", border: "1px solid rgba(194,65,12,0.25)" }}>
            <div className="flex items-start gap-3">
              <Icon name="Clock" size={20} style={{ color: "#f5c97a", flexShrink: 0, marginTop: 2 }} />
              <div>
                <p className="font-bold text-sm" style={{ color: "#2d2016" }}>Не более 5 заказов в неделю</p>
                <p className="text-sm mt-0.5" style={{ color: "#7a5c44" }}>Как композитор я глубоко погружаюсь в каждую историю. Перед праздниками все слоты занимаются заранее — бронируйте место.</p>
              </div>
            </div>
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm transition-transform hover:scale-105 shrink-0"
              style={{ background: "#c2410c" }}
            >
              <Icon name="Send" size={15} />
              Забронировать место
            </a>
          </div>
          <p className="text-center mt-4 text-xs" style={{ color: "#9a7a65" }}>
            Не уверены какой пакет подходит? Напишите нам — поможем выбрать за 5 минут.
          </p>
        </div>
      </section>

      {/* ─── CALCULATOR ───────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#2d2016" }}>
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-white">
            Калькулятор смыслов
          </h2>
          <p className="text-center mb-10" style={{ color: "#c9a882" }}>
            Ответьте на 3 вопроса — и мы уже начнём придумывать вашу песню
          </p>
          <Card className="p-8 border-0 shadow-xl" style={{ background: "#3d2c1c" }}>
            {!calcDone ? (
              <>
                <div className="flex justify-center gap-2 mb-8">
                  {calcQuestions.map((_, i) => (
                    <div key={i} className="w-8 h-2 rounded-full transition-all" style={{ background: i <= calcStep ? "#f5c97a" : "#5a3d2b" }} />
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-6">
                  {calcQuestions[calcStep].question}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {calcQuestions[calcStep].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleCalcAnswer(opt)}
                      className="px-4 py-4 rounded-xl text-sm font-semibold transition-all hover:scale-105 text-left"
                      style={{ background: "#2d2016", color: "#f5c97a", border: "1px solid #7a5c44" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-4">🎵</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Отлично! Ваши ответы готовы
                </h3>
                <div className="rounded-xl px-5 py-4 mb-6 text-left space-y-2" style={{ background: "#2d2016" }}>
                  {calcQuestions.map((q, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                      <span style={{ color: "#f5c97a" }} className="font-semibold shrink-0">{q.question}</span>
                      <span style={{ color: "#c9a882" }}>{calcAnswers[i]}</span>
                    </div>
                  ))}
                </div>
                <p style={{ color: "#c9a882" }} className="mb-6 leading-relaxed">
                  Отправьте результаты Юлии — она подберёт идеальный формат и ответит лично.
                </p>
                <a
                  href={`https://t.me/izmailova8888?text=${encodeURIComponent(`Привет! Прошёл(а) калькулятор смыслов на сайте.\n\nКому дарю: ${calcAnswers[0]}\nПовод: ${calcAnswers[1]}\nЖанр: ${calcAnswers[2]}\n\nХочу заказать песню!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-5 rounded-full font-bold text-white transition-transform hover:scale-105"
                  style={{ background: "#c2410c" }}
                >
                  <Icon name="Send" size={18} />
                  Отправить Юлии в Telegram
                </a>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* ─── ABOUT AUTHOR ─────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12" style={{ color: "#2d2016" }}>
            Кто создаёт ваши песни?
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Фото */}
            <div className="flex-shrink-0">
              <img
                src="https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/344bf7da-4f0c-4b6b-ab42-6cc2b9daded2.jpeg"
                alt="Юлия Измайлова — основательница AI Muse Lab"
                className="w-52 h-52 md:w-64 md:h-64 rounded-3xl object-cover shadow-xl"
                style={{ border: "3px solid #e5c9b5" }}
              />
            </div>
            {/* Текст */}
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#c2410c" }}>Основательница AI Muse Lab</p>
              <h3 className="text-2xl font-extrabold mb-4" style={{ color: "#2d2016" }}>Юлия Измайлова</h3>
              <p className="text-sm mb-1" style={{ color: "#7a5c44" }}>профессиональный композитор и автор текстов</p>
              <div className="space-y-2 my-5">
                {[
                  "10+ лет опыта создания авторских песен",
                  "5 выпущенных альбомов (GALAKTIKA)",
                  "Более 100 персональных песен для клиентов",
                  "Публикации на Яндекс Музыке, Spotify, VK Музыке",
                ].map(item => (
                  <div key={item} className="flex items-start gap-2 text-sm" style={{ color: "#5a3d2b" }}>
                    <Icon name="Check" size={14} style={{ color: "#c2410c", marginTop: 2, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 mb-6" style={{ background: "#fff8f2", border: "1px solid #e5c9b5" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#c2410c" }}>Личный подход</p>
                <p className="text-sm leading-relaxed" style={{ color: "#5a3d2b" }}>
                  Каждую историю Юлия изучает лично. Проводит глубинное интервью, вникает в детали, переносит эмоции в текст и музыку.
                </p>
                <p className="text-sm font-semibold mt-2" style={{ color: "#2d2016" }}>
                  Это не автоматическая генерация — это авторская работа с душой.
                </p>
              </div>
              <Link
                to="/o-nas"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white transition-transform hover:scale-105"
                style={{ background: "#c2410c" }}
              >
                <Icon name="User" size={16} />
                Узнать больше о команде →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14" style={{ color: "#2d2016" }}>
            Вопросы и ответы
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <Card
                key={i}
                className="border-0 shadow-sm overflow-hidden cursor-pointer"
                style={{ background: "#fff" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className="font-semibold text-base pr-4" style={{ color: "#2d2016" }}>{item.q}</h3>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={20} style={{ color: "#c2410c", flexShrink: 0 }} />
                </div>
                {openFaq === i && item.a !== "process-block" && (
                  <div className="px-6 pb-6 text-base leading-relaxed" style={{ color: "#7a5c44" }}>
                    {item.a}
                  </div>
                )}
                {openFaq === i && item.a === "process-block" && (
                  <div className="px-6 pb-6">
                    <p className="text-sm mb-4" style={{ color: "#7a5c44" }}>
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
                        <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl" style={{ background: "#fdf3e7", border: "1px solid #e5c9b5" }}>
                          <div className="text-xs font-black mb-2 w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ background: "#c2410c" }}>{item.step}</div>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: "#fde8d8" }}>
                            <Icon name={item.icon as "Music2"} size={16} style={{ color: "#c2410c" }} />
                          </div>
                          <h4 className="font-bold text-xs mb-1" style={{ color: "#2d2016" }}>{item.title}</h4>
                          <p className="text-xs leading-relaxed" style={{ color: "#9a7a65" }}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl p-4" style={{ background: "#fdf3e7", border: "1px solid #e5c9b5" }}>
                      <p className="text-sm" style={{ color: "#5a3d2b" }}>
                        <strong>Аналогия:</strong> Фотограф использует Photoshop. Без таланта — Photoshop бесполезен. Так же и с AI в музыке. Вы платите за экспертизу + мощь технологий.
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Блок «Ещё остались вопросы?» */}
          <div className="mt-10 rounded-2xl p-8" style={{ background: "#fff", border: "1px solid #e5c9b5" }}>
            <h3 className="text-xl font-extrabold mb-3" style={{ color: "#2d2016" }}>Ещё остались вопросы?</h3>
            <p className="text-sm mb-5" style={{ color: "#7a5c44" }}>У нас есть подробная страница с ответами на 25+ вопросов:</p>
            <div className="grid sm:grid-cols-2 gap-2 mb-6">
              {[
                { icon: "💰", text: "Стоимость и оплата" },
                { icon: "⏱️", text: "Сроки и процесс" },
                { icon: "🎤", text: "О вокале и качестве" },
                { icon: "✍️", text: "Текст и музыка" },
                { icon: "📜", text: "Авторские права" },
                { icon: "✨", text: "...и многое другое!" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 text-sm" style={{ color: "#5a3d2b" }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ background: "#c2410c" }}
            >
              <Icon name="HelpCircle" size={16} />
              Все вопросы и ответы →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── OTHER SERVICES PROMO ─────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#1a0f07" }}>
        <div className="container mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest mb-4 text-center" style={{ color: "#f5c97a" }}>Дополнительные услуги</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-10 text-center">Кроме персональных песен я работаю с...</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "Film", title: "Музыкальные клипы", desc: "Профессиональное видео для вашего трека", price: "от 20 000 ₽" },
              { icon: "Captions", title: "Лирик-видео", desc: "Анимированный текст + визуалы для YouTube и соцсетей", price: "от 8 000 ₽" },
              { icon: "Palette", title: "Визуальный контент", desc: "Обложки релизов, карточки для соцсетей, аватары", price: "от 3 000 ₽" },
              { icon: "Star", title: "Артист под ключ", desc: "Трек + карточки + обучение релизам и продвижению на стримингах", price: "от 60 000 ₽" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(194,65,12,0.2)" }}>
                  <Icon name={s.icon as "Film"} size={20} style={{ color: "#f5c97a" }} />
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{s.title}</h3>
                <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "#9a7a65" }}>{s.desc}</p>
                <p className="text-sm font-extrabold" style={{ color: "#f5c97a" }}>{s.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/uslugi"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ background: "#c2410c" }}
            >
              <Icon name="Video" size={18} />
              Подробнее об услугах
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────── */}
      <section id="form-section" className="py-24 px-6 relative overflow-hidden" style={{ background: "#2d2016" }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${VINYL_IMG})` }}
        />
        <div className="relative z-10 container mx-auto max-w-xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Готовы подарить эмоции,<br />которые не купить в магазине?
          </h2>
          <p className="text-lg mb-10" style={{ color: "#c9a882" }}>
            Напишите нам — и мы свяжемся в течение 15 минут
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/AIMusalab_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg text-white transition-transform hover:scale-105 shadow-xl"
              style={{ background: "#c2410c" }}
            >
              <Icon name="Bot" size={22} />
              Оставить заявку через бота
            </a>
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg transition-transform hover:scale-105 shadow-xl"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <Icon name="Send" size={22} />
              Написать лично
            </a>
          </div>
          <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Отвечаем в течение 15 минут в рабочее время
          </p>
        </div>
      </section>

      {/* ─── SEO TEXT (скрыт визуально, индексируется поисковиками) ───── */}
      <section aria-hidden="false" className="sr-only">
        <h2>Заказать авторскую песню в подарок в Санкт-Петербурге</h2>
        <p>
          AI Muse Lab — сервис по созданию персональных авторских песен на заказ. Вы можете заказать уникальную
          песню в подарок на день рождения, свадьбу, юбилей, годовщину, 8 марта, 23 февраля, выпускной или
          корпоратив. Мы пишем авторский текст и музыку специально под вашу историю — результат готов за 2–3 дня.
        </p>
        <p>
          Стоимость авторской песни на заказ: от 5 000 рублей. Доступен живой вокал, профессиональная запись,
          публикация трека на стриминговые платформы: Яндекс Музыка, VK Музыка, Spotify, Apple Music.
          Все пакеты включают гарантию правок. Работаем по всей России и СНГ дистанционно через Telegram.
        </p>
        <p>
          Ключевые слова: песня на заказ, авторская песня в подарок, персональная песня, заказать песню,
          песня на день рождения, песня на свадьбу, песня на юбилей, уникальный подарок, живой вокал,
          песня для мамы, песня для папы, корпоративная песня, Санкт-Петербург.
        </p>
      </section>

      <Footer />

      <CookieBanner />
    </div>
  );
}