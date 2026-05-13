import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { usePageMeta } from "@/hooks/usePageMeta";
import AudioPlayer, { Track } from "@/components/AudioPlayer";
import Icon from "@/components/ui/icon";

const tracks: Track[] = [
  {
    id: "lichnyj-geroj",
    title: "Личный герой",
    occasion: "для любимого человека",
    emoji: "❤️",
    publicKey: "https://disk.yandex.ru/d/wfEcIXNjUkFpuA",
  },
  {
    id: "zryachee-serdce",
    title: "Зрячее сердце",
    occasion: "для бабушки",
    emoji: "🌸",
    publicKey: "https://disk.yandex.ru/d/ma-Q1rEWWSh4WQ",
  },
  {
    id: "kajfuyu-s-yanoj",
    title: "Кайфую с Яной",
    occasion: "для подруги на день рождения",
    emoji: "🎉",
    publicKey: "https://disk.yandex.ru/d/Qt-vD587OVtjOQ",
  },
];

export default function Free() {
  usePageMeta({
    title: "Послушай бесплатно 3 реальные песни — AI Muse Lab",
    description:
      "Боишься, что песня не тронет? Послушай прямо здесь — 3 реальные авторские песни по историям людей. Без регистрации.",
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
        <section className="max-w-2xl mx-auto text-center mb-12">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(168,85,247,0.15)",
              border: "1px solid rgba(168,85,247,0.35)",
              color: "#C084FC",
            }}
          >
            Слушай прямо здесь · Без регистрации
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
          </h1>

          <p className="text-lg leading-relaxed" style={{ color: "rgba(196,181,253,0.8)" }}>
            Боишься, что песня не тронет?{" "}
            <strong style={{ color: "#f6f1ff" }}>Нажми — и услышишь сама,</strong>{" "}
            каково это, когда музыка попадает прямо в сердце.
          </p>
        </section>

        {/* Плеер */}
        <section className="max-w-2xl mx-auto mb-10">
          <AudioPlayer tracks={tracks} />
        </section>

        {/* Социальное доказательство */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-base italic" style={{ color: "rgba(196,181,253,0.6)" }}>
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