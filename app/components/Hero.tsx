"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShoppingBag, Send, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const heroTranslations = {
  hy: {
    badge: "Մեծածախ և Մանրածախ Ճկուն Գներ",
    titleStart: "Ամեն ինչ Ձեր",
    titleHighlight: "դիզայներական & ստեղծագործ",
    titleEnd: "մտքերի համար",
    description:
      "«Shav Design»-ն առաջարկում է դիզայնի, տոնական ձևավորման, ֆլորիստիկայի և փաթեթավորման պարագաների լայն տեսականի «Փեթակ» տոնավաճառում։",
    catalogBtn: "Տեսնել Ապրանքները",
    telegramBtn: "Telegram Կատալոգ",
    welcomeBadge: "Բարի գալուստ Shav Design! 👋",
    floatingQuality: "Պրեմիում Որակ",
    floatingLocation: "«Փեթակ» 101-105",
    wholesale: "Մեծածախ & Մանրածախ",
    delivery: "Առաքում բոլոր մարզեր",
  },
  ru: {
    badge: "Гибкие Оптовые и Розница Цены",
    titleStart: "Всё для Ваших",
    titleHighlight: "дизайнерских и творческих",
    titleEnd: "идей",
    description:
      "«Shav Design» предлагает широкий ассортимент товаров для дизайна, праздничного декора, флористики и упаковки на ярмарке «Петак».",
    catalogBtn: "Смотреть Товары",
    telegramBtn: "Telegram Каталог",
    welcomeBadge: "Добро пожаловать в Shav Design! 👋",
    floatingQuality: "Премиум Качество",
    floatingLocation: "ТЦ «Петак» 101-105",
    wholesale: "Оптом и в розницу",
    delivery: "Доставка во все регионы",
  },
  en: {
    badge: "Flexible Wholesale & Retail Prices",
    titleStart: "Everything for Your",
    titleHighlight: "Creative & Design",
    titleEnd: "Projects",
    description:
      "“Shav Design” offers a wide selection of supplies for packaging, festive decoration, and floral design at Petak fair.",
    catalogBtn: "View Products",
    telegramBtn: "Telegram Catalog",
    welcomeBadge: "Welcome to Shav Design! 👋",
    floatingQuality: "Premium Quality",
    floatingLocation: "Petak mall 101-105",
    wholesale: "Wholesale & Retail",
    delivery: "Delivery to all regions",
  },
};

export default function Hero() {
  const { lang } = useLanguage();
  const t = heroTranslations[lang as keyof typeof heroTranslations] || heroTranslations.hy;

  return (
    <section className="relative overflow-hidden py-14 md:py-20 px-4 bg-gradient-to-b from-[#f3f8f5] via-white to-white border-b border-slate-100">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-lime-100/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="md:col-span-7 text-center md:text-left">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-950 text-xs px-3.5 py-1.5 rounded-full font-bold mb-5 border border-emerald-300/60 shadow-2xs backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
            <span>{t.badge}</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15] mb-5">
            {t.titleStart}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f2e24] via-emerald-700 to-emerald-900">
              {t.titleHighlight}
            </span>{" "}
            {t.titleEnd}
          </h1>
          
          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm md:text-base mb-8 leading-relaxed max-w-xl mx-auto md:mx-0 font-normal">
            {t.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
            <Link
              href="/catalog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0f2e24] hover:bg-emerald-800 text-white px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-emerald-950/15 active:scale-95 group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300 group-hover:rotate-12 transition-transform" />
              <span>{t.catalogBtn}</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <a
              href="https://t.me/+37494083089"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-2xs active:scale-95"
            >
              <Send className="w-4 h-4 text-sky-500" />
              <span>{t.telegramBtn}</span>
            </a>
          </div>

          {/* Micro trust features below buttons */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2 bg-emerald-50/70 border border-emerald-100 px-3 py-1.5 rounded-xl shadow-2xs hover:bg-emerald-100/60 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-800">{t.wholesale}</span>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50/70 border border-emerald-100 px-3 py-1.5 rounded-xl shadow-2xs hover:bg-emerald-100/60 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-800">{t.delivery}</span>
            </div>
          </div>
        </div>

        {/* Right Mascot & Showcase Visual */}
        <div className="md:col-span-5 flex justify-center relative">
          
          {/* Main Card */}
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 bg-gradient-to-tr from-white to-emerald-50/50 rounded-3xl p-6 shadow-2xl shadow-emerald-950/10 border border-slate-200/80 flex flex-col items-center justify-between text-center group hover:border-emerald-300 transition-all duration-500">
            
            {/* Background pattern decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(#0f2e24_1px,transparent_1px)] [background-size:16px_16px] opacity-5 rounded-3xl pointer-events-none" />

            {/* Logo / Mascot Image */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 relative my-auto group-hover:scale-105 transition-transform duration-500 drop-shadow-md">
              <Image
                src="/logo.png"
                alt="Shav Mascot Logo"
                fill
                priority
                sizes="(max-width: 768px) 192px, 224px"
                className="object-contain"
              />
            </div>

            {/* Bottom Pill Badge */}
            <span className="relative z-10 text-xs font-bold text-emerald-950 bg-emerald-50/90 border border-emerald-200 px-4 py-1.5 rounded-full shadow-2xs backdrop-blur-sm">
              {t.welcomeBadge}
            </span>

            {/* Floating Pill Top Right */}
            <div className="absolute -top-3 -right-3 bg-white border border-slate-200 shadow-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-[11px] font-bold text-slate-800 animate-bounce duration-1000">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{t.floatingQuality}</span>
            </div>

            {/* Floating Pill Bottom Left */}
            <div className="absolute -bottom-3 -left-3 bg-[#0f2e24] text-emerald-300 shadow-md px-3 py-1.5 rounded-2xl text-[10px] font-bold border border-emerald-600/30">
              📍 {t.floatingLocation}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}