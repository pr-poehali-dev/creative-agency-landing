import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_accepted", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] px-4 py-4 md:px-8"
      style={{ background: "#1a0f07", borderTop: "1px solid #2a1a0e" }}
    >
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center gap-4 justify-between">
        <p className="text-xs leading-relaxed" style={{ color: "#c9a882" }}>
          Мы используем файлы cookie для корректной работы сайта. Продолжая пользоваться сайтом, вы
          соглашаетесь с нашей{" "}
          <Link to="/privacy-policy" className="underline hover:opacity-80" style={{ color: "#c2410c" }}>
            Политикой конфиденциальности
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-6 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "#c2410c" }}
        >
          Принять
        </button>
      </div>
    </div>
  );
}
