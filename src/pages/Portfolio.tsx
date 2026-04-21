import { useState } from "react";
import { Link } from "react-router-dom";
import CookieBanner from "@/components/CookieBanner";
import NavBar from "@/components/NavBar";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const COVER1_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/7f709c21-11a6-43c8-a3cf-b64d5c8b338c.jpg";
const COVER2_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/94eafe8e-96cd-4ff9-b42b-e7a85c4d84d9.jpg";
const COVER3_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/f6343e46-9ca1-436a-bb15-e903c89a11c2.jpg";
const COVER4_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/63cbba21-6de2-47e5-b294-4f527f9a0329.jpg";
const COVER5_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/a26a653d-418e-4648-8a8e-fd98fe7a9976.jpg";

const tracks = [
  {
    img: COVER1_IMG,
    title: "Зрячее сердце",
    occasion: "Юбилей бабушки 85 лет",
    genre: "Душевная лирика",
    icon: "Heart",
    link: "https://vk.ru/audio69559731_456239232",
    review: "У всей семьи текли слёзы, когда бабушка слушала эту песню. Она не видит глазами, но эта музыка помогла ей увидеть сердцем. Спасибо!",
    reviewer: "Екатерина, Москва",
    desc: "Семья поздравляла свою слепую бабушку. В её памяти живы картинки из прошлого — и эта песня стала талисманом любви всей семьи.",
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
Надежная гавань огромной любви.`,
  },
  {
    img: COVER2_IMG,
    title: "Мирный воин",
    occasion: "Папе на 23 февраля",
    genre: "Авторская песня",
    icon: "Shield",
    link: "https://vk.ru/audio69559731_456239231",
    review: "Папа слушал и не мог поверить, что это про него. Он никогда не плакал от подарков, но тут не сдержался.",
    reviewer: "Дмитрий, Казань",
    desc: "Отец-добытчик, который сражается не на войне, а в ежедневной жизни. Защищает семью, помогает внуку расти и создаёт наследие.",
    lyrics: `Куплет 1:
В наших краях нельзя играть в игру
Здесь нужно быть солдатом и в миру
Здесь не забалуешь, здесь суровый край
Хочешь жить достойно — значит, созидай.

Припев:
Отец родной!
Ты — наша сила, ты — наша стена!
Отец родной!
За твоей спиной всегда весна.
Ты добываешь счастье и покой
Своим умом, и сердцем... и рукой.
Ты наш герой!`,
  },
  {
    img: COVER3_IMG,
    title: "Обнимаю всей Вселенной",
    occasion: "Песня для мамы",
    genre: "Современная поп-баллада",
    icon: "Heart",
    link: "https://vk.ru/audio69559731_456239233",
    review: "Эта песня стала настоящим хитом в нашей семье! Мама переслушивает её каждый день.",
    reviewer: "Алина, Санкт-Петербург",
    desc: "Дочь пишет маме о любви размером со Вселенную. Самые нежные чувства между ребёнком и родной матерью.",
    lyrics: `Куплет 1:
Ты — источник чистой силы, бесконечный, тихий свет.
Ты окутываешь негой, нас храня от сотен бед.
Словно шалью в злую стужу, обнимаешь в трудный час,
И молитвой молчаливой согреваешь каждый раз.

Припев:
Мама, мамочка родная, самый нежный мой цветок!
В сердце каждом прорастает твоей мудрости росток.
Обнимаю всей Вселенной, я дарю тебе Звезду —
Пусть она горит лампадой, освещая красоту!`,
  },
  {
    img: COVER4_IMG,
    title: "Гимн выпускников",
    occasion: "Выпускной. Колледж психологии",
    genre: "Академический гимн",
    icon: "GraduationCap",
    link: "https://vk.ru/audio69559731_456239236",
    review: null,
    reviewer: null,
    desc: "Утончённый гимн с именами сокурсников и преподавателей — подарок студентки, ставший взрывом курса.",
    lyrics: `Vivat sanatio! Да здравствует исцеление!
Lux in tenebris lucet! Свет во тьме светит!

Припев:
Vivat psychologia! Наш путь открыт!
Сквозь двести часов слёз и озарений.
Мы исцелили боль. Гештальт закрыт!
Мы победили призраков и тени!

Vivat academia! Да здравствует рассвет!
Сплетаются сердца в единый круг.`,
  },
  {
    img: COVER5_IMG,
    title: "Диско для подруги",
    occasion: "День рождения",
    genre: "Диско",
    icon: "Music2",
    link: "https://vk.ru/audio69559731_456239237",
    review: "Танцевали всю ночь под эту песню! Это был лучший день рождения в моей жизни!",
    reviewer: "Ольга, Сочи",
    desc: "Зажигательный диско-трек в честь именинницы — теперь все друзья поют её на каждом празднике.",
    lyrics: `Куплет 1:
Она может поплакать, она так ранима,
Но через секунду — неукротима!
Слёзы смахнула, поправила стрелки,
Бизнес, звонки, крутые сделки.

Припев:
Кайфую с Яной! Кайфую от Яны!
Мы две вольные птицы, летим над океаном!`,
  },
];

const genres = [
  "Душевная лирика", "Авторская песня", "Поп-музыка", "Рок-баллада",
  "Диско и танцевальная", "Рэп и хип-хоп", "Романтика", "Академический стиль",
  "Детские песни", "Корпоративные гимны",
];

const occasions = [
  { icon: "Cake", label: "День рождения" },
  { icon: "Heart", label: "Свадьба" },
  { icon: "Star", label: "Юбилей" },
  { icon: "HeartHandshake", label: "Годовщина" },
  { icon: "Users", label: "Для родителей" },
  { icon: "Building2", label: "Корпоратив" },
  { icon: "GraduationCap", label: "Выпускной" },
  { icon: "Gift", label: "Новый год и праздники" },
];

export default function Portfolio() {
  const [openLyrics, setOpenLyrics] = useState<number | null>(null);
  useBreadcrumb([
    { name: "Главная", item: "https://aimuselab.ru/" },
    { name: "Портфолио", item: "https://aimuselab.ru/portfolio" },
  ]);

  return (
    <div style={{ background: "#0d0702", minHeight: "100vh" }}>

      <NavBar />

      {/* ─── HERO ─── */}
      <section className="py-20 px-6 text-center" style={{ background: "linear-gradient(180deg, #1a0d04 0%, #0d0702 100%)" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <Icon name="Headphones" size={14} style={{ color: "#f5c97a" }} />
            <span className="text-sm text-white/80">Реальные работы — реальные эмоции</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Примеры наших<br />
            <span style={{ color: "#f5c97a" }}>авторских песен</span>
          </h1>
          <p className="text-lg mb-8" style={{ color: "#c9a882" }}>
            Более <strong className="text-white">100 созданных песен</strong> для счастливых клиентов по всей России
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Слёзы радости", "Живые тексты", "Студийное звучание"].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: "rgba(245,201,122,0.12)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.25)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRACKS ─── */}
      <section className="py-16 px-6" style={{ background: "#0d0702" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8">
            {tracks.map((track, i) => (
              <Card key={i} className="overflow-hidden border-0" style={{ background: "#1a0d04", border: "1px solid #2a1a0e" }}>
                <div className="grid md:grid-cols-[220px_1fr] gap-0">
                  {/* Обложка */}
                  <div className="relative">
                    <img src={track.img} alt={track.title} className="w-full h-56 md:h-full object-cover" />
                    <div className="absolute inset-0 flex items-end p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}>
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#c2410c", color: "#fff" }}>
                        {track.genre}
                      </span>
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name={track.icon as "Heart"} size={14} style={{ color: "#f5c97a" }} />
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7a5c44" }}>{track.occasion}</span>
                      </div>
                      <h2 className="text-xl font-extrabold text-white mb-2">«{track.title}»</h2>
                      <p className="text-sm leading-relaxed" style={{ color: "#c9a882" }}>{track.desc}</p>
                    </div>

                    {/* Отзыв */}
                    {track.review && (
                      <div className="rounded-xl px-4 py-3" style={{ background: "rgba(245,201,122,0.07)", border: "1px solid rgba(245,201,122,0.15)" }}>
                        <p className="text-sm italic leading-relaxed" style={{ color: "#e8d5b0" }}>«{track.review}»</p>
                        <p className="text-xs mt-1 font-semibold" style={{ color: "#7a5c44" }}>— {track.reviewer}</p>
                      </div>
                    )}

                    {/* Кнопки */}
                    <div className="flex flex-wrap gap-3 mt-auto">
                      <a
                        href={track.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-transform hover:scale-105"
                        style={{ background: "#c2410c" }}
                      >
                        <Icon name="Play" size={14} />
                        Слушать
                      </a>
                      <button
                        onClick={() => setOpenLyrics(openLyrics === i ? null : i)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                        style={{ background: "rgba(255,255,255,0.06)", color: "#c9a882", border: "1px solid #2a1a0e" }}
                      >
                        <Icon name="FileText" size={14} />
                        {openLyrics === i ? "Скрыть текст" : "Текст песни"}
                      </button>
                    </div>

                    {/* Текст песни */}
                    {openLyrics === i && (
                      <div className="rounded-xl p-4 mt-1" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #2a1a0e" }}>
                        <pre className="text-xs leading-relaxed whitespace-pre-wrap font-sans" style={{ color: "#c9a882" }}>{track.lyrics}</pre>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ЖАНРЫ И ПОВОДЫ ─── */}
      <section className="py-16 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-extrabold text-center mb-12" style={{ color: "#2d2016" }}>
            Все жанры и поводы
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: "#2d2016" }}>Любой жанр и стиль</h3>
              <div className="space-y-2">
                {genres.map(g => (
                  <div key={g} className="flex items-center gap-2 text-sm" style={{ color: "#5a3d2b" }}>
                    <Icon name="Check" size={14} style={{ color: "#c2410c", flexShrink: 0 }} />
                    {g}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: "#2d2016" }}>Для любого повода</h3>
              <div className="grid grid-cols-2 gap-2">
                {occasions.map(o => (
                  <div key={o.label} className="flex items-center gap-2 text-sm" style={{ color: "#5a3d2b" }}>
                    <Icon name={o.icon as "Cake"} size={14} style={{ color: "#c2410c", flexShrink: 0 }} />
                    {o.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-6 text-center" style={{ background: "#1a0d04" }}>
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Хотите свою уникальную песню?
          </h2>
          <p className="text-base mb-8" style={{ color: "#c9a882" }}>
            Расскажите историю — и через 2–3 дня у вас будет персональный шедевр, который будут переслушивать годами.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ background: "#c2410c" }}
            >
              <Icon name="Send" size={17} />
              Написать в Telegram
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.3)" }}
            >
              <Icon name="Home" size={17} />
              На главную
            </Link>
          </div>
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