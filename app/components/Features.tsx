"use client";

import { PackageCheck, Truck, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const featuresTranslations = {
  hy: [
    {
      icon: PackageCheck,
      title: "Մեծածախ & Մանրածախ",
      desc: "Հատուկ ճկուն սակագներ դիզայներների, ծաղկի սրահների և մեծածախ գնորդների համար։",
    },
    {
      icon: Truck,
      title: "Առաքում բոլոր ուղղություններով",
      desc: "Արագ և ապահով վճարովի առաքում Երևանում և ՀՀ բոլոր մարզերում։",
    },
    {
      icon: ShieldCheck,
      title: "Ֆիզիկական Տաղավար «Փեթակ»-ում",
      desc: "Այցելեք մեր տաղավար (ա/կ 101-105 սեղաններ)՝ տեղում տեսականին ուսումնասիրելու համար։",
    },
  ],
  ru: [
    {
      icon: PackageCheck,
      title: "Оптом & В Розницу",
      desc: "Специальные гибкие тарифы для дизайнеров, цветочных салонов и оптовых покупателей.",
    },
    {
      icon: Truck,
      title: "Доставка во все регионы",
      desc: "Быстрая и надежная платная доставка по Еревану и во все регионы Армении.",
    },
    {
      icon: ShieldCheck,
      title: "Павильон в ТЦ «Петак»",
      desc: "Посетите наш павильон (столы 101-105), чтобы ознакомиться с ассортиментом на месте.",
    },
  ],
  en: [
    {
      icon: PackageCheck,
      title: "Wholesale & Retail",
      desc: "Special flexible rates tailored for designers, flower boutiques, and bulk buyers.",
    },
    {
      icon: Truck,
      title: "Nationwide Delivery",
      desc: "Fast and reliable paid delivery across Yerevan and all regions of Armenia.",
    },
    {
      icon: ShieldCheck,
      title: "Physical Store at Petak",
      desc: "Visit our showroom (tables 101-105) to explore all supplies and materials in person.",
    },
  ],
};

export default function Features() {
  const { lang } = useLanguage();
  const items = featuresTranslations[lang as keyof typeof featuresTranslations] || featuresTranslations.hy;

  return (
    <section className="py-8 sm:py-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex items-start gap-3.5 sm:gap-4 group"
            >
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 group-hover:scale-105 group-hover:bg-emerald-100/70 transition-all duration-300 shrink-0 shadow-xs">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-900 mb-1 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}