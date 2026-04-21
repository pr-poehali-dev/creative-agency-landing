import { useState } from "react";
import { Link } from "react-router-dom";
import CookieBanner from "@/components/CookieBanner";
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

const artistServiceItems = [
  {
    icon: "Sparkles",
    title: "Публикация трека на площадках",
    desc: "Размещу вашу песню на Spotify, Apple Music, VK Музыке, Яндекс.Музыке и других стриминговых сервисах.",
  },
  {
    icon: "UserCircle",
    title: "Оформление профиля артиста",
    desc: "Создам карточку исполнителя: фото, биография, ссылки, обложки. Ваш профиль будет выглядеть профессионально.",
  },
  {
    icon: "GraduationCap",
    title: "Обучение созданию авторских песен",
    desc: "Научу создавать музыку с нуля — от идеи и смыслов до готового трека. Без специального образования.",
  },
];

const faqItems = [
  {
    q: "Как создаётся текст песни?",
    a: "Я провожу личное интервью с заказчиком — выясняю самое важное и ценное, что он хочет передать. На основе этих смыслов я лично пишу текст. Заказчик может предложить стиль, мелодию или даже записать свой голос — всё это дополнительные опции, которые делают песню ещё более особенной.",
  },
  {
    q: "Могу ли я использовать песню в бизнесе, рекламе, соцсетях?",
    a: "Базовый пакет — для личного использования. Если планируете использовать трек коммерчески (реклама, монетизация, продажа), выберите пакет с передачей коммерческих авторских прав — он специально создан для этого.",
  },
  {
    q: "А если песня не понравится?",
    a: "Вы услышите черновой вариант текста и музыки ещё до финальной сборки. Мы вносим правки — до 3 раз в базовом пакете и до 5 раз в пакете «Хит». Не остановимся, пока не скажете «это оно».",
  },
  {
    q: "Я стесняюсь рассказывать личные истории.",
    a: "Всё конфиденциально. Ваша история используется только для создания песни и никуда не передаётся. Мы можем подписать соглашение о неразглашении (NDA) по запросу.",
  },
  {
    q: "Сколько времени занимает создание?",
    a: "Пакет «Подарок с душой» — 2–3 дня. «Хит» с живым вокалом — 5–7 дней. Срочный заказ обсуждается индивидуально — пишите в Telegram.",
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
  {
    img: COVER3_IMG,
    title: "Обнимаю всей Вселенной",
    occasion: "Песня для мамы",
    desc: "Песня стала настоящим хитом — показала самые нежные и добрые чувства между ребёнком и родной матерью. Дочь пишет маме о любви размером со Вселенную.",
    genre: "Лирика",
    icon: "Heart",
    link: "https://vk.ru/audio69559731_456239233",
    lyrics: `Куплет 1:
Ты — источник чистой силы, бесконечный, тихий свет.
Ты окутываешь негой, нас храня от сотен бед.
Словно шалью в злую стужу, обнимаешь в трудный час,
И молитвой молчаливой согреваешь каждый раз.

Руки трудятся родные от зари и до темна,
Чтобы в доме было счастье, чтоб цвела в душе весна.
Утром — хлеба нежный запах, вечером — покой, уют...
Без тебя, родная мама, наши птицы не поют.

Припев:
Мама, мамочка родная, самый нежный мой цветок!
В сердце каждом прорастает твоей мудрости росток.
Ты живёшь в моей улыбке, в каждой клеточке, в крови,
Ты — Начало всех начал, оберег большой любви.

Мама, мамочка, сияй же! Пусть исчезнет грусти тень,
Пусть растают все невзгоды и начнётся новый день!
Обнимаю всей Вселенной, я дарю тебе Звезду —
Пусть она горит лампадой, освещая красоту!

Куплет 2:
Ты на страже нашей жизни, верный Ангел во плоти,
Помогаешь не споткнуться, не сломаться на пути.
Благо льётся, словно елей, исцеляющий бальзам,
Если нужно — как орлица, дашь отпор любым ветрам.

Вдохновляешь нас на подвиг кротким взглядом своих глаз,
Утешаешь в час печали, не жалея тёплых фраз.
Под покровом твоим мягким каждый миг нам дорог стал,
Ты для нас — весь мир бескрайний, наш причал и пьедестал.

Припев:
Мама, мамочка родная, самый нежный мой цветок!
В сердце каждом прорастает твоей мудрости росток.
Ты живёшь в моей улыбке, в каждой клеточке, в крови,
Ты — Начало всех начал, оберег большой любви.

Мама, мамочка, сияй же! Пусть исчезнет грусти тень,
Пусть растают все невзгоды и начнётся новый день!
Обнимаю всей Вселенной, я дарю тебе Звезду —
Пусть она горит лампадой, освещая красоту!

Мост:
Я хочу, чтоб ты смеялась, забывая про года,
И чтоб солнце — твой источник — тебя грело без конца.
Пусть морщинки — лишь от смеха, пусть в душе звенят ручьи,
Знай, что мы навеки рядом... Знай, что мы всегда — твои!

Ты — в дыханье, в каждом слове, в ритме сердца моего,
В любой буре, в любом шторме — нет надёжней ничего,
Чем твоя святая вера, чем твоя любовь без слов...
Ты — мой Храм, моя Опора, мой единственный Покров!

Припев:
Мама, мамочка родная, самый нежный мой цветок!
В сердце каждом прорастает твоей мудрости росток.
Ты живёшь в моей улыбке, в каждой клеточке, в крови,
Ты — Начало всех начал, оберег большой любви.

Мама, мамочка, сияй же! Пусть исчезнет грусти тень,
Пусть растают все невзгоды и начнётся новый день!
Обнимаю всей Вселенной, я дарю тебе Звезду —
Пусть она горит лампадой, освещая красоту!

Мама... мамочка... мой свет...
Тебя дороже... в мире нет...
Люблю...`,
  },
  {
    img: COVER4_IMG,
    title: "Гимн выпускников",
    occasion: "Колледж психологии",
    desc: "Песня в стиле старинного гимна Кембриджской академии. Утончённый, умный гимн с именами сокурсников и преподавателей — подарок студентки, ставший взрывом курса.",
    genre: "Академический гимн",
    icon: "GraduationCap",
  },
  {
    img: COVER5_IMG,
    title: "Диско для подруги",
    occasion: "День рождения",
    desc: "Танцевали всю ночь под эту песню! Зажигательный диско-трек в честь именинницы — теперь все друзья поют её на каждом празднике.",
    genre: "Диско",
    icon: "Music2",
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcStep, setCalcStep] = useState(0);
  const [calcAnswers, setCalcAnswers] = useState<string[]>([]);
  const [calcDone, setCalcDone] = useState(false);
  const [openLyrics, setOpenLyrics] = useState<number | null>(null);

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

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(20,10,3,0.95) 45%, rgba(20,10,3,0.5) 75%, rgba(20,10,3,0.15))" }} />

        <div className="relative z-10 container mx-auto max-w-6xl px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

          {/* ── Левая колонка: текст ── */}
          <div className="flex-1 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.22)" }}>
              <Icon name="Star" size={13} style={{ color: "#f5c97a" }} />
              <span className="text-sm font-semibold text-white">Артист и автор песен</span>
              <span className="font-extrabold text-sm" style={{ color: "#f5c97a" }}>GALAKTIKA</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              Авторская песня<br />
              <span style={{ color: "#f5c97a" }}>лично для вас</span>
            </h1>

            <p className="text-lg text-white/80 mb-3 leading-relaxed">
              Меня зовут <strong className="text-white">Юлия Измайлова</strong> — я профессиональный автор-исполнитель. Пишу тексты, музыку и пою сама.
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Расскажите мне вашу историю — и я создам уникальный трек специально для вас или вашего близкого. Готово за <strong className="text-white">2–3 дня</strong>.
            </p>

            {/* Платформы артиста */}
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#7a5c44" }}>Послушать моё творчество:</p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="https://music.yandex.com/artist/2948671"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                style={{ background: "rgba(255,204,0,0.18)", color: "#fff", border: "1px solid rgba(255,204,0,0.4)" }}
              >
                <Icon name="Headphones" size={15} />
                Яндекс Музыка
              </a>
              <a
                href="https://vk.ru/artist/galaktika_mtuyntc0odg0mw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                style={{ background: "rgba(0,119,255,0.18)", color: "#fff", border: "1px solid rgba(0,119,255,0.4)" }}
              >
                <Icon name="Music2" size={15} />
                ВК Музыка
              </a>
              <a
                href="https://vk.ru/club235584480"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                style={{ background: "rgba(255,255,255,0.10)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <Icon name="Users" size={15} />
                Сообщество ВКонтакте
              </a>
            </div>

            <Button
              onClick={scrollToForm}
              size="lg"
              className="text-lg px-8 py-6 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform"
              style={{ background: "#c2410c", color: "#fff" }}
            >
              <Icon name="Music" size={20} className="mr-2" />
              Заказать песню
            </Button>
          </div>

          {/* ── Правая колонка: фото ── */}
          <div className="flex-shrink-0 flex flex-col items-center lg:ml-auto">
            <div className="relative">
              {/* Glow за фото */}
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-40"
                style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }}
              />
              <img
                src="https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/344bf7da-4f0c-4b6b-ab42-6cc2b9daded2.jpeg"
                alt="Юлия Измайлова — автор-исполнитель GALAKTIKA"
                className="relative w-72 md:w-80 lg:w-96 rounded-3xl object-cover shadow-2xl"
                style={{ border: "2px solid rgba(255,255,255,0.15)", aspectRatio: "3/4", objectPosition: "top" }}
              />
              {/* Плашка-подпись */}
              <div
                className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 backdrop-blur-sm"
                style={{ background: "rgba(20,10,3,0.75)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <p className="text-white font-bold text-sm">Юлия Измайлова</p>
                <p className="text-xs mt-0.5" style={{ color: "#f5c97a" }}>Автор-исполнитель · GALAKTIKA</p>
              </div>
            </div>
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
            Реальные истории — реальные треки
          </h2>
          <p className="text-center text-lg mb-14" style={{ color: "#c9a882" }}>
            Живой вокал, профессиональная запись, настоящие эмоции
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioTracks.map((track, i) => (
              <Card key={i} className="overflow-hidden border-0 hover:shadow-2xl transition-all" style={{ background: "#3d2c1c" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img src={track.img} alt={track.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
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
          <p className="text-center mt-8 text-sm" style={{ color: "#9a7a65" }}>
            Хотите послушать больше работ? Напишите нам — пришлём подборку в Telegram
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

          <p className="text-center mt-8 text-sm" style={{ color: "#9a7a65" }}>
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

      {/* ─── ARTIST SERVICE ───────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "#1a0f07" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-4">
            <span className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full" style={{ background: "rgba(245,201,122,0.15)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.3)" }}>
              Дополнительная услуга
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mt-4 mb-4 text-white">
            Хотите стать артистом?
          </h2>
          <p className="text-center text-lg mb-14" style={{ color: "#c9a882" }}>
            Помогу вам выйти на музыкальный рынок — от нуля до собственного имени на стриминговых площадках
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {artistServiceItems.map((item, i) => (
              <Card key={i} className="p-7 border-0" style={{ background: "#2d2016" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(245,201,122,0.15)" }}>
                  <Icon name={item.icon as "Sparkles"} size={24} style={{ color: "#f5c97a" }} />
                </div>
                <h3 className="font-extrabold text-lg text-white mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#c9a882" }}>{item.desc}</p>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-transform hover:scale-105"
              style={{ background: "rgba(245,201,122,0.15)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.4)" }}
            >
              <Icon name="Send" size={18} />
              Узнать подробнее в Telegram
            </a>
            <p className="text-sm mt-4" style={{ color: "#5a3d2b" }}>Стоимость обсуждается индивидуально</p>
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

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="py-10 px-6" style={{ background: "#110a04", color: "#7a5c44" }}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 text-xs">
            <div>
              <p className="font-semibold mb-1" style={{ color: "#c9a882" }}>ИП Измайлова Юлия Александровна</p>
              <p>ИНН: 665895132301</p>
              <p>198207, г. Санкт-Петербург, пр-кт Ленинский, д 117, корп 1, кв 234</p>
              <p>Без НДС (УСН)</p>
            </div>
            <div className="flex flex-col gap-2 text-xs md:text-right">
              <Link to="/public-offer" className="hover:underline" style={{ color: "#c9a882" }}>
                Договор-оферта
              </Link>
              <Link to="/privacy-policy" className="hover:underline" style={{ color: "#c9a882" }}>
                Политика конфиденциальности
              </Link>
              <a href="https://t.me/izmailova8888" className="hover:underline" style={{ color: "#c9a882" }}>
                Telegram: @izmailova8888
              </a>
            </div>
          </div>
          <div className="border-t pt-4 text-center text-xs" style={{ borderColor: "#2a1a0e" }}>
            <p>© 2026 ИП Измайлова Юлия Александровна · Все права защищены</p>
            <p className="mt-1">
              Нажимая «Оставить заявку», вы принимаете условия{" "}
              <Link to="/public-offer" className="hover:underline" style={{ color: "#c9a882" }}>договора-оферты</Link>
              {" "}и соглашаетесь с{" "}
              <Link to="/privacy-policy" className="hover:underline" style={{ color: "#c9a882" }}>политикой конфиденциальности</Link>
            </p>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}