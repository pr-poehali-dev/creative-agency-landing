import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ background: "#1a0f07", color: "#e8d5c0" }}>
      <div className="container mx-auto max-w-3xl px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-10 text-sm hover:underline"
          style={{ color: "#c9a882" }}
        >
          <Icon name="ArrowLeft" size={16} />
          Вернуться на главную
        </Link>

        <h1 className="text-3xl font-extrabold mb-2 text-white">Политика конфиденциальности</h1>
        <p className="text-sm mb-10" style={{ color: "#7a5c44" }}>
          Дата последнего обновления: 20 апреля 2026 г.
        </p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: "#c9a882" }}>
          <section>
            <h2 className="text-lg font-bold mb-3 text-white">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») регулирует порядок обработки персональных
              данных пользователей сайта, расположенного в сети Интернет (далее — «Сайт»), и применяется ко всем
              сведениям, которые ИП Измайлова Юлия Александровна (ИНН 665895132301) может получить о пользователе
              в процессе использования им Сайта и/или при обращении за услугами.
            </p>
            <p className="mt-2">
              Использование Сайта означает безоговорочное согласие пользователя с настоящей Политикой и указанными
              в ней условиями обработки его персональных данных. В случае несогласия с этими условиями пользователь
              должен воздержаться от использования Сайта.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 text-white">2. Оператор персональных данных</h2>
            <p>
              Оператором персональных данных является:
            </p>
            <ul className="mt-2 space-y-1 list-none">
              <li><span className="text-white font-semibold">Наименование:</span> ИП Измайлова Юлия Александровна</li>
              <li><span className="text-white font-semibold">ИНН:</span> 665895132301</li>
              <li>
                <span className="text-white font-semibold">Адрес:</span> 198207, Россия, г. Санкт-Петербург,
                пр-кт Ленинский, д 117, корп 1, кв 234
              </li>
              <li><span className="text-white font-semibold">Telegram:</span>{" "}
                <a href="https://t.me/izmailova8888" className="hover:underline" style={{ color: "#c2410c" }}>
                  @izmailova8888
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 text-white">3. Состав обрабатываемых персональных данных</h2>
            <p>Оператор может обрабатывать следующие персональные данные пользователей:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Имя и фамилия;</li>
              <li>Номер телефона;</li>
              <li>Адрес электронной почты;</li>
              <li>Сведения, переданные пользователем в ходе переписки (в том числе через Telegram);</li>
              <li>Технические данные: IP-адрес, тип браузера, данные файлов cookie.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 text-white">4. Цели обработки персональных данных</h2>
            <p>Персональные данные обрабатываются в следующих целях:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Обработка заявок на оказание услуг;</li>
              <li>Заключение и исполнение договора-оферты;</li>
              <li>Обратная связь с пользователем;</li>
              <li>Улучшение качества Сайта и предоставляемых услуг;</li>
              <li>Направление информационных сообщений (при наличии согласия пользователя).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 text-white">5. Правовые основания обработки</h2>
            <p>
              Обработка персональных данных осуществляется на основании Федерального закона от 27.07.2006 № 152-ФЗ
              «О персональных данных», а также на основании согласия пользователя, выражаемого при оставлении
              заявки или при взаимодействии с Сайтом.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 text-white">6. Передача персональных данных третьим лицам</h2>
            <p>
              Персональные данные пользователей не передаются третьим лицам, за исключением случаев, предусмотренных
              действующим законодательством Российской Федерации, либо с прямого согласия пользователя.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 text-white">7. Файлы cookie</h2>
            <p>
              Сайт использует файлы cookie для корректной работы и улучшения пользовательского опыта.
              Пользователь вправе отключить использование файлов cookie в настройках своего браузера, однако
              это может повлиять на функциональность Сайта.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 text-white">8. Хранение и защита данных</h2>
            <p>
              Оператор принимает необходимые организационные и технические меры для защиты персональных данных
              от неправомерного доступа, уничтожения, изменения, блокирования, копирования и распространения.
              Персональные данные хранятся не дольше, чем этого требуют цели их обработки.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 text-white">9. Права пользователя</h2>
            <p>Пользователь вправе:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Получить информацию об обработке своих персональных данных;</li>
              <li>Потребовать уточнения, блокирования или уничтожения персональных данных;</li>
              <li>Отозвать согласие на обработку персональных данных;</li>
              <li>Обжаловать действия Оператора в Роскомнадзоре.</li>
            </ul>
            <p className="mt-2">
              Для реализации своих прав пользователь может обратиться к Оператору через Telegram:{" "}
              <a href="https://t.me/izmailova8888" className="hover:underline" style={{ color: "#c2410c" }}>
                @izmailova8888
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 text-white">10. Изменения в Политике</h2>
            <p>
              Оператор оставляет за собой право вносить изменения в настоящую Политику. Новая редакция
              вступает в силу с момента её размещения на Сайте. Рекомендуем периодически проверять данную страницу.
            </p>
          </section>
        </div>
      </div>

      <footer className="py-8 px-6 text-center text-sm" style={{ background: "#110a04", color: "#7a5c44" }}>
        <p>© 2026 ИП Измайлова Юлия Александровна · ИНН 665895132301</p>
      </footer>
    </div>
  );
}