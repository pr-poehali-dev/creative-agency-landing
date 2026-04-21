import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { usePageMeta } from "@/hooks/usePageMeta";
import Icon from "@/components/ui/icon";

interface Props {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  category: string;
  date: string;
  readTime: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export default function BlogArticleTemplate({ slug, title, metaTitle, metaDesc, category, date, readTime, intro, sections }: Props) {
  useBreadcrumb([
    { name: "Главная", item: "https://aimuselab.ru/" },
    { name: "Блог", item: "https://aimuselab.ru/blog" },
    { name: title, item: `https://aimuselab.ru/blog/${slug}` },
  ]);
  usePageMeta({ title: metaTitle, description: metaDesc, ogUrl: `https://aimuselab.ru/blog/${slug}` });

  return (
    <div style={{ background: "#0d0702", minHeight: "100vh" }}>
      <NavBar />

      {/* ─── HERO ─── */}
      <section className="py-14 px-6" style={{ background: "linear-gradient(180deg, #1a0d04 0%, #0d0702 100%)" }}>
        <div className="container mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-70" style={{ color: "#c9a882" }}>
            <Icon name="ArrowLeft" size={14} /> Назад в блог
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(194,65,12,0.2)", color: "#f5c97a" }}>{category}</span>
            <span className="text-xs" style={{ color: "#7a5c44" }}>{date} · {readTime} чтения</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">{title}</h1>
          <p className="text-lg leading-relaxed" style={{ color: "#c9a882" }}>{intro}</p>
        </div>
      </section>

      {/* ─── КОНТЕНТ ─── */}
      <section className="py-10 px-6">
        <div className="container mx-auto max-w-3xl space-y-8">
          {sections.map((s, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ background: "#1a0d04", border: "1px solid #2a1a0e" }}>
              <h2 className="text-xl font-extrabold text-white mb-3">{s.heading}</h2>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#c9a882" }}>{s.body}</p>
            </div>
          ))}

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(194,65,12,0.1)", border: "2px solid #c2410c" }}>
            <h3 className="text-xl font-extrabold text-white mb-3">Готовы создать вашу персональную песню?</h3>
            <p className="text-sm mb-5" style={{ color: "#c9a882" }}>Расскажите историю — и через 2–3 дня у вас будет авторская песня, которую будут переслушивать годами</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://t.me/izmailova8888" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white hover:scale-105 transition-transform" style={{ background: "#c2410c" }}>
                <Icon name="Send" size={16} /> Написать в Telegram
              </a>
              <Link to="/portfolio" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold hover:scale-105 transition-transform" style={{ background: "rgba(255,255,255,0.07)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.3)" }}>
                <Icon name="Play" size={16} /> Послушать примеры
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RELATED ─── */}
      <section className="py-10 px-6" style={{ background: "#110a04" }}>
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-lg font-extrabold text-white mb-5">Читайте также</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { to: "/blog/top-10-idej-podarkov-na-godovshchinu", title: "Топ-10 идей подарков на годовщину свадьбы" },
              { to: "/blog", title: "Все статьи блога AI Muse Lab" },
            ].map(link => (
              <Link key={link.to} to={link.to} className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]" style={{ background: "#1a0d04", border: "1px solid #2a1a0e" }}>
                <Icon name="ArrowRight" size={14} style={{ color: "#f5c97a", flexShrink: 0 }} />
                <span className="text-sm font-semibold" style={{ color: "#c9a882" }}>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
