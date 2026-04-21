import { Link } from "react-router-dom";
import CookieBanner from "@/components/CookieBanner";
import NavBar from "@/components/NavBar";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { usePageMeta } from "@/hooks/usePageMeta";
import Icon from "@/components/ui/icon";

const reviews = [
  {
    emoji: "😭",
    name: "Евгения Левченко",
    city: "Братск",
    occasion: "Песня мужу на юбилей",
    text: "У мужа никогда не текли слёзы от подарков, а тут сидел и слушал минуты три молча, потом сказал: «Это лучшее, что мне дарили».\n\nЯ дарила ему всякое — и дорогое, и очень дорогое. Но таких эмоций у него еще ни разу не видела! От начала и до конца песни — полное удивление и недоумение.\n\nПростите меня, что до последнего в вас сомневалась. Пишу и руки трясутся от счастья. Отдельное спасибо Юлии — без её прекрасного таланта эмоции были бы не те. Слушаем уже второй месяц песню и каждый раз голова кругом от эмоций! Вы нереальные ребята :)",
    stars: 5,
  },
  {
    emoji: "🎉",
    name: "Алексей Власов",
    city: "Воронеж",
    occasion: "Песня на свадьбу друзьям",
    text: "Заказывали песню на свадьбу друзьям. Весь зал плакал и подпевал. Мы были королями вечера! Всё сделали чётко и в срок. Приятный персонал, сервис продуман вплоть до мелочей. Работать с менеджером было одно удовольствие, что очень важно.",
    stars: 5,
  },
  {
    emoji: "✨",
    name: "Марина",
    city: "Санкт-Петербург",
    occasion: "Песня на годовщину свадьбы",
    text: "Боялась, что получится что-то формальное, шаблонное. Но когда услышала — мурашки по коже.\n\nЭто НАША история, наши слова. Юлия как будто заглянула в душу и вытащила оттуда всё, что я не могла выразить сама. Буду заказывать снова!",
    stars: 5,
  },
  {
    emoji: "💖",
    name: "Наталья Демидова",
    city: "Красноярск",
    occasion: "Песня в подарок маме",
    text: "Огромное спасибо за работу!! Смотрю и не верю своим глазам и ушам) Вы такие молодцы, что нет слов!\n\nВы даже не представляете какие эмоции были у моей мамы — это очень сложно описать словами… 100% попадание в самое сердце!\n\nВсё, что я хотела, но не могла выразить словами — вы взяли и воплотили в реальность, ещё и в виде песни. Спасибо вам! Вы самые лучшие!!!",
    stars: 5,
  },
  {
    emoji: "🎊",
    name: "Ольга Смирнова",
    city: "Самара",
    occasion: "Песня мужу на день рождения",
    text: "Это лучший подарок на день рождения, который только можно было придумать!\n\nЯ дарила уже всё что можно моему мужу, и удивить его сложно. Но на этот раз даже он сказал, что это удалось на все 100.\n\nНаши дети теперь ходят по дому и просят включить песню про нашу семью)) Миллион спасибо вашей команде!!!",
    stars: 5,
  },
  {
    emoji: "💍",
    name: "Ирина Шилько",
    city: "Сочи",
    occasion: "Песня жениху на свадьбу",
    text: "Мне понравилось абсолютно всё!! И всем гостям на свадьбе, а самое главное — моему теперь уже мужу.\n\nДолго выбирала подарок и наткнулась на ваш сайт — идеальное решение! Приятный персонал, сервис продуман вплоть до мелочей.\n\nПолучилось здорово, идеально, нежно, спокойно и ничего лишнего!!! Миллион вам спасибо!",
    stars: 5,
  },
  {
    emoji: "😢",
    name: "Наталья Ткаченко",
    city: "Москва",
    occasion: "Песня любимому мужчине",
    text: "Первый раз в жизни я не могу выразить свои эмоции. Ребят, то что вы творите — это вышка.\n\nЯ несколько дней подряд втихаря по несколько раз в день пересматриваю наше видео и слушаю нашу песню — и просто заливаюсь крокодильими слезами!\n\nСамое лучшее — дарить эмоции! Никакие вещи не сравнятся с искренней улыбкой и слезами счастья. Я убедилась в этом благодаря вам. Спасибо огромное!",
    stars: 5,
  },
  {
    emoji: "🎵",
    name: "Светлана Кудрявцева",
    city: "Москва",
    occasion: "Песня мужу на годовщину",
    text: "Ребята!!! То что вы сделали — не описать словами!\n\nТакие эмоции вы подарили мне с любимым, что по сей день от воспоминаний того дня, когда я подарила её — мурашки по коже))\n\nЯ до сих пор не могу поверить, что теперь у нас есть НАША СОБСТВЕННАЯ песня! Мы знаем её каждое слово и каждую нотку наизусть!))",
    stars: 5,
  },
];

const stats = [
  { icon: "Users", value: "100+", label: "довольных клиентов" },
  { icon: "Star", value: "5.0", label: "средний рейтинг из 5.0" },
  { icon: "Heart", value: "98%", label: "рекомендуют друзьям" },
  { icon: "Smile", value: "100%", label: "получатели плакали от счастья" },
];

export default function Otzyvy() {
  useBreadcrumb([
    { name: "Главная", item: "https://aimuselab.ru/" },
    { name: "Отзывы", item: "https://aimuselab.ru/otzyvy" },
  ]);
  usePageMeta({
    title: "Отзывы Клиентов AI Muse Lab | Реальные Истории и Эмоции",
    description: "Читайте реальные отзывы наших клиентов. Более 100 счастливых людей заказали персональную песню в подарок. Узнайте, что они говорят о нас!",
  });

  return (
    <div style={{ background: "#0d0702", minHeight: "100vh" }}>

      <NavBar />

      {/* ─── HERO ─── */}
      <section className="py-16 px-6 text-center" style={{ background: "linear-gradient(180deg, #1a0d04 0%, #0d0702 100%)" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <Icon name="Star" size={14} style={{ color: "#f5c97a" }} />
            <span className="text-sm text-white/80">Реальные истории и эмоции</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Отзывы наших<br />
            <span style={{ color: "#f5c97a" }}>клиентов</span>
          </h1>
          <p className="text-lg" style={{ color: "#c9a882" }}>
            Более <strong className="text-white">100 созданных песен.</strong> Сотни счастливых людей.
          </p>
        </div>
      </section>

      {/* ─── СТАТИСТИКА ─── */}
      <section className="py-10 px-6" style={{ background: "#110a04" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(194,65,12,0.2)" }}>
                  <Icon name={s.icon as "Star"} size={20} style={{ color: "#f5c97a" }} />
                </div>
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs mt-1" style={{ color: "#7a5c44" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ОТЗЫВЫ ─── */}
      <section className="py-16 px-6" style={{ background: "#0d0702" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="flex flex-col p-6 rounded-2xl"
                style={{ background: "#1a0d04", border: "1px solid #2a1a0e" }}
              >
                {/* Шапка */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-3xl flex-shrink-0">{r.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm">{r.name}</p>
                    <p className="text-xs" style={{ color: "#7a5c44" }}>{r.city}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: r.stars }).map((_, si) => (
                        <Icon key={si} name="Star" size={12} style={{ color: "#f5c97a" }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Повод */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 self-start" style={{ background: "rgba(194,65,12,0.15)", border: "1px solid rgba(194,65,12,0.25)" }}>
                  <Icon name="Music2" size={11} style={{ color: "#f5c97a" }} />
                  <span className="text-xs font-semibold" style={{ color: "#f5c97a" }}>{r.occasion}</span>
                </div>

                {/* Текст отзыва */}
                <div className="flex-1">
                  <Icon name="Quote" size={20} style={{ color: "#f5c97a", opacity: 0.4, marginBottom: 8 }} />
                  <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#c9a882" }}>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ГДЕ ЕЩЁ ЧИТАТЬ ─── */}
      <section className="py-12 px-6" style={{ background: "#110a04" }}>
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-extrabold text-white mb-6">Где ещё можно почитать отзывы?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://vk.ru/club235584480"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-105"
              style={{ background: "rgba(0,119,255,0.15)", color: "#5b9cf6", border: "1px solid rgba(0,119,255,0.3)" }}
            >
              <Icon name="Users" size={15} />
              ВКонтакте
            </a>
            <a
              href="https://t.me/AIMusalab_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-105"
              style={{ background: "rgba(41,182,246,0.15)", color: "#29b6f6", border: "1px solid rgba(41,182,246,0.3)" }}
            >
              <Icon name="Bot" size={15} />
              Telegram-бот
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-6 text-center" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#2d2016" }}>
            Хотите стать следующим счастливым клиентом?
          </h2>
          <p className="text-base mb-8" style={{ color: "#5a3d2b" }}>
            Расскажите историю — и через 2–3 дня у вас будет персональная песня, которую будут переслушивать годами.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ background: "#c2410c" }}
            >
              <Icon name="Send" size={17} />
              Написать в Telegram
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold transition-transform hover:scale-105"
              style={{ background: "#2d2016", color: "#f5c97a" }}
            >
              <Icon name="Music2" size={17} />
              Заказать песню
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-6 border-t" style={{ background: "#0d0702", borderColor: "#2a1a0e" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 mb-6 text-xs" style={{ color: "#7a5c44" }}>
            <div>
              <p className="font-semibold mb-1" style={{ color: "#c9a882" }}>ИП Измайлова Юлия Александровна</p>
              <p>ИНН: 665895132301</p>
              <p>198207, г. Санкт-Петербург, пр-кт Ленинский, д 117, корп 1, кв 234</p>
              <p>Без НДС (УСН)</p>
            </div>
            <div className="flex flex-col gap-2 text-xs md:text-right">
              <Link to="/public-offer" className="hover:underline" style={{ color: "#c9a882" }}>Договор-оферта</Link>
              <Link to="/privacy-policy" className="hover:underline" style={{ color: "#c9a882" }}>Политика конфиденциальности</Link>
              <a href="https://t.me/izmailova8888" className="hover:underline" style={{ color: "#c9a882" }}>Telegram: @izmailova8888</a>
            </div>
          </div>
          <div className="border-t pt-4 text-center text-xs" style={{ borderColor: "#2a1a0e", color: "#7a5c44" }}>
            <p>© 2026 ИП Измайлова Юлия Александровна · Все права защищены</p>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}