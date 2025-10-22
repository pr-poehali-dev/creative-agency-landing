import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#hero', label: 'Главная' },
    { href: '#portfolio', label: 'Портфолио' },
    { href: '#services', label: 'Услуги' },
    { href: '#team', label: 'Команда' },
    { href: '#process', label: 'Процесс' },
    { href: '#tech', label: 'Технологии' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contact', label: 'Контакты' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <a
        href="https://t.me/izmailova8888"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-scale-in"
        aria-label="Написать в Telegram"
      >
        <Icon name="MessageCircle" size={28} className="text-white" />
      </a>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Creative
          </div>
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <Button className="hidden md:block">Связаться</Button>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                  AI Creative
                </div>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <Button className="mt-4" onClick={() => setMobileMenuOpen(false)}>
                  Связаться
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Создаём контент будущего с помощью{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  AI
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Производство музыки и видео с использованием передовых нейросетей. Уникальный контент для вашего бренда.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="text-lg">
                  Начать проект
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  Посмотреть работы
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/48c4e400-bd50-439a-af9f-6342f243e164.jpg"
                alt="AI Neural Network"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Портфолио</h2>
            <p className="text-xl text-muted-foreground">Наши лучшие работы</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 animate-fade-in-up">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Play" size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Проект {item}</h3>
                  <p className="text-sm text-muted-foreground">AI-генерация музыки</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Услуги</h2>
            <p className="text-xl text-muted-foreground">Полный цикл производства контента</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Icon name="Music" size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI Музыка</h3>
              <p className="text-muted-foreground">
                Создание уникальных треков с использованием нейросетей. От фоновой музыки до полноценных композиций.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <Icon name="Video" size={32} className="text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI Видео</h3>
              <p className="text-muted-foreground">
                Производство видеоконтента с AI: монтаж, эффекты, генерация визуальных элементов.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Icon name="Sparkles" size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Креативные решения</h3>
              <p className="text-muted-foreground">
                Комплексные проекты: озвучка, субтитры, цветокоррекция, все возможности AI для вашего контента.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Команда</h2>
            <p className="text-xl text-muted-foreground">Эксперты AI и креатива</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {['Алексей', 'Мария', 'Дмитрий', 'Анна'].map((name, idx) => (
              <Card key={name} className="p-6 text-center hover:shadow-xl transition-shadow animate-fade-in-up">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">{name}</h3>
                <p className="text-sm text-muted-foreground">AI Specialist</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Процесс работы</h2>
            <p className="text-xl text-muted-foreground">От идеи до результата</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: 'Lightbulb', title: 'Идея', desc: 'Обсуждаем концепцию проекта' },
              { icon: 'Cpu', title: 'AI Анализ', desc: 'Подбираем оптимальные модели' },
              { icon: 'Wand2', title: 'Создание', desc: 'Генерируем контент' },
              { icon: 'Check', title: 'Результат', desc: 'Финальная доработка и доставка' }
            ].map((step, idx) => (
              <div key={step.title} className="relative animate-fade-in-up">
                <Card className="p-6 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={step.icon as any} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </Card>
                {idx < 3 && (
                  <Icon name="ArrowRight" size={24} className="hidden md:block absolute top-1/2 -right-8 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tech" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Технологии и AI-инструменты</h2>
            <p className="text-xl text-muted-foreground">Используем передовые нейросети</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              {[
                { name: 'GPT-4', desc: 'Генерация текстов и сценариев' },
                { name: 'Midjourney / DALL-E', desc: 'Создание визуальных элементов' },
                { name: 'Suno / Stable Audio', desc: 'AI-композиция музыки' },
                { name: 'RunwayML', desc: 'AI монтаж и эффекты' },
                { name: 'ElevenLabs', desc: 'Реалистичная озвучка' }
              ].map((tech) => (
                <Card key={tech.name} className="p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                  <p className="text-muted-foreground">{tech.desc}</p>
                </Card>
              ))}
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/b2acea56-ed48-4d91-9ea6-1f8a27b4c2ef/files/200d5af2-199e-4cda-b9c7-cf2c271c5285.jpg"
                alt="AI Studio"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">Что говорят о нас</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Иван Петров', company: 'Tech Startup', text: 'Невероятное качество AI-музыки! Использовали для нашего продукта.' },
              { name: 'Елена Смирнова', company: 'Media Agency', text: 'Быстро, профессионально, инновационно. Рекомендуем!' },
              { name: 'Михаил Козлов', company: 'Brand Studio', text: 'AI-генерация контента на высшем уровне. Будем обращаться ещё!' }
            ].map((review) => (
              <Card key={review.name} className="p-8 hover:shadow-xl transition-shadow animate-fade-in-up">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={16} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{review.text}"</p>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground">Начнём ваш проект сегодня</p>
          </div>
          
          <div className="flex justify-center gap-4 mb-8 animate-fade-in">
            <Button
              size="lg"
              className="text-lg"
              onClick={() => window.open('https://t.me/your_username', '_blank')}
            >
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Написать в Telegram
            </Button>
          </div>

          <Card className="p-8 md:p-12 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input 
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Сообщение</label>
                <Textarea 
                  placeholder="Расскажите о вашем проекте..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <Button type="submit" size="lg" className="w-full text-lg">
                Отправить заявку
                <Icon name="Send" size={20} className="ml-2" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-6 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Creative
              </h3>
              <p className="text-sm text-muted-foreground">
                Создаём будущее контента с помощью искусственного интеллекта
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>AI Музыка</li>
                <li>AI Видео</li>
                <li>Креативные решения</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Команда</li>
                <li>Карьера</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@aicreative.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  <a href="https://t.me/izmailova8888" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    @izmailova8888
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, Россия
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center">
            <div className="flex justify-center gap-6 mb-4">
              <a href="https://t.me/izmailova8888" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
              <a href="mailto:info@aicreative.ru" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="tel:+79991234567" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Phone" size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 AI Creative Agency. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;