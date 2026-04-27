import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navLinks = [
  { to: "/uslugi", label: "Услуги", icon: "Sparkles", desc: "Все направления" },
  { to: "/portfolio", label: "Портфолио", icon: "Headphones", desc: "Послушать примеры" },
  { to: "/otzyvy", label: "Отзывы", icon: "Star", desc: "Что говорят клиенты" },
  { to: "/blog", label: "Блог", icon: "BookOpen", desc: "Статьи и советы" },
  { to: "/o-nas", label: "О нас", icon: "User", desc: "Юлия и команда" },
  { to: "/contacts", label: "Контакты", icon: "Phone", desc: "Связаться с нами" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50" style={{ background: "rgba(20,10,3,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="container mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">

        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105" style={{ background: "#c2410c" }}>
            <Icon name="Music2" size={14} style={{ color: "#fff" }} />
          </div>
          <span className="font-extrabold text-sm text-white tracking-wider hidden sm:block">AI MUSELAB</span>
        </Link>

        {/* Десктоп-ссылки */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(link => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:text-white hover:bg-white/5"
                style={{ color: active ? "#f5c97a" : "#9a7a65" }}
              >
                <Icon name={link.icon as "Star"} size={13} style={{ color: active ? "#f5c97a" : "#7a5c44" }} />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
            style={{ background: "#c2410c" }}
          >
            <Icon name="Mic" size={13} />
            Заказать песню
          </Link>
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
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            <Icon name={open ? "X" : "Menu"} size={17} style={{ color: "#f5c97a" }} />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        <div className="md:hidden border-t" style={{ background: "rgba(15,7,2,0.99)", borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => {
              const active = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/5"
                  style={{ background: active ? "rgba(194,65,12,0.12)" : "transparent" }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: active ? "rgba(194,65,12,0.3)" : "rgba(255,255,255,0.06)" }}>
                    <Icon name={link.icon as "Star"} size={15} style={{ color: active ? "#f5c97a" : "#7a5c44" }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold" style={{ color: active ? "#f5c97a" : "#fff" }}>{link.label}</div>
                    <div className="text-xs" style={{ color: "#5a3d2b" }}>{link.desc}</div>
                  </div>
                  <Icon name="ChevronRight" size={14} style={{ color: "#3a2010" }} />
                </Link>
              );
            })}

            <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "#c2410c" }}
              >
                <Icon name="Mic" size={16} />
                Заказать песню
              </Link>
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
  );
}