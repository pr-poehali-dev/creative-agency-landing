import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { usePageMeta } from "@/hooks/usePageMeta";
import Icon from "@/components/ui/icon";

const categories = ["Все", "Идеи подарков", "О создании песен", "Истории клиентов", "Полезные советы"];

const articles = [
  {
    slug: "top-10-idej-podarkov-na-godovshchinu",
    title: "Топ-10 идей подарков на годовщину свадьбы: от классики до эмоционального прорыва",
    excerpt: "Годовщина свадьбы — праздник вашей любви. Мы собрали 10 лучших идей подарков — от классических украшений до персональной авторской песни. Гарантируем слёзы радости!",
    category: "Идеи подарков",
    icon: "Heart",
    date: "22 апреля 2026",
    readTime: "7 мин",
    hot: true,
  },
  {
    slug: "chto-podarit-mame-na-yubilej",
    title: "Что подарить маме на юбилей: 15 душевных идей, которые запомнятся на всю жизнь",
    excerpt: "Ищете подарок для мамы, который тронет до слёз? Собрали 15 идей — от простых до самых неожиданных. Спойлер: лучшее — это то, что создано специально для неё.",
    category: "Идеи подарков",
    icon: "Flower2",
    date: "20 апреля 2026",
    readTime: "6 мин",
    hot: false,
  },
  {
    slug: "pesnya-na-zakaz-vs-obychnyj-podarok",
    title: "Песня на заказ vs обычный подарок: что вызывает больше эмоций?",
    excerpt: "Мы сравнили реакции людей на разные подарки. Результат удивил даже нас. Почему авторская песня вызывает слёзы там, где дорогой подарок вызывает лишь улыбку?",
    category: "О создании песен",
    icon: "BarChart2",
    date: "18 апреля 2026",
    readTime: "5 мин",
    hot: false,
  },
  {
    slug: "kak-sozdaetsya-personalnaya-pesnya",
    title: "Как создаётся персональная песня: от интервью до готового трека",
    excerpt: "Заглянем за кулисы: как проходит глубинное интервью, как рождается текст, как AI помогает в продюсировании. Полный путь от вашей истории до студийного трека.",
    category: "О создании песен",
    icon: "Music2",
    date: "15 апреля 2026",
    readTime: "8 мин",
    hot: false,
  },
  {
    slug: "7-prichin-zakazat-zhivoj-vokal",
    title: "7 причин заказать живой вокал для свадебной песни",
    excerpt: "Чем живой вокал отличается от AI? Когда это важно? Разбираем 7 ситуаций, когда живой голос превращает хорошую песню в незабываемый момент.",
    category: "Полезные советы",
    icon: "Mic",
    date: "12 апреля 2026",
    readTime: "5 мин",
    hot: false,
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Все");

  useBreadcrumb([
    { name: "Главная", item: "https://aimuselab.ru/" },
    { name: "Блог", item: "https://aimuselab.ru/blog" },
  ]);
  usePageMeta({
    title: "Блог AI Muse Lab | Идеи Подарков и Советы по Заказу Песни",
    description: "Статьи об идеях подарков, создании авторских песен, историях клиентов и полезных советах. Узнайте всё о персональных песнях на заказ.",
    ogUrl: "https://aimuselab.ru/blog",
  });

  const filtered = activeCategory === "Все"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div style={{ background: "#0d0702", minHeight: "100vh" }}>
      <NavBar />

      {/* ─── HERO ─── */}
      <section className="py-16 px-6 text-center" style={{ background: "linear-gradient(180deg, #1a0d04 0%, #0d0702 100%)" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <Icon name="BookOpen" size={14} style={{ color: "#f5c97a" }} />
            <span className="text-sm text-white/80">Полезные статьи и советы</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Блог <span style={{ color: "#f5c97a" }}>AI Muse Lab</span>
          </h1>
          <p className="text-base" style={{ color: "#c9a882" }}>
            Идеи подарков, истории клиентов и советы по созданию авторских песен
          </p>
        </div>
      </section>

      {/* ─── КАТЕГОРИИ ─── */}
      <section className="py-6 px-6" style={{ background: "#110a04" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={activeCategory === cat
                  ? { background: "#c2410c", color: "#fff" }
                  : { background: "rgba(255,255,255,0.06)", color: "#c9a882", border: "1px solid #2a1a0e" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── СПИСОК СТАТЕЙ ─── */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((article, i) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden transition-transform hover:scale-[1.02]"
                style={{ background: "#1a0d04", border: "1px solid #2a1a0e" }}
              >
                {/* Шапка карточки */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(194,65,12,0.2)", color: "#f5c97a" }}>
                      {article.category}
                    </span>
                    {article.hot && (
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#c2410c", color: "#fff" }}>
                        🔥 Популярное
                      </span>
                    )}
                  </div>

                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(245,201,122,0.1)" }}>
                    <Icon name={article.icon as "Heart"} size={22} style={{ color: "#f5c97a" }} />
                  </div>

                  <h2 className="text-lg font-extrabold text-white mb-3 leading-snug group-hover:text-amber-300 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#c9a882" }}>
                    {article.excerpt}
                  </p>
                </div>

                {/* Футер карточки */}
                <div className="px-6 py-4 flex items-center justify-between border-t" style={{ borderColor: "#2a1a0e" }}>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "#7a5c44" }}>
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime} чтения</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#f5c97a" }}>
                    Читать <Icon name="ArrowRight" size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: "#7a5c44" }}>
              <Icon name="Search" size={40} style={{ margin: "0 auto 16px", opacity: 0.4 }} />
              <p>Статей в этой категории пока нет</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-14 px-6 text-center" style={{ background: "#1a0d04" }}>
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl font-extrabold text-white mb-3">Готовы создать вашу песню?</h2>
          <p className="text-sm mb-6" style={{ color: "#c9a882" }}>Расскажите историю — и через 2–3 дня у вас будет персональный шедевр</p>
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
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
