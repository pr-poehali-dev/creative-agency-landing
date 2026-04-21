import { Link } from "react-router-dom";
import CookieBanner from "@/components/CookieBanner";
import NavBar from "@/components/NavBar";
import Icon from "@/components/ui/icon";

const JULIA_IMG = "https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/bucket/344bf7da-4f0c-4b6b-ab42-6cc2b9daded2.jpeg";

const reviews = [
  { text: "Юля не просто написала песню — она прожила нашу историю вместе с нами. Это чувствуется в каждом слове.", author: "Екатерина, Москва" },
  { text: "Профессионализм на высшем уровне. От первого контакта до готовой песни — всё идеально.", author: "Алексей, Казань" },
  { text: "Я заказывала песни у других — но только здесь получила настоящую авторскую работу, а не шаблон.", author: "Марина, Санкт-Петербург" },
];

const team = [
  { icon: "Music2", title: "Юлия Измайлова", role: "Композитор и автор текстов", desc: "Пишет смыслы, создаёт мелодии, работает с каждым клиентом лично." },
  { icon: "Mic", title: "Профессиональные вокалисты", role: "Студийные исполнители", desc: "Записывают живой вокал с душой и эмоциями." },
  { icon: "Sliders", title: "Звукорежиссёры", role: "Сведение и мастеринг", desc: "Студийное качество звука, как у профессиональных артистов." },
  { icon: "Cpu", title: "AI-продюсирование", role: "Современное звучание", desc: "Помогает создать трек, который звучит как хит." },
];

const process = [
  { step: "01", text: "Вы рассказываете историю", sub: "личное интервью с автором" },
  { step: "02", text: "Юлия пишет текст", sub: "авторская работа, смыслы, эмоции" },
  { step: "03", text: "Создаётся музыка", sub: "композиция и аранжировка" },
  { step: "04", text: "AI помогает в продюсировании", sub: "современное звучание, мастеринг" },
  { step: "05", text: "Вы получаете готовую песню", sub: "студийное качество" },
];

export default function ObiNas() {
  return (
    <div style={{ background: "#0d0702", minHeight: "100vh" }}>

      <NavBar />

      {/* ─── HERO ─── */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(180deg, #1a0d04 0%, #0d0702 100%)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-14">

            {/* Текст */}
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <Icon name="Star" size={13} style={{ color: "#f5c97a" }} />
                <span className="text-sm text-white/80">Профессиональный композитор</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                О нас —<br />
                <span style={{ color: "#f5c97a" }}>AI Muse Lab</span>
              </h1>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: "#c9a882" }}>
                AI Muse Lab — это не просто сервис создания песен. Это команда профессионалов, которая превращает ваши истории в музыку, способную тронуть до слёз.
              </p>
              <div className="flex flex-wrap gap-3">
                {["10+ лет опыта", "5 альбомов", "100+ песен", "Студийное качество"].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-sm font-semibold" style={{ background: "rgba(245,201,122,0.12)", color: "#f5c97a", border: "1px solid rgba(245,201,122,0.25)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Фото */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30" style={{ background: "radial-gradient(ellipse, #c2410c 0%, transparent 70%)" }} />
                <img
                  src={JULIA_IMG}
                  alt="Юлия Измайлова — композитор AI Muse Lab"
                  className="relative w-72 md:w-80 rounded-3xl object-cover shadow-2xl"
                  style={{ border: "2px solid rgba(255,255,255,0.15)", aspectRatio: "3/4", objectPosition: "top" }}
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 backdrop-blur-sm" style={{ background: "rgba(20,10,3,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <p className="text-white font-bold text-sm">Юлия Измайлова</p>
                  <p className="text-xs mt-0.5" style={{ color: "#f5c97a" }}>Основательница · Композитор · GALAKTIKA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── О ЮЛИИ ─── */}
      <section className="py-16 px-6" style={{ background: "#110a04" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Юлия Измайлова</h2>
            <p style={{ color: "#c9a882" }}>Основательница и главный композитор</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#f5c97a" }}>Образование и опыт</p>
              <div className="space-y-3">
                {[
                  "Музыкальное образование (композиция и аранжировка)",
                  "Более 10 лет опыта создания авторских песен",
                  "5 выпущенных альбомов под псевдонимом GALAKTIKA",
                  "Более 100 созданных персональных песен для клиентов",
                  "Опыт работы со студиями звукозаписи Санкт-Петербурга",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "#c9a882" }}>
                    <Icon name="Check" size={14} style={{ color: "#f5c97a", marginTop: 2, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#f5c97a" }}>Достижения</p>
              <div className="space-y-3">
                {[
                  "Публикации на Яндекс Музыке, VK Музыке, Spotify",
                  "Профессиональная запись в топовых студиях СПб",
                  "Сотни довольных клиентов по всей России и СНГ",
                  "Экспертиза в создании эмоциональных текстов",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "#c9a882" }}>
                    <Icon name="Music2" size={14} style={{ color: "#f5c97a", marginTop: 2, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7a5c44" }}>Послушать творчество:</p>
                <div className="flex flex-wrap gap-2">
                  <a href="https://music.yandex.com/artist/2948671" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,204,0,0.15)", color: "#ffcc00", border: "1px solid rgba(255,204,0,0.3)" }}>
                    <Icon name="Music" size={12} /> Яндекс Музыка
                  </a>
                  <a href="https://vk.com/music/artist/galaktika_izmaylova" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(0,119,255,0.15)", color: "#5b9cf6", border: "1px solid rgba(0,119,255,0.3)" }}>
                    <Icon name="Music2" size={12} /> VK Музыка
                  </a>
                  <a href="https://vk.ru/club235584480" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.08)", color: "#c9a882", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <Icon name="Users" size={12} /> ВКонтакте
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ФИЛОСОФИЯ ─── */}
      <section className="py-16 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: "#2d2016" }}>Наша философия</h2>
            <p className="text-lg font-semibold" style={{ color: "#5a3d2b" }}>Каждая песня — это не просто набор слов и нот</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: "MessageSquare", text: "Глубинное интервью с вами о вашей истории" },
              { icon: "PenLine", text: "Профессиональная авторская работа композитора" },
              { icon: "Mic", text: "Студийное качество записи" },
              { icon: "Cpu", text: "Помощь AI в создании современного звучания" },
              { icon: "Heart", text: "Эмоции, которые останутся навсегда" },
              { icon: "UserCheck", text: "Личная работа автора с каждым клиентом" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid #e5c9b5" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#fde8d8" }}>
                  <Icon name={item.icon as "Heart"} size={17} style={{ color: "#c2410c" }} />
                </div>
                <p className="text-sm leading-relaxed pt-1" style={{ color: "#5a3d2b" }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-6 text-center" style={{ background: "#fff", border: "1px solid #e5c9b5" }}>
            <p className="text-base leading-relaxed" style={{ color: "#2d2016" }}>
              Мы не генерируем песни автоматически. Каждый трек — результат <strong>личной работы автора</strong>, который вникает в вашу историю и переносит её в музыку.
            </p>
          </div>
        </div>
      </section>

      {/* ─── КАК МЫ ИСПОЛЬЗУЕМ AI ─── */}
      <section className="py-16 px-6" style={{ background: "#110a04" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Как мы используем AI?</h2>
            <p style={{ color: "#c9a882" }}>AI для нас — это инструмент, как гитара или синтезатор. Он не заменяет автора, а усиливает его возможности.</p>
          </div>
          <div className="grid sm:grid-cols-5 gap-3">
            {process.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white mb-3" style={{ background: "#c2410c" }}>{item.step}</div>
                <p className="font-bold text-white text-sm mb-1">{item.text}</p>
                <p className="text-xs" style={{ color: "#7a5c44" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── КОМАНДА ─── */}
      <section className="py-16 px-6" style={{ background: "#0d0702" }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-extrabold text-white text-center mb-10">Наша команда</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <div key={i} className="p-5 rounded-2xl flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(194,65,12,0.2)" }}>
                  <Icon name={member.icon as "Music2"} size={22} style={{ color: "#f5c97a" }} />
                </div>
                <p className="font-bold text-white text-sm mb-0.5">{member.title}</p>
                <p className="text-xs mb-2" style={{ color: "#f5c97a" }}>{member.role}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#7a5c44" }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── КОНТАКТЫ ─── */}
      <section className="py-16 px-6" style={{ background: "#fdf3e7" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-extrabold mb-6" style={{ color: "#2d2016" }}>Где мы находимся?</h2>
              <div className="space-y-3 text-sm" style={{ color: "#5a3d2b" }}>
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" size={16} style={{ color: "#c2410c", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="font-semibold">Санкт-Петербург, Россия</p>
                    <p>Ленинский проспект, 117, корп. 1</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Globe" size={16} style={{ color: "#c2410c", flexShrink: 0 }} />
                  <p>Работаем дистанционно по всей России и СНГ</p>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} style={{ color: "#c2410c", flexShrink: 0 }} />
                  <p>Ответим в течение 15 минут (09:00–21:00 МСК)</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold mb-6" style={{ color: "#2d2016" }}>Свяжитесь с нами</h2>
              <div className="space-y-3">
                <a href="https://t.me/izmailova8888" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:scale-[1.02]" style={{ background: "#fff", border: "1px solid #e5c9b5" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#e8f4fd" }}>
                    <Icon name="Send" size={18} style={{ color: "#229ed9" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#2d2016" }}>@izmailova8888</p>
                    <p className="text-xs" style={{ color: "#7a5c44" }}>Личный контакт Юлии</p>
                  </div>
                </a>
                <a href="https://t.me/AIMusalab_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:scale-[1.02]" style={{ background: "#fff", border: "1px solid #e5c9b5" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#e8f4fd" }}>
                    <Icon name="Bot" size={18} style={{ color: "#229ed9" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#2d2016" }}>@AIMusalab_bot</p>
                    <p className="text-xs" style={{ color: "#7a5c44" }}>Бот для заказа</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ОТЗЫВЫ ─── */}
      <section className="py-16 px-6" style={{ background: "#1a0d04" }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-extrabold text-white text-center mb-10">Почему клиенты выбирают нас?</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {reviews.map((r, i) => (
              <div key={i} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Icon name="Quote" size={24} style={{ color: "#f5c97a", opacity: 0.5, marginBottom: 12 }} />
                <p className="text-sm italic leading-relaxed mb-4" style={{ color: "#e8d5b0" }}>«{r.text}»</p>
                <p className="text-xs font-semibold" style={{ color: "#7a5c44" }}>— {r.author}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://t.me/izmailova8888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ background: "#c2410c" }}
            >
              <Icon name="Music2" size={18} />
              Заказать свою песню
            </a>
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