import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const PesnyaVPodarok = lazy(() => import("./pages/PesnyaVPodarok"));
const Uslugi = lazy(() => import("./pages/Uslugi"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const PublicOffer = lazy(() => import("./pages/PublicOffer"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ObiNas = lazy(() => import("./pages/ObiNas"));
const Faq = lazy(() => import("./pages/Faq"));
const Otzyvy = lazy(() => import("./pages/Otzyvy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle1 = lazy(() => import("./pages/BlogArticle1"));
const BlogArticle2 = lazy(() => import("./pages/BlogArticle2"));
const BlogArticle3 = lazy(() => import("./pages/BlogArticle3"));
const BlogArticle4 = lazy(() => import("./pages/BlogArticle4"));
const BlogArticle5 = lazy(() => import("./pages/BlogArticle5"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
