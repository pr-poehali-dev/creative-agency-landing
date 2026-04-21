import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  ogUrl?: string;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
  return el;
}

export function usePageMeta({ title, description, ogUrl }: PageMeta) {
  useEffect(() => {
    const prev = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? "",
      ogDesc: document.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? "",
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? "",
      twTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute("content") ?? "",
      twDesc: document.querySelector('meta[name="twitter:description"]')?.getAttribute("content") ?? "",
    };

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    if (ogUrl) setMeta('meta[property="og:url"]', "content", ogUrl);

    return () => {
      document.title = prev.title;
      setMeta('meta[name="description"]', "content", prev.desc);
      setMeta('meta[property="og:title"]', "content", prev.ogTitle);
      setMeta('meta[property="og:description"]', "content", prev.ogDesc);
      setMeta('meta[property="og:url"]', "content", prev.ogUrl);
      setMeta('meta[name="twitter:title"]', "content", prev.twTitle);
      setMeta('meta[name="twitter:description"]', "content", prev.twDesc);
    };
  }, [title, description, ogUrl]);
}
