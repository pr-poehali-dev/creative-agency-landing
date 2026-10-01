import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import OrderCalculator from "@/components/OrderCalculator";
import AudioPlayer, { Track } from "@/components/AudioPlayer";
import GiftForm from "@/components/GiftForm";

const TRACKS_URL = "https://functions.poehali.dev/1da8aa11-ec15-4134-82ec-7826c554f737";

const TRACK_DESCS: Record<string, string> = {
  "lichnyj-geroj": "Девушка поздравила своего парня, героя войны, с днём рождения. Её слова: «Мне вас сам Бог послал» — стали самым тёплым отзывом.",
  "zryachee-serdce": "Семья поздравляла свою слепую бабушку. В её памяти живы картинки из прошлого — и эта песня стала талисманом любви всей семьи.",
  "kajfuyu-s-yanoj": "Весёлая, искренняя, настоящая. Именно такой и должна быть дружеская песня.",
};

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
    desc: "Качественный аудиофайл + бонус-трек в подарок. Файл ваш навсегда.",
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
    emoji: "",
  },
];


function GiftSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0a0a0b 0%, #0f0f10 50%, #0a0a0b 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "none" }} />
      <div className="container mx-auto max-w-lg relative z-10 text-center">
        <div
          className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-none mb-5"
          style={{ color: "#c4a06a" }}
        >
          Подарок от нас
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-white leading-tight">
          Ещё не решили? Получите подарок, пока выбираете
        </h2>
        <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(169,166,159,0.75)" }}>
          Выберите подарок — я отправлю его на Telegram / WhatsApp или почту.
        </p>

        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-white text-base transition-all hover:opacity-90"
            style={{ background: "#c4a06a", color: "#0a0a0b", boxShadow: "none" }}
          >
            <Icon name="Gift" size={18} />
            Забрать подарок
          </button>
        ) : (
          <div className="text-left mt-2">
            <GiftForm />
          </div>
        )}
      </div>
    </section>
  );
}

export default function PesnyaVPodarok() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openLyrics, setOpenLyrics] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [playerTracks, setPlayerTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetch(TRACKS_URL)
      .then(r => r.json())
      .then(data => {
        const tracks = (data.tracks || []).map((t: Track) => ({
          ...t,
          desc: TRACK_DESCS[t.id] || t.desc,
        }));
        setPlayerTracks(tracks);
      })
      .catch(() => {});
  }, []);

  const scrollToCalc = () => {
    document.getElementById("calculator-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    document.getElementById("calculator-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: "#0a0a0b", color: "#f2efe9" }}>

      {/* Модальный калькулятор */}
      {calcOpen && <OrderCalculator onClose={() => setCalcOpen(false)} />}

      {/* Sticky CTA button */}
      {/* ─── NAV ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50" style={{ background: "rgba(10,10,11,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(196,160,106,0.2)" }}>
        <div className="container mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">

          {/* Логотип */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/589a2648-75cb-485c-aeed-7d4aae46cdaa.jpeg"
              alt="AI Muse Lab — авторские песни на заказ"
              className="h-10 w-auto rounded-sm object-cover"
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-semibold transition-all hover:text-white hover:bg-white/5"
                style={{ color: "#a9a69f" }}
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
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-none text-xs font-bold transition-all hover:opacity-90 text-white"
              style={{ background: "#c4a06a", color: "#0a0a0b" }}
            >
              <Icon name="Mic" size={13} />
              Заказать песню
            </button>
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-none text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: "rgba(196,160,106,0.1)", color: "#a9a69f", border: "1px solid rgba(196,160,106,0.3)" }}
            >
              <Icon name="Send" size={12} />
              Telegram
            </a>
            {/* Гамбургер */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-sm transition-all"
              style={{ background: "rgba(196,160,106,0.1)", border: "1px solid rgba(196,160,106,0.3)" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Меню"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={17} style={{ color: "#c4a06a" }} />
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t" style={{ background: "rgba(10,10,11,0.99)", borderColor: "rgba(196,160,106,0.2)" }}>
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
                  className="flex items-center gap-3 px-4 py-3 rounded-sm transition-all hover:bg-white/5"
                >
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,160,106,0.15)" }}>
                    <Icon name={link.icon as "Star"} size={15} style={{ color: "#c4a06a" }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{link.label}</div>
                    <div className="text-xs" style={{ color: "#a9a69f" }}>{link.desc}</div>
                  </div>
                  <Icon name="ChevronRight" size={14} style={{ color: "#c4a06a", marginLeft: "auto" }} />
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: "rgba(196,160,106,0.2)" }}>
                <button
                  onClick={() => { scrollToForm(); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-sm text-sm font-bold text-white"
                  style={{ background: "#c4a06a", color: "#0a0a0b" }}
                >
                  <Icon name="Mic" size={16} />
                  Заказать песню
                </button>
                <a
                  href="https://t.me/izmailova8888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-sm text-sm font-semibold"
                  style={{ background: "rgba(196,160,106,0.1)", color: "#a9a69f", border: "1px solid rgba(196,160,106,0.3)" }}
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
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center" style={{ background: "linear-gradient(180deg, #131314 0%, #0a0a0b 100%)" }}>
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-none pointer-events-none" style={{ background: "none", filter: "blur(60px)" }} />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-none pointer-events-none" style={{ background: "none", filter: "blur(60px)" }} />

        <div className="relative z-10 container mx-auto max-w-4xl px-6 pt-28 pb-10 text-center flex flex-col items-center">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-none text-sm font-medium mb-8" style={{ background: "rgba(196,160,106,0.08)", border: "1px solid rgba(196,160,106,0.3)", color: "#c4a06a" }}>
            <span></span>
            {" "}Ваш композитор: Юлия Измайлова (Galaktika) — на{" "}
            <a
              href="https://music.yandex.com/artist/2948671"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-80 transition-opacity"
              style={{ color: "#d8bd8a" }}
            >
              Яндекс Музыке
            </a>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6" style={{ letterSpacing: "-0.02em", color: "#f2efe9" }}>
            Песня, которая{" "}
            <span className="text-gold">расскажет вашу историю</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mb-10" style={{ color: "#a9a69f" }}>
            Авторская песня по вашей истории — подарок, который невозможно купить в магазине. Готово за 2–3 дня.
          </p>

          <div className="w-full max-w-sm mx-auto mb-10">
            <div
              className="relative rounded-sm overflow-hidden"
              style={{ boxShadow: "none", border: "1px solid rgba(196,160,106,0.35)" }}
            >
              <video
                src="https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/356f909f-8bbf-44d7-9950-db2307b8fd31.MOV"
                controls
                playsInline
                className="w-full"
                style={{ display: "block", maxHeight: 400, background: "#0a0a0b" }}
              />
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-none text-lg font-bold transition-all hover:opacity-90 mb-12"
            style={{ background: "#c4a06a", color: "#0a0a0b", boxShadow: "none" }}
          >
            <Icon name="Music2" size={20} />
            Создать свою песню
          </button>

          <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mb-12">
            {[
              { n: "100+", t: "довольных клиентов" },
              { n: "2–3 дня", t: "срок готовности" },
              { n: "5.0", t: "средняя оценка" },
            ].map((x) => (
              <div key={x.t} className="rounded-sm py-4 px-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(196,160,106,0.2)" }}>
                <div className="font-display text-2xl md:text-3xl font-bold text-gold">{x.n}</div>
                <div className="text-xs md:text-sm mt-1" style={{ color: "#a9a69f" }}>{x.t}</div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-xs mx-auto text-left">
            <div
              className="flex flex-col rounded-sm overflow-hidden transition-all duration-300 "
              style={{ border: "1px solid rgba(196,160,106,0.25)", background: "#131314" }}
            >
              <div className="relative h-28 overflow-hidden">
                <img src={WEDDING_IMG} alt="Песни и хиты на заказ" className="w-full h-full object-cover" style={{ opacity: 0.5 }} loading="lazy" decoding="async" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0f0f10 0%, #18181a 100%)", opacity: 0.75 }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center" style={{ background: "transparent", border: "1px solid rgba(196,160,106,0.35)", backdropFilter: "blur(8px)", border: "1px solid rgba(196,160,106,0.4)" }}>
                    <Icon name="Gift" size={22} style={{ color: "#d8bd8a" }} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-4">
                <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: "#f2efe9" }}>Песни и хиты на заказ</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#a9a69f" }}>Персональная песня по вашему сюжету. Со словами, которые вы давно хотели сказать, но не знали как.</p>
                <button
                  onClick={() => document.getElementById("gift-song-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm text-sm font-bold transition-all hover:opacity-90 w-full"
                  style={{ background: "transparent", color: "#d8bd8a", border: "1px solid rgba(196,160,106,0.5)" }}
                >
                  Выбрать песню
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-8 flex justify-center " style={{ color: "rgba(196,160,106,0.5)" }}>
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* ─── PROBLEM BLOCK ────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#0a0a0b" }}>
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#c4a06a" }}>Задумайтесь</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#f2efe9" }}>
            Что подарить человеку,<br />у которого всё есть?
          </h2>
          <p className="text-center text-lg md:text-xl mb-14 max-w-xl mx-auto" style={{ color: "#a9a69f", lineHeight: 1.6 }}>
            Вы уже думали об этом. И, скорее всего, снова остановились на чём-то стандартном.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bad */}
            <div className="p-8 rounded-sm" style={{ background: "#131314", border: "1px solid #2a2a2d" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-none flex items-center justify-center" style={{ background: "rgba(239,68,68,0.15)" }}>
                  <Icon name="X" size={20} style={{ color: "#EF4444" }} />
                </div>
                <h3 className="font-bold text-xl" style={{ color: "#a9a69f" }}>Стандартный подарок</h3>
              </div>
              <ul className="space-y-4">
                {["Постоит на полке и забудется через неделю", "Деньги потрачены, а радости — на час", "Такой же подарок уже дарили другие", "Безделушка без смысла и истории"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-base" style={{ color: "#86837d" }}>
                    <Icon name="Minus" size={16} style={{ color: "#86837d", flexShrink: 0, marginTop: 3 }} />
                    <span style={{ textDecoration: "line-through" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Good */}
            <div className="p-8 rounded-sm relative" style={{ background: "linear-gradient(135deg, #1b1b1d 0%, #131314 100%)", border: "2px solid #c4a06a", boxShadow: "none" }}>
              <div className="absolute -top-4 right-6">
                <span className="px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider " style={{ background: "#c4a06a", color: "#0a0a0b" }}>Рекомендуем</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-none flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(196,160,106,0.2) 0%, rgba(196,160,106,0.15) 100%)" }}>
                  <Icon name="Heart" size={20} style={{ color: "#c4a06a" }} />
                </div>
                <h3 className="font-bold text-xl" style={{ color: "#f2efe9" }}>Персональная песня</h3>
              </div>
              <ul className="space-y-4">
                {["Слёзы радости на глазах в момент подарка", "Переслушивают снова и снова — годами", "Становится семейной реликвией", "Единственная в мире — только о вашем человеке"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-base font-medium" style={{ color: "#f2efe9" }}>
                    <Icon name="CheckCircle2" size={18} style={{ color: "#c4a06a", flexShrink: 0, marginTop: 2 }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#0f0f10" }}>
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#c4a06a" }}>Процесс</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#f2efe9" }}>
            Как это работает?
          </h2>
          <p className="text-center text-lg md:text-xl mb-14 max-w-lg mx-auto" style={{ color: "#a9a69f", lineHeight: 1.6 }}>
            Всего 4 шага. Вам нужно только рассказать историю.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="p-7 rounded-sm relative overflow-hidden transition-all  hover:shadow-lg" style={{ background: "#131314", border: "1px solid rgba(196,160,106,0.12)", boxShadow: "none" }}>
                <div className="absolute -top-3 -right-3 text-8xl font-black pointer-events-none select-none" style={{ color: "rgba(196,160,106,0.06)", lineHeight: 1 }}>{step.num}</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0" style={{ background: "transparent", border: "1px solid rgba(196,160,106,0.35)" }}>
                    <Icon name={step.icon as "FileText"} size={22} style={{ color: "#c4a06a" }} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: "#f2efe9" }}>{step.title}</h3>
                </div>
                <p className="text-base leading-relaxed" style={{ color: "#a9a69f" }}>{step.desc}</p>
                {step.img && (
                  <div className="mt-4 rounded-sm overflow-hidden h-36">
                    <img src={step.img} alt={`Процесс создания авторской песни на заказ — ${step.title}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ────────────────────────────────────────── */}
      <section id="portfolio-section" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0a0a0b 0%, #0f0f10 50%, #0a0a0b 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "none" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "none" }} />
        <div className="container mx-auto max-w-2xl relative z-10">

          {/* Заголовок */}
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 px-0 py-0 border-0"
            style={{ color: "#c4a06a" }}
          >
            Портфолио · Слушай прямо здесь
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-white leading-tight">
            Послушай прежде, чем заказывать —{" "}
            <span style={{ color: "#c4a06a" }}>
              3 реальные песни по историям людей
            </span>
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(169,166,159,0.8)" }}>
            Боишься, что песня не тронет? Послушай — и пойми, каково это, когда музыка попадает прямо в сердце.
          </p>

          {/* Плеер */}
          <AudioPlayer tracks={playerTracks} />

          {/* Послушать больше */}
          <div className="mt-12 rounded-sm p-8 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(196,160,106,0.2)", backdropFilter: "none" }}>
            <h3 className="text-xl font-extrabold text-white mb-5">Послушать больше примеров работ</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-7 text-base" style={{ color: "rgba(169,166,159,0.8)" }}>
              <div className="flex items-start gap-2">
                <span className="text-base leading-none mt-0.5"></span>
                <span><strong className="text-white">Более 100 работ</strong> в разных жанрах: от душевной лирики до зажигательного диско</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base leading-none mt-0.5"></span>
                <span><strong className="text-white">Для любого повода:</strong> день рождения, свадьба, юбилей, годовщина</span>
              </div>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-none font-bold text-white text-base transition-transform hover:opacity-90"
              style={{ background: "#c4a06a", color: "#0a0a0b" }}
            >
              <Icon name="Headphones" size={18} />
              Все примеры работ →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ──────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#0f0f10" }}>
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#c4a06a" }}>Отзывы</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#f2efe9" }}>
            Что говорят те, кто уже подарил
          </h2>
          <p className="text-center text-lg md:text-xl mb-14 max-w-lg mx-auto" style={{ color: "#a9a69f", lineHeight: 1.6 }}>
            Настоящие истории, настоящие эмоции
          </p>
          {/* Один отзыв */}
          <div className="max-w-2xl mx-auto mb-10">
            {reviews.map((r, i) => (
              <div key={i} className="p-8 rounded-sm" style={{ background: "#131314", border: "1px solid rgba(196,160,106,0.12)", boxShadow: "none" }}>
                
                <p className="text-lg leading-relaxed mb-6 italic" style={{ color: "#cfcbc4" }}>«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none flex items-center justify-center font-bold  text-sm" style={{ background: "#c4a06a", color: "#0a0a0b" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-base" style={{ color: "#f2efe9" }}>{r.name}</p>
                    <p className="text-sm" style={{ color: "#86837d" }}>г. {r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Статистика */}
          <div className="max-w-2xl mx-auto rounded-sm p-8" style={{ background: "#131314", border: "1px solid rgba(196,160,106,0.15)", boxShadow: "none" }}>
            <div className="grid grid-cols-2 gap-5 mb-8">
              {[
                { icon: "", label: "средний рейтинг", value: "5.0 из 5.0" },
                { icon: "", label: "довольных клиентов по всей России", value: "100+" },
                { icon: "", label: "рекомендуют нас своим друзьям", value: "98%" },
                { icon: "", label: "получателей плакали от счастья", value: "100%" },
              ].map(stat => (
                <div key={stat.value} className="text-center">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-extrabold" style={{ color: "#c4a06a" }}>{stat.value}</div>
                  <div className="text-sm mt-1" style={{ color: "#86837d" }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/otzyvy"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-none font-bold text-white text-base transition-transform hover:opacity-90"
                style={{ background: "#c4a06a", color: "#0a0a0b" }}
              >
                <Icon name="MessageSquare" size={18} />
                Читать все отзывы →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────── */}
      <section id="gift-song-section" className="py-24 px-6 relative overflow-hidden" style={{ background: "#0a0a0b" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "none" }} />
        <div className="relative container mx-auto max-w-6xl">
          <p className="text-center text-sm font-semibold uppercase mb-3" style={{ color: "#c4a06a", letterSpacing: "0.25em" }}>Стоимость</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-center mb-4" style={{ color: "#f2efe9" }}>
            Цены и <span className="text-gold">тарифы</span>
          </h2>
          <p className="text-center text-lg mb-16 max-w-lg mx-auto" style={{ color: "#a9a69f", lineHeight: 1.6 }}>
            Никаких скрытых платежей — всё включено
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {[
              {
                name: "Признание", price: "14 900", tag: "Для искренних слов", featured: false,
                desc: "Полноценная песня, которая расскажет всё, что у вас на сердце.",
                features: ["Полная песня (куплеты, припевы)", "AI-аранжировка", "Авторский текст по личному интервью", "Срок: 2–3 дня", "Файл в MP3"],
                cta: "Заказать признание",
              },
              {
                name: "Сюрприз", price: "29 900", tag: "Популярный выбор", featured: true,
                desc: "Всё из «Признания» + полные права и релиз на стримингах.",
                features: ["Всё из тарифа «Признание»", "Передача коммерческих прав", "Публикация на Яндекс Музыке и VK Музыке"],
                cta: "Устроить сюрприз",
              },
              {
                name: "Хит", price: "79 900", tag: "Максимум звучания", featured: false,
                desc: "Студийный живой вокал, бэк-вокал, сведение. Для особенных моментов.",
                features: ["Всё из тарифа «Сюрприз»", "Живой профессиональный вокал вместо AI", "Студийная запись и сведение", "Бэк-вокал"],
                cta: "Создать хит",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="relative p-8 rounded-sm flex flex-col transition-all duration-300 "
                style={{
                  background: t.featured ? "linear-gradient(160deg, #1b1b1d 0%, #131314 100%)" : "#131314",
                  border: t.featured ? "1.5px solid #c4a06a" : "1px solid rgba(196,160,106,0.18)",
                  boxShadow: t.featured ? "0 24px 70px rgba(0,0,0,0.4)" : "0 8px 30px rgba(0,0,0,0.3)",
                }}
              >
                {t.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-1.5 rounded-none text-xs font-bold uppercase" style={{ background: "#c4a06a", color: "#0a0a0b", letterSpacing: "0.15em" }}>
                    {t.tag}
                  </div>
                )}
                {!t.featured && (
                  <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#c4a06a", letterSpacing: "0.2em" }}>{t.tag}</p>
                )}
                {t.featured && <div className="mb-3 h-4" />}
                <h3 className="font-display text-3xl font-semibold mb-3" style={{ color: "#f2efe9" }}>{t.name}</h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "#a9a69f" }}>{t.desc}</p>
                <div className="mb-6 pb-6" style={{ borderBottom: "1px solid rgba(196,160,106,0.18)" }}>
                  <span className="font-display text-5xl font-bold text-gold">{t.price}</span>
                  <span className="text-xl ml-1" style={{ color: "#c4a06a" }}>₽</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#cfcbc4" }}>
                      <Icon name="Check" size={16} style={{ color: "#c4a06a", flexShrink: 0, marginTop: 2 }} /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={scrollToForm}
                  className="w-full py-6 rounded-none font-bold text-base"
                  style={t.featured
                    ? { background: "#c4a06a", color: "#0a0a0b" }
                    : { background: "transparent", color: "#d8bd8a", border: "1px solid rgba(196,160,106,0.5)" }}
                >
                  {t.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-sm p-6 flex flex-col sm:flex-row items-center gap-4 justify-between" style={{ background: "#131314", border: "1px solid rgba(196,160,106,0.2)" }}>
            <div className="flex items-start gap-3">
              <Icon name="Clock" size={20} style={{ color: "#c4a06a", flexShrink: 0, marginTop: 2 }} />
              <p className="text-base" style={{ color: "#a9a69f" }}>Как композитор я глубоко погружаюсь в каждую историю. Перед праздниками все слоты занимаются заранее — бронируйте место.</p>
            </div>
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-white text-sm transition-transform hover:opacity-90 shrink-0"
              style={{ background: "#c4a06a", color: "#0a0a0b" }}
            >
              <Icon name="Send" size={15} />
              Забронировать место
            </a>
          </div>
          <p className="text-center mt-4 text-sm" style={{ color: "#86837d" }}>
            Не уверены какой пакет подходит? Напишите нам — поможем выбрать за 5 минут.
          </p>
        </div>
      </section>

      {/* ─── GIFT FORM ────────────────────────────────────────── */}
      <GiftSection />

      {/* ─── CALCULATOR ───────────────────────────────────────── */}
      <section id="calculator-section" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0f0f10 0%, #0a0a0b 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "none" }} />
        <div className="absolute top-10 left-10 text-8xl opacity-5 pointer-events-none select-none"></div>
        <div className="absolute bottom-10 right-10 text-8xl opacity-5 pointer-events-none select-none"></div>
        <div className="container mx-auto max-w-lg relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-white">
            Выбери свою песню здесь
          </h2>
          <p className="text-center text-lg mb-10" style={{ color: "rgba(169,166,159,0.8)" }}>
            Несколько вопросов — и вы получите точный расчёт + подарок 
          </p>
          <OrderCalculator inline />
        </div>
      </section>

      {/* ─── ABOUT AUTHOR ─────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "#0f0f10" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "none" }} />
        <div className="container mx-auto max-w-4xl relative z-10">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#c4a06a" }}>Автор</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12" style={{ color: "#f2efe9" }}>
            Кто создаёт ваши песни?
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Фото */}
            <div className="flex-shrink-0">
              <img
                src="https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/344bf7da-4f0c-4b6b-ab42-6cc2b9daded2.jpeg"
                alt="Юлия Измайлова — основательница AI Muse Lab"
                className="w-52 h-52 md:w-64 md:h-64 rounded-sm object-cover shadow-xl"
                style={{ border: "2px solid #c4a06a", boxShadow: "none" }}
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Текст */}
            <div className="flex-1">
              <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#c4a06a" }}>Основательница AI Muse Lab</p>
              <h3 className="text-2xl font-extrabold mb-4" style={{ color: "#f2efe9" }}>Юлия Измайлова</h3>
              <p className="text-base mb-1" style={{ color: "#a9a69f" }}>профессиональный композитор и автор текстов</p>
              <div className="space-y-3 my-5">
                {[
                  "10+ лет опыта создания авторских песен",
                  "5 выпущенных альбомов под именем GALAKTIKA",
                  "Более 100 персональных песен для клиентов",
                ].map(item => (
                  <div key={item} className="flex items-start gap-2 text-base" style={{ color: "#cfcbc4" }}>
                    <Icon name="Check" size={15} style={{ color: "#c4a06a", marginTop: 2, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Послушать творчество */}
              <div className="rounded-sm p-4 mb-5" style={{ background: "#1b1b1d", border: "1px solid rgba(196,160,106,0.2)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#c4a06a" }}>Послушать творчество Юлии</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://music.yandex.com/artist/2948671"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: "#FFCC00", color: "#0a0a0b" }}
                  >
                    <Icon name="Music" size={15} />
                    Яндекс Музыка
                  </a>
                  <a
                    href="https://vk.ru/artist/galaktika_mtuyntc0odg0mw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: "#0077FF" }}
                  >
                    <Icon name="Music2" size={15} />
                    VK Музыка
                  </a>
                  <a
                    href="https://vk.ru/club235584480"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: "rgba(196,160,106,0.12)", color: "#c4a06a", border: "1px solid rgba(196,160,106,0.3)" }}
                  >
                    <Icon name="Users" size={15} />
                    ВКонтакте
                  </a>
                </div>
                <p className="text-xs mt-3" style={{ color: "#86837d" }}>
                  Более 5 выпущенных альбомов — можете убедиться сами, прежде чем заказывать
                </p>
              </div>

              <div className="rounded-sm p-5 mb-6" style={{ background: "#131314", border: "1px solid rgba(196,160,106,0.2)", boxShadow: "none" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#c4a06a" }}>Личный подход</p>
                <p className="text-base leading-relaxed" style={{ color: "#cfcbc4" }}>
                  Каждую историю Юлия изучает лично. Проводит глубинное интервью, вникает в детали, переносит эмоции в текст и музыку.
                </p>
                <p className="text-base font-semibold mt-2" style={{ color: "#f2efe9" }}>
                  Это не автоматическая генерация — это авторская работа с душой.
                </p>
              </div>
              <Link
                to="/o-nas"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm font-bold text-white transition-transform hover:opacity-90"
                style={{ background: "#c4a06a", color: "#0a0a0b" }}
              >
                <Icon name="User" size={16} />
                Узнать больше о Юлии →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#0f0f10" }}>
        <div className="container mx-auto max-w-3xl">
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#c4a06a" }}>FAQ</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14" style={{ color: "#f2efe9" }}>
            Вопросы и ответы
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-pointer rounded-sm transition-all"
                style={{ background: "#131314", border: openFaq === i ? "1px solid #c4a06a" : "1px solid rgba(196,160,106,0.2)", boxShadow: openFaq === i ? "0 4px 24px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.04)" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className="font-semibold text-base pr-4" style={{ color: "#f2efe9" }}>{item.q}</h3>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={20} style={{ color: "#c4a06a", flexShrink: 0 }} />
                </div>
                {openFaq === i && item.a !== "process-block" && (
                  <div className="px-6 pb-6 text-base leading-relaxed" style={{ color: "#cfcbc4" }}>
                    {item.a}
                  </div>
                )}
                {openFaq === i && item.a === "process-block" && (
                  <div className="px-6 pb-6">
                    <p className="text-base mb-4" style={{ color: "#cfcbc4" }}>
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
                        <div key={idx} className="flex flex-col items-center text-center p-4 rounded-sm" style={{ background: "#1b1b1d", border: "1px solid rgba(196,160,106,0.15)" }}>
                          <div className="text-xs font-black mb-2 w-6 h-6 rounded-none flex items-center justify-center " style={{ background: "#c4a06a", color: "#0a0a0b" }}>{item.step}</div>
                          <div className="w-8 h-8 rounded-sm flex items-center justify-center mb-2" style={{ background: "transparent", border: "1px solid rgba(196,160,106,0.35)" }}>
                            <Icon name={item.icon as "Music2"} size={16} style={{ color: "#c4a06a" }} />
                          </div>
                          <h4 className="font-bold text-xs mb-1" style={{ color: "#f2efe9" }}>{item.title}</h4>
                          <p className="text-xs leading-relaxed" style={{ color: "#a9a69f" }}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-sm p-4" style={{ background: "#1b1b1d", border: "1px solid rgba(196,160,106,0.15)" }}>
                      <p className="text-base" style={{ color: "#cfcbc4" }}>
                        <strong style={{ color: "#f2efe9" }}>Аналогия:</strong> Фотограф использует Photoshop. Без таланта — Photoshop бесполезен. Так же и с AI в музыке. Вы платите за экспертизу + мощь технологий.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Блок «Ещё остались вопросы?» */}
          <div className="mt-10 rounded-sm p-8" style={{ background: "#131314", border: "1px solid rgba(196,160,106,0.15)", boxShadow: "none" }}>
            <h3 className="text-xl font-extrabold mb-3" style={{ color: "#f2efe9" }}>Ещё остались вопросы?</h3>
            <p className="text-base mb-5" style={{ color: "#a9a69f" }}>У нас есть подробная страница с ответами на 25+ вопросов:</p>
            <div className="grid sm:grid-cols-2 gap-2 mb-6">
              {[
                { icon: "", text: "Стоимость и оплата" },
                { icon: "", text: "Сроки и процесс" },
                { icon: "", text: "О вокале и качестве" },
                { icon: "", text: "Текст и музыка" },
                { icon: "", text: "Авторские права" },
                { icon: "", text: "...и многое другое!" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 text-base" style={{ color: "#cfcbc4" }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none font-bold text-white transition-transform hover:opacity-90"
              style={{ background: "#c4a06a", color: "#0a0a0b" }}
            >
              <Icon name="HelpCircle" size={16} />
              Все вопросы и ответы →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── OTHER SERVICES PROMO ─────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0f0f10 0%, #0a0a0b 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "none" }} />
        <div className="container mx-auto max-w-5xl relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest mb-4 text-center" style={{ color: "#c4a06a" }}>Дополнительные услуги</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-10 text-center">Кроме персональных песен я работаю с...</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "Film", title: "Музыкальные клипы", desc: "Профессиональное видео для вашего трека", price: "от 20 000 ₽" },
              { icon: "Captions", title: "Лирик-видео", desc: "Анимированный текст + визуалы для YouTube и соцсетей", price: "от 8 000 ₽" },
              { icon: "Palette", title: "Визуальный контент", desc: "Обложки релизов, карточки для соцсетей, аватары", price: "от 3 000 ₽" },
              { icon: "Star", title: "Артист под ключ", desc: "Трек + карточки + обучение релизам и продвижению на стримингах", price: "от 60 000 ₽" },
            ].map((s, i) => (
              <div key={i} className="rounded-sm p-6 flex flex-col transition-all " style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(249,168,212,0.2)", backdropFilter: "none" }}>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-4" style={{ background: "transparent", border: "1px solid rgba(196,160,106,0.35)" }}>
                  <Icon name={s.icon as "Film"} size={20} style={{ color: "#c4a06a" }} />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-base leading-relaxed mb-4 flex-1" style={{ color: "rgba(249,168,212,0.75)" }}>{s.desc}</p>
                <p className="text-base font-extrabold" style={{ color: "#c4a06a" }}>{s.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/uslugi"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-white transition-transform hover:opacity-90"
              style={{ background: "#c4a06a", color: "#0a0a0b" }}
            >
              <Icon name="Video" size={18} />
              Подробнее об услугах
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────── */}
      <section id="form-section" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #18181a 0%, #0f0f10 100%)" }}>
        {/* Фоновые музыкальные ноты */}
        <div className="absolute top-8 left-8 text-9xl pointer-events-none select-none" style={{ opacity: 0.06, fontSize: 120 }}></div>
        <div className="absolute bottom-8 right-8 text-9xl pointer-events-none select-none" style={{ opacity: 0.06, fontSize: 100 }}></div>
        <div className="absolute top-1/2 left-1/3 text-9xl pointer-events-none select-none" style={{ opacity: 0.04, fontSize: 80 }}></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)" }} />
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
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-sm font-bold text-lg transition-transform hover:opacity-90 shadow-xl"
              style={{ background: "#c4a06a", color: "#0a0a0b", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
            >
              <Icon name="Bot" size={22} />
              Оставить заявку через бота
            </a>
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-sm font-bold text-lg transition-transform hover:opacity-90 shadow-xl"
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