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

const NAV_SECTIONS: { id: string; label: string }[] = [];

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
        {/* Верхняя строка */}
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
          {/* Бургер на мобиле */}
          <button
            className="sm:hidden p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#f5c97a" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Таб-навигация по разделам (десктоп) */}
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

      {/* Заглушка — страница обновляется */}
      <section className="pt-40 pb-32 px-6 text-center" style={{ background: "#2d2016" }}>
        <div className="container mx-auto max-w-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Услуги</h1>
          <p className="text-lg mb-8" style={{ color: "#c9a882" }}>Раздел обновляется. Напишите нам — расскажем подробно.</p>
          <a
            href="https://t.me/izmailova8888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-transform hover:scale-105"
            style={{ background: "#c2410c" }}
          >
            <Icon name="Send" size={18} />
            Написать в Telegram
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-sm" style={{ background: "#1a0f07", color: "#5a3d2b" }}>
        <Link to="/" className="hover:underline" style={{ color: "#9a7a65" }}>← Вернуться к песням на заказ</Link>
      </footer>
    </div>
  );
}
