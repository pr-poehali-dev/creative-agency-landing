import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Страницы",
    links: [
      { to: "/", label: "Главная" },
      { to: "/portfolio", label: "Примеры работ" },
      { to: "/otzyvy", label: "Отзывы" },
      { to: "/o-nas", label: "О нас" },
      { to: "/blog", label: "Блог" },
    ],
  },
  {
    title: "Информация",
    links: [
      { to: "/uslugi", label: "Услуги и цены" },
      { to: "/faq", label: "FAQ" },
      { to: "/contacts", label: "Контакты" },
      { to: "/privacy-policy", label: "Политика конфиденциальности" },
      { to: "/public-offer", label: "Публичная оферта" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6" style={{ background: "#F3EFFF", borderTop: "1px solid rgba(168,85,247,0.2)" }}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Бренд */}
          <div className="md:col-span-2">
            <p className="font-extrabold text-base mb-1" style={{ color: "#1A1030" }}>AI MUSELAB</p>
            <p className="text-sm mb-4" style={{ color: "#6B5E91" }}>Авторские песни на заказ в подарок</p>
            <div className="text-sm space-y-1" style={{ color: "#9688B8" }}>
              <p className="font-semibold" style={{ color: "#4A3F6B" }}>ИП Измайлова Юлия Александровна</p>
              <p>ИНН: 665895132301</p>
              <p>198207, г. Санкт-Петербург, пр-кт Ленинский, д 117, корп 1, кв 234</p>
              <p>Без НДС (УСН)</p>
            </div>
          </div>

          {/* Навигационные колонки */}
          {footerLinks.map(col => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#A855F7" }}>{col.title}</p>
              <div className="flex flex-col gap-2">
                {col.links.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm transition-colors"
                    style={{ color: "#6B5E91" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Контакты */}
        <div className="border-t pt-6 mb-6" style={{ borderColor: "rgba(168,85,247,0.2)" }}>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="mailto:aimuselab@yandex.ru" style={{ color: "#6B5E91" }}>
              Email: aimuselab@yandex.ru
            </a>
            <a href="https://t.me/izmailova8888" target="_blank" rel="noopener noreferrer" style={{ color: "#6B5E91" }}>
              Telegram: @izmailova8888
            </a>
            <a href="https://t.me/AIMusalab_bot" target="_blank" rel="noopener noreferrer" style={{ color: "#6B5E91" }}>
              Бот: @AIMusalab_bot
            </a>
            <a href="https://vk.ru/club235584480" target="_blank" rel="noopener noreferrer" style={{ color: "#6B5E91" }}>
              ВКонтакте
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm" style={{ color: "#9688B8" }}>
          <p>© 2026 ИП Измайлова Юлия Александровна · Все права защищены</p>
          <p className="mt-1">
            Нажимая «Оставить заявку», вы принимаете условия{" "}
            <Link to="/public-offer" className="underline" style={{ color: "#A855F7" }}>договора-оферты</Link>
            {" "}и соглашаетесь с{" "}
            <Link to="/privacy-policy" className="underline" style={{ color: "#A855F7" }}>политикой конфиденциальности</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}