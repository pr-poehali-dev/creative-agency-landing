import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navLinks = [
  { to: "/portfolio", label: "Портфолио", icon: "Headphones" },
  { to: "/otzyvy", label: "Отзывы", icon: "Star" },
  { to: "/o-nas", label: "О нас", icon: "User" },
  { to: "/faq", label: "FAQ", icon: "HelpCircle" },
  { to: "/uslugi", label: "Услуги", icon: "Sparkles" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50" style={{ background: "rgba(20,10,3,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="container mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="font-extrabold text-base text-white tracking-wide flex-shrink-0">
          AI MUSELAB
        </Link>

        {/* Десктоп-ссылки */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:text-white"
              style={{ color: "#c9a882" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://t.me/izmailova8888"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
            style={{ background: "#c2410c" }}
          >
            <Icon name="Send" size={13} />
            Заказать
          </a>

          {/* Гамбургер */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ background: "rgba(255,255,255,0.08)" }}
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            <Icon name={open ? "X" : "Menu"} size={18} style={{ color: "#fff" }} />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        <div className="md:hidden border-t" style={{ background: "rgba(20,10,3,0.98)", borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{ color: "#c9a882" }}
              >
                <Icon name={link.icon as "Star"} size={16} style={{ color: "#f5c97a" }} />
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <a
                href="https://t.me/izmailova8888"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white"
                style={{ background: "#c2410c" }}
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
