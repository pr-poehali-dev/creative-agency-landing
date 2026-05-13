import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { usePageMeta } from "@/hooks/usePageMeta";
import Icon from "@/components/ui/icon";

const tracks = [
  {
    title: "Личный герой",
    occasion: "для любимого человека",
    emoji: "❤️",
    url: "https://disk.yandex.ru/d/Qt-vD587OVtjOQ",
    color: "rgba(236,72,153,0.15)",
    border: "rgba(236,72,153,0.35)",
    desc: "Мужчина, который всегда рядом. Песня о надёжности, любви и благодарности.",
  },
  {
    title: "Зрячее сердце",
    occasion: "для бабушки",
    emoji: "🌸",
    url: "https://disk.yandex.ru/d/ma-Q1rEWWSh4WQ",
    color: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.35)",
    desc: "Тепло, мудрость и любовь через поколения. Слушают — и плачут.",
  },
  {
    title: "Кайфую с Яной",
    occasion: "для подруги на день рождения",
    emoji: "🎉",
    url: "https://disk.yandex.ru/d/Qt-vD587OVtjOQ",
    color: "rgba(45,212,191,0.12)",
    border: "rgba(45,212,191,0.35)",
    desc: "Весёлая, искренняя, настоящая. Именно такой и должна быть дружеская песня.",
  },
];

export default function Free() {
  usePageMeta({
    title: "Послушай бесплатно 3 реальные песни — AI Muse Lab",
    description:
      "Боишься, что песня не тронет? Послушай сама — и пойми, каково это, когда музыка попадает прямо в сердце. 3 реальные авторские песни по историям людей.",
    ogUrl: "https://aimuselab.ru/free",
  });

  return (
    <>
      <NavBar />

      <main
        className="min-h-screen pt-24 pb-20 px-4"
        style={{ background: "linear-gradient(180deg, #0e0b1a 0%, #130d22 100%)" }}
      >
        {/* Заголовок */}
        <section className="max-w-2xl mx-auto text-center mb-14">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(168,85,247,0.15)",
              border: "1px solid rgba(168,85,247,0.35)",
              color: "#C084FC",
            }}
          >
            Бесплатно · Без регистрации
          </div>

          <h1
            className="text-3xl md:text-5xl font-extrabold leading-tight mb-5"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#f6f1ff" }}
          >
            Послушай прежде,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              чем заказывать
            </span>
            {" "}—{" "}
            <br className="hidden md:block" />3 реальные песни по историям людей
          </h1>

          <p className="text-lg leading-relaxed" style={{ color: "rgba(196,181,253,0.8)" }}>
            Боишься, что песня не тронет?{" "}
            <strong style={{ color: "#f6f1ff" }}>Послушай сама</strong> — и пойми,
            каково это, когда музыка попадает прямо в сердце.
          </p>
        </section>

        {/* Карточки треков */}
        <section className="max-w-3xl mx-auto grid gap-6 mb-14">
          {tracks.map((track, i) => (
            <a
              key={i}
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: track.color,
                border: `1px solid ${track.border}`,
                textDecoration: "none",
              }}
            >
              {/* Номер + эмодзи */}
              <div
                className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold"
                style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${track.border}` }}
              >
                {track.emoji}
              </div>

              {/* Текст */}
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(196,181,253,0.6)" }}>
                  {track.occasion}
                </div>
                <div className="text-lg font-bold mb-1" style={{ color: "#f6f1ff", fontFamily: "Montserrat, sans-serif" }}>
                  «{track.title}»
                </div>
                <div className="text-sm" style={{ color: "rgba(196,181,253,0.7)" }}>
                  {track.desc}
                </div>
              </div>

              {/* Стрелка */}
              <div
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <Icon name="Play" size={18} style={{ color: "#f6f1ff" }} />
              </div>
            </a>
          ))}
        </section>

        {/* Социальное доказательство */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-base italic" style={{ color: "rgba(196,181,253,0.65)" }}>
            «Бог меня послал к тебе» — так говорят клиенты.
            <br />
            <span className="font-semibold not-italic" style={{ color: "#C084FC" }}>
              Более 100 песен создано
            </span>{" "}
            — каждая по живой истории реального человека.
          </p>
        </div>

        {/* CTA */}
        <section className="max-w-xl mx-auto text-center">
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
          >
            <p className="text-xl font-bold mb-2" style={{ color: "#f6f1ff", fontFamily: "Montserrat, sans-serif" }}>
              Хочешь такую же?
            </p>
            <p className="text-sm mb-7" style={{ color: "rgba(196,181,253,0.7)" }}>
              Напиши Юлии — расскажи историю, и она создаст твою песню за 2–3 дня
            </p>

            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                boxShadow: "0 0 24px rgba(168,85,247,0.4)",
              }}
            >
              <Icon name="Send" size={18} />
              Написать в Telegram
            </a>

            <p className="mt-4 text-sm" style={{ color: "rgba(196,181,253,0.5)" }}>
              или на почту:{" "}
              <a
                href="mailto:aimuselab@yandex.ru"
                className="underline"
                style={{ color: "rgba(196,181,253,0.75)" }}
              >
                aimuselab@yandex.ru
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
