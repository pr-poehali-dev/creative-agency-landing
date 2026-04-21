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
      { to: "/#kontakty", label: "Контакты", hash: true },
      { to: "/privacy-policy", label: "Политика конфиденциальности" },
      { to: "/public-offer", label: "Публичная оферта" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6" style={{ background: "#110a04", color: "#7a5c44" }}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Бренд */}
          <div className="md:col-span-2">
            <p className="font-extrabold text-base text-white mb-1">AI MUSELAB</p>
            <p className="text-xs mb-4" style={{ color: "#c9a882" }}>Авторские песни на заказ в подарок</p>
            <div className="text-xs space-y-1">
              <p className="font-semibold" style={{ color: "#c9a882" }}>ИП Измайлова Юлия Александровна</p>
              <p>ИНН: 665895132301</p>
              <p>198207, г. Санкт-Петербург, пр-кт Ленинский, д 117, корп 1, кв 234</p>
              <p>Без НДС (УСН)</p>
            </div>
          </div>

          {/* Навигационные колонки */}
          {footerLinks.map(col => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#f5c97a" }}>{col.title}</p>
              <div className="flex flex-col gap-2">
                {col.links.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-xs hover:underline transition-colors"
                    style={{ color: "#c9a882" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Контакты */}
        <div className="border-t pt-6 mb-6" style={{ borderColor: "#2a1a0e" }}>
          <div className="flex flex-wrap gap-4 text-xs">
            <a href="https://t.me/izmailova8888" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#c9a882" }}>
              Telegram: @izmailova8888
            </a>
            <a href="https://t.me/AIMusalab_bot" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#c9a882" }}>
              Бот: @AIMusalab_bot
            </a>
            <a href="https://vk.ru/club235584480" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#c9a882" }}>
              ВКонтакте
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs" style={{ color: "#5a3d2b" }}>
          <p>© 2026 ИП Измайлова Юлия Александровна · Все права защищены</p>
          <p className="mt-1">
            Нажимая «Оставить заявку», вы принимаете условия{" "}
            <Link to="/public-offer" className="hover:underline" style={{ color: "#7a5c44" }}>договора-оферты</Link>
            {" "}и соглашаетесь с{" "}
            <Link to="/privacy-policy" className="hover:underline" style={{ color: "#7a5c44" }}>политикой конфиденциальности</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
