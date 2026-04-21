
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PesnyaVPodarok from "./pages/PesnyaVPodarok";
import Uslugi from "./pages/Uslugi";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PublicOffer from "./pages/PublicOffer";
import Portfolio from "./pages/Portfolio";
import ObiNas from "./pages/ObiNas";
import Faq from "./pages/Faq";
import Otzyvy from "./pages/Otzyvy";
import Blog from "./pages/Blog";
import BlogArticle1 from "./pages/BlogArticle1";
import BlogArticle2 from "./pages/BlogArticle2";
import BlogArticle3 from "./pages/BlogArticle3";
import BlogArticle4 from "./pages/BlogArticle4";
import BlogArticle5 from "./pages/BlogArticle5";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PesnyaVPodarok />} />
          <Route path="/uslugi" element={<Uslugi />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/public-offer" element={<PublicOffer />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/o-nas" element={<ObiNas />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/otzyvy" element={<Otzyvy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/top-10-idej-podarkov-na-godovshchinu" element={<BlogArticle1 />} />
          <Route path="/blog/chto-podarit-mame-na-yubilej" element={<BlogArticle2 />} />
          <Route path="/blog/pesnya-na-zakaz-vs-obychnyj-podarok" element={<BlogArticle3 />} />
          <Route path="/blog/kak-sozdaetsya-personalnaya-pesnya" element={<BlogArticle4 />} />
          <Route path="/blog/7-prichin-zakazat-zhivoj-vokal" element={<BlogArticle5 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;