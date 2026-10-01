import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { usePageMeta } from "@/hooks/usePageMeta";
import AudioPlayer, { Track } from "@/components/AudioPlayer";
import Icon from "@/components/ui/icon";

const TRACKS_URL = "https://functions.poehali.dev/1da8aa11-ec15-4134-82ec-7826c554f737";

export default function Free() {
  usePageMeta({
    title: "Послушай бесплатно 3 реальные песни — AI Muse Lab",
    description:
      "Боишься, что песня не тронет? Послушай прямо здесь — 3 реальные авторские песни по историям людей. Без регистрации.",
    ogUrl: "https://aimuselab.ru/free",
  });

  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetch(TRACKS_URL)
      .then(r => r.json())
      .then(data => setTracks(data.tracks || []))
      .catch(() => {});
  }, []);

  return (
    <>
      <NavBar />

      <main
        className="min-h-screen pt-24 pb-20 px-4"
        style={{ background: "linear-gradient(180deg, #0a0a0b 0%, #0f0f10 100%)" }}
      >
        {/* Заголовок */}
        <section className="max-w-2xl mx-auto text-center mb-12">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 px-0 py-0 border-0"
            style={{
              background: "rgba(196,160,106,0.15)",
              border: "1px solid rgba(196,160,106,0.35)",
              color: "#c4a06a",
            }}
          >
            Слушай прямо здесь · Без регистрации
          </div>

          <h1
            className="text-3xl md:text-5xl font-extrabold leading-tight mb-5"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#f2efe9" }}
          >
            Послушай прежде,{" "}
            <span
              style={{
                background: "#c4a06a",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              чем заказывать
            </span>
          </h1>

          <p className="text-lg leading-relaxed" style={{ color: "rgba(169,166,159,0.8)" }}>
            Боишься, что песня не тронет?{" "}
            <strong style={{ color: "#f2efe9" }}>Нажми — и услышишь сама,</strong>{" "}
            каково это, когда музыка попадает прямо в сердце.
          </p>
        </section>

        {/* Плеер */}
        <section className="max-w-2xl mx-auto mb-10">
          {tracks.length === 0 ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 rounded-none border-2 border-neutral-500 border-t-transparent animate-spin" />
            </div>
          ) : (
            <AudioPlayer tracks={tracks} />
          )}
        </section>

        {/* Социальное доказательство */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-base italic" style={{ color: "rgba(169,166,159,0.6)" }}>
            «Бог меня послал к тебе» — так говорят клиенты.
            <br />
            <span className="font-semibold not-italic" style={{ color: "#c4a06a" }}>
              Более 100 песен создано
            </span>{" "}
            — каждая по живой истории реального человека.
          </p>
        </div>

        {/* CTA */}
        <section className="max-w-xl mx-auto text-center">
          <div
            className="rounded-sm p-8 md:p-10"
            style={{
              background: "rgba(196,160,106,0.08)",
              border: "1px solid rgba(196,160,106,0.25)",
            }}
          >
            <p className="text-xl font-bold mb-2" style={{ color: "#f2efe9", fontFamily: "Montserrat, sans-serif" }}>
              Хочешь такую же?
            </p>
            <p className="text-sm mb-7" style={{ color: "rgba(169,166,159,0.7)" }}>
              Напиши Юлии — расскажи историю, и она создаст твою песню за 2–3 дня
            </p>

            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-white text-base transition-all hover:opacity-90"
              style={{
                background: "#c4a06a",
                boxShadow: "none",
              }}
            >
              <Icon name="Send" size={18} />
              Написать в Telegram
            </a>

            <p className="mt-4 text-sm" style={{ color: "rgba(169,166,159,0.5)" }}>
              или на почту:{" "}
              <a
                href="mailto:aimuselab@yandex.ru"
                className="underline"
                style={{ color: "rgba(169,166,159,0.75)" }}
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
