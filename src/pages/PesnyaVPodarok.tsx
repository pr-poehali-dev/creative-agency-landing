import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/4fee9940-7db1-4128-9a82-27b34ded74bb.jpg";
const VINYL_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/1b51b62f-525c-42f3-ac36-5114e5d51e17.jpg";
const STUDIO_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/add1436d-d6f3-42b3-bc70-66cf247e9536.jpg";
const WEDDING_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/0a89312a-7bdc-4e0f-958a-d1062ca38446.jpg";
const COVER1_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/a130246d-ea42-4eb8-8ae2-92336d9788ca.jpg";
const COVER2_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/9bcd938c-ad7b-4602-b091-03abf5f5f978.jpg";
const COVER3_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/2b9bc1d0-00ba-4a89-a687-94bdb34df3ac.jpg";

const faqItems = [
  {
    q: "А если песня не понравится?",
    a: "Мы даём гарантию на доработки. Вы услышите демо-версию текста и музыки ещё до чистовой записи. Мы не остановимся, пока вы не скажете «Вау!».",
  },
  {
    q: "Я стесняюсь рассказывать личные истории.",
    a: "Мы подписываем соглашение о неразглашении (NDA). Ваша история — только между нами и микрофоном.",
  },
  {
    q: "Это будет звучать как робот?",
    a: "Мы работаем только с живыми вокалистами и профессиональными музыкантами. Финальный трек записывается на студии звукозаписи — никакого «бубнежа».",
  },
  {
    q: "Сколько времени занимает создание?",
    a: "Пакет «Душевный» — 3–5 дней. Пакет «Хит для любимых» — 5–7 дней. Срочный заказ обсуждается отдельно.",
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
    icon: "Music",
    title: "Мы пишем текст и музыку",
    desc: "Наши авторы создают уникальный сценарий, а музыканты — аранжировку специально для вашей истории.",
    img: STUDIO_IMG,
  },
  {
    num: "03",
    icon: "Play",
    title: "Вы слушаете демо",
    desc: "Присылаем черновой вариант. Вы можете внести до 3 правок бесплатно — добавить слова, изменить темп.",
  },
  {
    num: "04",
    icon: "Gift",
    title: "Получаете готовый трек + бонус",
    desc: "Качественный аудиофайл + красивое видео-слайдшоу из ваших фото в подарок!",
  },
];

const portfolioTracks = [
  {
    img: COVER1_IMG,
    title: "Маме от дочери на 60-летие",
    genre: "Душевная лирика",
    icon: "Heart",
  },
  {
    img: COVER2_IMG,
    title: "Любимому мужу на годовщину",
    genre: "Поп-рок",
    icon: "Music2",
  },
  {
    img: COVER3_IMG,
    title: "Гимн семьи Ивановых",
    genre: "Авторская песня",
    icon: "Users",
  },
];

const reviews = [
  {
    name: "Анна",
    city: "Москва",
    text: "У мужа никогда не текли слёзы от подарков, а тут сидел и слушал минуты три молча, потом сказал: «Это лучшее, что мне дарили». Спасибо за эти эмоции!",
    emoji: "😭",
  },
  {
    name: "Дмитрий",
    city: "Казань",
    text: "Заказывали песню на свадьбу друзьям. Весь зал плакал и подпевал. Мы были королями вечера! Всё сделали чётко и в срок.",
    emoji: "🎉",
  },
  {
    name: "Марина",
    city: "Санкт-Петербург",
    text: "Боялась, что получится что-то формальное. Но когда услышала — мурашки по коже. Это НАША история, наши слова. Буду заказывать снова!",
    emoji: "✨",
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
  const [formData, setFormData] = useState({ name: "", contact: "" });
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcStep, setCalcStep] = useState(0);
  const [calcAnswers, setCalcAnswers] = useState<string[]>([]);
  const [calcDone, setCalcDone] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setFormLoading(true);
    try {
      await fetch("https://functions.poehali.dev/1da8aa11-ec15-4134-82ec-7826c554f737", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          answers: calcDone
            ? { who: calcAnswers[0], occasion: calcAnswers[1], genre: calcAnswers[2] }
            : {}
        })
      });
      setFormSent(true);
    } catch {
      setFormSent(true);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: "#faf7f4", color: "#2d2016" }}>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'); body { font-family: 'Montserrat', sans-serif; }`}</style>

      {/* Sticky CTA button */}
      <a
        href="https://t.me/aimuselab"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl text-white text-sm font-semibold transition-transform hover:scale-105"
        style={{ background: "#2563eb" }}
      >
        <Icon name="Send" size={18} />
        Написать в Telegram
      </a>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,15,5,0.82) 50%, rgba(30,15,5,0.3))" }} />
        <div className="relative z-10 container mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <Badge className="mb-6 text-sm px-4 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
              Уже подарили 100+ незабываемых эмоций
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Песня о Вас<br />и для Вас
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-4" style={{ color: "#f5c97a" }}>
              Уникальный подарок, который вызовет слёзы счастья
            </p>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Расскажите вашу историю, а мы превратим её в профессиональный трек с живым вокалом за 3–5 дней.
            </p>
            <Button
              onClick={scrollToForm}
              size="lg"
              className="text-lg px-8 py-6 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform"
              style={{ background: "#c2410c", color: "#fff" }}
            >
              <Icon name="Music" size={20} className="mr-2" />
              Рассказать историю и получить трек
            </Button>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-1 animate-bounce">
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
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#2d2016" }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-white">
            Слушайте сами
          </h2>
          <p className="text-center text-lg mb-14" style={{ color: "#c9a882" }}>
            Работы для частных клиентов — живой вокал, настоящие истории
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {portfolioTracks.map((track, i) => (
              <Card key={i} className="overflow-hidden border-0 group cursor-pointer hover:shadow-2xl transition-all" style={{ background: "#3d2c1c" }}>
                <div className="relative aspect-square overflow-hidden">
                  <img src={track.img} alt={track.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)" }}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(194,65,12,0.9)" }}>
                      <Icon name="Play" size={24} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={track.icon as "Heart"} size={16} style={{ color: "#f5c97a" }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5c97a" }}>{track.genre}</span>
                  </div>
                  <p className="font-semibold text-white text-sm">{track.title}</p>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center mt-8 text-sm" style={{ color: "#9a7a65" }}>
            * Треки воспроизводятся после отправки заявки — менеджер пришлёт подборку в удобном формате
          </p>
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
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Card key={i} className="p-6 border-0 shadow-md" style={{ background: "#fff" }}>
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
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full shadow" style={{ background: "#fff", border: "1px solid #e5c9b5" }}>
              <img src={WEDDING_IMG} alt="event" className="w-10 h-10 object-cover rounded-full" />
              <span className="text-sm font-medium" style={{ color: "#5a3d2b" }}>Видео-отзывы доступны по запросу у менеджера</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#faf7f4" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: "#2d2016" }}>
            Цены и пакеты
          </h2>
          <p className="text-center text-lg mb-14" style={{ color: "#7a5c44" }}>
            Никаких скрытых платежей — всё включено
          </p>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Package 1 */}
            <Card className="p-8 border-2" style={{ borderColor: "#e5c9b5", background: "#fff" }}>
              <h3 className="font-extrabold text-2xl mb-2" style={{ color: "#2d2016" }}>Душевный подарок</h3>
              <p className="text-sm mb-6" style={{ color: "#9a7a65" }}>Идеально для тёплого личного подарка</p>
              <div className="text-4xl font-extrabold mb-1" style={{ color: "#c2410c" }}>9 900 ₽</div>
              <p className="text-xs mb-8" style={{ color: "#9a7a65" }}>Дешевле, чем букет из 101 розы</p>
              <ul className="space-y-3 mb-8">
                {["Текст + мелодия под гитару / клавиши", "Запись вокала (исполнитель студии)", "До 3 правок бесплатно", "Срок: 3–5 дней"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#5a3d2b" }}>
                    <Icon name="Check" size={16} style={{ color: "#c2410c" }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-5 rounded-full font-bold" variant="outline" style={{ borderColor: "#c2410c", color: "#c2410c" }}>
                Заказать «Душевный»
              </Button>
            </Card>

            {/* Package 2 — recommended */}
            <Card className="p-8 border-2 relative" style={{ borderColor: "#c2410c", background: "#fff4ec" }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="px-4 py-1 text-sm font-bold rounded-full" style={{ background: "#c2410c", color: "#fff" }}>
                  Рекомендуем
                </Badge>
              </div>
              <h3 className="font-extrabold text-2xl mb-2 mt-2" style={{ color: "#2d2016" }}>Хит для любимых</h3>
              <p className="text-sm mb-6" style={{ color: "#9a7a65" }}>Для особенных событий и самых близких</p>
              <div className="text-4xl font-extrabold mb-1" style={{ color: "#c2410c" }}>19 900 ₽</div>
              <p className="text-xs mb-8" style={{ color: "#9a7a65" }}>Впечатления на всю жизнь</p>
              <ul className="space-y-3 mb-8">
                {["Профессиональная аранжировка (полный инструментал)", "Профессиональный вокал + бэк-вокал", "Видео-слайдшоу из ваших фото — в подарок!", "До 5 правок бесплатно", "Срок: 5–7 дней"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#5a3d2b" }}>
                    <Icon name="Check" size={16} style={{ color: "#c2410c" }} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full py-5 rounded-full font-bold text-white" style={{ background: "#c2410c" }}>
                Заказать «Хит»
              </Button>
            </Card>
          </div>
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
                  Ваша идея подходит для пакета «Душевный»!
                </h3>
                <p style={{ color: "#c9a882" }} className="mb-6 leading-relaxed">
                  Мы уже начали придумывать припев! Оставьте номер ниже — получите вариант первой строчки песни в подарок к расчёту.
                </p>
                <Button
                  onClick={scrollToForm}
                  className="px-8 py-5 rounded-full font-bold text-white"
                  style={{ background: "#c2410c" }}
                >
                  Получить первую строчку
                </Button>
              </div>
            )}
          </Card>
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
                {openFaq === i && (
                  <div className="px-6 pb-6 text-base leading-relaxed" style={{ color: "#7a5c44" }}>
                    {item.a}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM ─────────────────────────────────────────────── */}
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
            Расскажите идею — и мы свяжемся в течение 15 минут
          </p>
          {!formSent ? (
            <Card className="p-8 border-0 shadow-2xl" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 text-base rounded-xl border-0"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                  required
                />
                <Input
                  placeholder="Телефон или Telegram (@username)"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="h-12 text-base rounded-xl border-0"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                  required
                />
                <Button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-6 text-base font-bold rounded-xl text-white"
                  style={{ background: "#c2410c" }}
                >
                  {formLoading ? "Отправляем..." : "Обсудить идею и получить расчёт"}
                </Button>
              </form>
              <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                Менеджер свяжется в течение 15 минут в рабочее время. Никакого спама — только обсуждение вашего будущего хита.
              </p>
            </Card>
          ) : (
            <Card className="p-10 border-0" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-3">Заявка принята!</h3>
              <p style={{ color: "#c9a882" }}>Менеджер свяжется с вами в течение 15 минут и обсудит все детали вашей будущей песни.</p>
            </Card>
          )}
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="py-8 px-6 text-center text-sm" style={{ background: "#1a0f07", color: "#7a5c44" }}>
        <p>© 2025 AI Muse Lab · <a href="/" className="hover:underline">Главная страница</a></p>
      </footer>
    </div>
  );
}