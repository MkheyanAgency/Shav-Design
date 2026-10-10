"use client";

import { Truck, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const bannerTranslations = {
  hy: {
    delivery: "Գործում է վճարովի առաքում բոլոր ուղղություններով",
    location: "«Փեթակ» ա/կ 101-105 սեղաններ",
  },
  ru: {
    delivery: "Платная доставка по всем направлениям",
    location: "ТЦ «Петак», павильон 101-105",
  },
  en: {
    delivery: "Paid delivery to all destinations",
    location: "Petak Fair, tables 101-105",
  },
};

export default function TopBanner() {
  const { lang } = useLanguage();
  const t = bannerTranslations[lang as keyof typeof bannerTranslations] || bannerTranslations.hy;

  return (
    <aside className="bg-[#0f2e24] text-slate-200 border-b border-emerald-950/60 transition-colors">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-[10px] sm:text-xs">
        
        {/* Delivery notice */}
        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left leading-tight">
          <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-medium text-emerald-50/90">{t.delivery}</span>
        </div>

        {/* Location link & notice */}
        <a
          href="https://2gis.am/ru/yerevan/firm/70000001111109804?m=44.507093%2C40.163224%2F17.89"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1 text-slate-300 hover:text-emerald-300 transition-colors shrink-0"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-medium underline-offset-2 hover:underline">{t.location}</span>
        </a>

      </div>
    </aside>
  );
}