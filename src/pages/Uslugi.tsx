import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function Uslugi() {
  return (
    <div className="min-h-screen font-sans" style={{ background: "#faf7f4", color: "#2d2016" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'); body { font-family: 'Montserrat', sans-serif; }`}</style>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b" style={{ background: "rgba(250,247,244,0.92)", borderColor: "#e8d5b7" }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="ArrowLeft" size={18} style={{ color: "#c2410c" }} />
            <span className="font-bold text-base" style={{ color: "#2d2016" }}>Назад</span>
          </Link>
          <span className="font-extrabold text-lg" style={{ color: "#2d2016" }}>AI MUSELAB</span>
          <a
            href="https://t.me/izmailova8888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm text-white"
            style={{ background: "#c2410c" }}
          >
            <Icon name="Send" size={14} />
            Telegram
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6" style={{ background: "#2d2016" }}>
        <div className="container mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-6" style={{ background: "rgba(245,201,122,0.15)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.3)" }}>
            Прочие услуги
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Видеоконтент для клипов
          </h1>
          <p className="text-lg" style={{ color: "#c9a882" }}>
            Профессиональные музыкальные клипы, лирик-видео и визуальный контент — от идеи до финального монтажа
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "Video",
                title: "Музыкальный клип",
                desc: "Полноценный видеоклип под вашу песню. Сценарий, съёмка, монтаж, цветокоррекция — под ключ.",
                tag: "Популярно",
              },
              {
                icon: "FileText",
                title: "Лирик-видео",
                desc: "Стильное видео с текстом песни. Идеально для публикации в YouTube и социальных сетях.",
                tag: "",
              },
              {
                icon: "Sparkles",
                title: "Визуализация с AI",
                desc: "Генеративные визуальные образы под музыку с использованием нейросетей. Уникальная эстетика.",
                tag: "Новинка",
              },
            ].map((s, i) => (
              <Card key={i} className="p-7 border-0 shadow-md relative" style={{ background: "#fff" }}>
                {s.tag && (
                  <span className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#fde8d8", color: "#c2410c" }}>{s.tag}</span>
                )}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "#fde8d8" }}>
                  <Icon name={s.icon as "Video"} size={24} style={{ color: "#c2410c" }} />
                </div>
                <h3 className="font-extrabold text-xl mb-3" style={{ color: "#2d2016" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a5c44" }}>{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold text-center mb-14" style={{ color: "#2d2016" }}>Как это работает</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Обсуждаем идею", desc: "Вы описываете задачу, стиль и настроение. Мы предлагаем концепцию." },
              { num: "02", title: "Создаём сценарий", desc: "Прорабатываем визуальный ряд, раскадровку и план съёмки." },
              { num: "03", title: "Производство", desc: "Съёмка или генерация визуала, монтаж, звук, цветокоррекция." },
              { num: "04", title: "Готовый файл", desc: "Получаете финальный видеофайл в нужном формате и разрешении." },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black mb-3" style={{ color: "#e8d5b7" }}>{step.num}</div>
                <h3 className="font-extrabold mb-2" style={{ color: "#2d2016" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a5c44" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#2d2016" }}>
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Обсудим ваш проект?</h2>
          <p className="mb-8" style={{ color: "#c9a882" }}>Стоимость и сроки — индивидуально. Напишите — ответим в течение 15 минут.</p>
          <a
            href="https://t.me/izmailova8888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-white text-lg transition-transform hover:scale-105"
            style={{ background: "#c2410c" }}
          >
            <Icon name="Send" size={20} />
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