import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { usePageMeta } from "@/hooks/usePageMeta";
import Icon from "@/components/ui/icon";

const gifts = [
  { rank: 10, title: "Ювелирные украшения", price: "от 10 000 ₽", originality: 3, emotions: 5, memory: 6, desc: "Кольцо, серьги, браслет — традиционный выбор. Красиво, дорого, но предсказуемо. Через месяц украшение окажется в шкатулке рядом с десятком других.", tip: "Когда подходит: если вы точно знаете вкус и мечту партнёра." },
  { rank: 9, title: "Романтический ужин в ресторане", price: "от 5 000 ₽", originality: 4, emotions: 6, memory: 3, desc: "Приятно, вкусно, романтично. Но ресторанов партнёр видел много. Через неделю воспоминание растворится.", tip: "Когда подходит: как дополнение к основному подарку." },
  { rank: 8, title: "Фотосессия или фотокнига", price: "от 8 000 ₽", originality: 6, emotions: 7, memory: 8, desc: "Красивые фото вашей пары — это память. Фотокнига с вашей историей может стать семейной реликвией.", tip: "Плюс: визуальная память остаётся навсегда. Минус: требует времени на организацию." },
  { rank: 7, title: "Путешествие вдвоём", price: "от 50 000 ₽", originality: 7, emotions: 9, memory: 9, desc: "Совместное путешествие — отличный способ освежить отношения и создать новые воспоминания.", tip: "Плюс: время вдвоём, новые впечатления. Минус: дорого, требует планирования." },
  { rank: 6, title: "Именная звезда на небе", price: "от 3 000 ₽", originality: 7, emotions: 6, memory: 5, desc: "Романтично! Ваша звезда на небе с сертификатом. Юридически не имеет силы, но символизм красивый.", tip: "Когда подходит: для романтиков и мечтателей." },
  { rank: 5, title: "Видео-поздравление от знаменитости", price: "от 5 000 ₽", originality: 7, emotions: 7, memory: 6, desc: "Любимый актёр или музыкант поздравляет вашу пару — это неожиданно и весело!", tip: "Плюс: оригинально, можно пересматривать. Минус: не очень личное." },
  { rank: 4, title: "Картина / портрет по фото", price: "от 8 000 ₽", originality: 8, emotions: 7, memory: 8, desc: "Художник рисует ваш портрет — это красиво и личное. Будет висеть на стене и напоминать о любви.", tip: "Плюс: уникально, эстетично. Минус: не у всех есть место для картин." },
  { rank: 3, title: "Видеоклип из ваших фото и видео", price: "от 10 000 ₽", originality: 8, emotions: 8, memory: 9, desc: "Профессионально смонтированный клип с вашей историей любви под красивую музыку.", tip: "Плюс: эмоционально, можно показывать друзьям. Минус: требует хорошего материала." },
  { rank: 2, title: "Книга «Наша история любви»", price: "от 7 000 ₽", originality: 9, emotions: 9, memory: 10, desc: "Вы сами пишете книгу о вашей паре: как познакомились, первое свидание, смешные истории, клятвы.", tip: "Плюс: очень личное, трогательное. Минус: требует времени и писательского таланта." },
];

const tableData = [
  { gift: "Ювелирка", price: "от 10 000 ₽", o: 3, e: 5, m: 6 },
  { gift: "Ужин в ресторане", price: "от 5 000 ₽", o: 4, e: 6, m: 3 },
  { gift: "Фотокнига", price: "от 8 000 ₽", o: 6, e: 7, m: 8 },
  { gift: "Путешествие", price: "от 50 000 ₽", o: 7, e: 9, m: 9 },
  { gift: "Именная звезда", price: "от 3 000 ₽", o: 7, e: 6, m: 5 },
  { gift: "Видео от знаменитости", price: "от 5 000 ₽", o: 7, e: 7, m: 6 },
  { gift: "Портрет по фото", price: "от 8 000 ₽", o: 8, e: 7, m: 8 },
  { gift: "Видеоклип", price: "от 10 000 ₽", o: 8, e: 8, m: 9 },
  { gift: "Книга о вас", price: "от 7 000 ₽", o: 9, e: 9, m: 10 },
  { gift: "Персональная песня", price: "от 5 000 ₽", o: 10, e: 10, m: 10, highlight: true },
];

function ScoreDots({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full" style={{ background: i < value ? "#f5c97a" : "#2a1a0e" }} />
      ))}
    </div>
  );
}

export default function BlogArticle1() {
  useBreadcrumb([
    { name: "Главная", item: "https://aimuselab.ru/" },
    { name: "Блог", item: "https://aimuselab.ru/blog" },
    { name: "Топ-10 идей подарков на годовщину", item: "https://aimuselab.ru/blog/top-10-idej-podarkov-na-godovshchinu" },
  ]);
  usePageMeta({
    title: "Топ-10 Идей Подарков на Годовщину Свадьбы | Что Подарить Любимому",
    description: "Ищете оригинальный подарок на годовщину свадьбы? 10 лучших идей + персональная песня как самый трогательный сюрприз. Гарантируем слёзы радости!",
    ogUrl: "https://aimuselab.ru/blog/top-10-idej-podarkov-na-godovshchinu",
  });

  return (
    <div style={{ background: "#0d0702", minHeight: "100vh" }}>
      <NavBar />

      {/* ─── HERO ─── */}
      <section className="py-14 px-6" style={{ background: "linear-gradient(180deg, #1a0d04 0%, #0d0702 100%)" }}>
        <div className="container mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-70" style={{ color: "#c9a882" }}>
            <Icon name="ArrowLeft" size={14} /> Назад в блог
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(194,65,12,0.2)", color: "#f5c97a" }}>Идеи подарков</span>
            <span className="text-xs" style={{ color: "#7a5c44" }}>22 апреля 2026 · 7 мин чтения</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
            Топ-10 идей подарков на годовщину свадьбы: от классики до эмоционального прорыва
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#c9a882" }}>
            Годовщина свадьбы — это не просто дата в календаре. Это праздник вашей любви, которая прошла испытание временем. И подарок должен быть соответствующим — незабываемым.
          </p>
        </div>
      </section>

      {/* ─── КОНТЕНТ ─── */}
      <section className="py-10 px-6">
        <div className="container mx-auto max-w-3xl">

          {/* Места 10-2 */}
          <div className="space-y-6 mb-12">
            {gifts.map(gift => (
              <div key={gift.rank} className="rounded-2xl p-6" style={{ background: "#1a0d04", border: "1px solid #2a1a0e" }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-sm" style={{ background: "#2a1a0e", color: "#f5c97a" }}>
                    #{gift.rank}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-extrabold text-white mb-1">{gift.title}</h2>
                    <p className="text-xs font-semibold mb-3" style={{ color: "#c2410c" }}>{gift.price}</p>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "#c9a882" }}>{gift.desc}</p>
                    <p className="text-xs italic" style={{ color: "#7a5c44" }}>{gift.tip}</p>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {[
                        { label: "Оригинальность", val: gift.originality },
                        { label: "Эмоции", val: gift.emotions },
                        { label: "Память", val: gift.memory },
                      ].map(s => (
                        <div key={s.label}>
                          <p className="text-xs mb-1" style={{ color: "#7a5c44" }}>{s.label}: {s.val}/10</p>
                          <ScoreDots value={s.val} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* №1 — Персональная песня */}
          <div className="rounded-2xl p-8 mb-12" style={{ background: "rgba(194,65,12,0.1)", border: "2px solid #c2410c" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold" style={{ background: "#c2410c", color: "#fff" }}>
                #1
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white">Персональная авторская песня о вашей любви 🎵</h2>
                <p className="text-sm font-semibold" style={{ color: "#f5c97a" }}>от 5 000 ₽ · Оригинальность, Эмоции, Память: 10/10</p>
              </div>
            </div>

            <p className="text-base leading-relaxed mb-5" style={{ color: "#c9a882" }}>
              Представьте: звучит музыка, и в тексте — ваша история. Как вы познакомились. Первое «я люблю тебя». Как пережили трудности. Ваши мечты о будущем.
            </p>
            <p className="text-lg font-bold text-white mb-5">Это не просто подарок. Это ваша история, превращённая в искусство.</p>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                "Уникальность: в мире больше нет такой песни",
                "100% клиентов говорят, что партнёр плакал от счастья",
                "Песню можно слушать годами — она не пылится на полке",
                "Каждое слово о вас — это признание в любви",
                "Подходит и для 1 года свадьбы, и для 25 лет",
                "Готово за 2–3 дня от 5 000 ₽",
              ].map(item => (
                <div key={item} className="flex items-start gap-2 text-sm" style={{ color: "#c9a882" }}>
                  <Icon name="Check" size={14} style={{ color: "#f5c97a", marginTop: 2, flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(245,201,122,0.07)", border: "1px solid rgba(245,201,122,0.2)" }}>
              <Icon name="Quote" size={18} style={{ color: "#f5c97a", opacity: 0.5, marginBottom: 8 }} />
              <p className="text-sm italic leading-relaxed" style={{ color: "#e8d5b0" }}>
                «Боялась, что получится что-то формальное. Но когда услышала — мурашки по коже. Это НАША история, наши слова. Муж слушал и не мог поверить. Лучший подарок за всю нашу совместную жизнь!»
              </p>
              <p className="text-xs mt-2 font-semibold" style={{ color: "#7a5c44" }}>— Марина, Санкт-Петербург</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://t.me/izmailova8888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white transition-transform hover:scale-105"
                style={{ background: "#c2410c" }}
              >
                <Icon name="Send" size={16} />
                Заказать песню на годовщину
              </a>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold transition-transform hover:scale-105"
                style={{ background: "rgba(255,255,255,0.07)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.3)" }}
              >
                <Icon name="Play" size={16} />
                Послушать примеры
              </Link>
            </div>
          </div>

          {/* Таблица сравнения */}
          <div className="mb-12">
            <h2 className="text-2xl font-extrabold text-white mb-5">Итоговая таблица сравнения</h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #2a1a0e" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#110a04" }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#7a5c44" }}>Подарок</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell" style={{ color: "#7a5c44" }}>Цена</th>
                    <th className="text-center px-3 py-3 font-semibold" style={{ color: "#7a5c44" }}>Ориг.</th>
                    <th className="text-center px-3 py-3 font-semibold" style={{ color: "#7a5c44" }}>Эмоц.</th>
                    <th className="text-center px-3 py-3 font-semibold" style={{ color: "#7a5c44" }}>Память</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i} style={{ background: row.highlight ? "rgba(194,65,12,0.12)" : i % 2 === 0 ? "#1a0d04" : "#0d0702", borderTop: "1px solid #2a1a0e" }}>
                      <td className="px-4 py-3 font-semibold" style={{ color: row.highlight ? "#fff" : "#c9a882" }}>{row.gift}</td>
                      <td className="px-4 py-3 hidden sm:table-cell" style={{ color: "#7a5c44" }}>{row.price}</td>
                      <td className="px-3 py-3 text-center font-bold" style={{ color: row.o === 10 ? "#f5c97a" : "#c9a882" }}>{row.o}/10</td>
                      <td className="px-3 py-3 text-center font-bold" style={{ color: row.e === 10 ? "#f5c97a" : "#c9a882" }}>{row.e}/10</td>
                      <td className="px-3 py-3 text-center font-bold" style={{ color: row.m === 10 ? "#f5c97a" : "#c9a882" }}>{row.m}/10</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Заключение */}
          <div className="rounded-2xl p-6 mb-8" style={{ background: "#1a0d04", border: "1px solid #2a1a0e" }}>
            <h2 className="text-xl font-extrabold text-white mb-3">Заключение</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#c9a882" }}>
              Годовщина свадьбы — это праздник вашей любви. И подарок должен отражать глубину ваших чувств. Можно купить очередную вещь. А можно подарить эмоцию, которую партнёр запомнит на всю жизнь.
            </p>
            <p className="text-sm font-semibold text-white">
              Персональная песня о вашей любви — это не просто подарок. Это ваша история, превращённая в искусство.
            </p>
          </div>

          <div className="rounded-xl p-4 text-sm" style={{ background: "rgba(245,201,122,0.07)", border: "1px solid rgba(245,201,122,0.15)", color: "#c9a882" }}>
            <strong style={{ color: "#f5c97a" }}>P.S.</strong> Перед праздниками слоты быстро заканчиваются. Мы берём не более 5 заказов в неделю, чтобы каждому уделить максимум внимания. Забронируйте место заранее!
          </div>
        </div>
      </section>

      {/* ─── RELATED ─── */}
      <section className="py-10 px-6" style={{ background: "#110a04" }}>
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-lg font-extrabold text-white mb-5">Читайте также</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { to: "/blog/chto-podarit-mame-na-yubilej", title: "Что подарить маме на юбилей: 15 душевных идей" },
              { to: "/blog/pesnya-na-zakaz-vs-obychnyj-podarok", title: "Песня на заказ vs обычный подарок: что вызывает больше эмоций?" },
            ].map(link => (
              <Link key={link.to} to={link.to} className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]" style={{ background: "#1a0d04", border: "1px solid #2a1a0e" }}>
                <Icon name="ArrowRight" size={14} style={{ color: "#f5c97a", flexShrink: 0 }} />
                <span className="text-sm font-semibold" style={{ color: "#c9a882" }}>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
