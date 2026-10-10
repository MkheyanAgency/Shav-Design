"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "../context/ProductsContext";
import { useLanguage } from "../context/LanguageContext";
import { CATEGORIES } from "../data/products";
import { ArrowUpRight, Loader2, ArrowRight, PackageOpen } from "lucide-react";

interface Product {
  id: string | number;
  category: string;
  price: number;
  image: string;
  title?: string;
  title_hy?: string;
  title_ru?: string;
  title_en?: string;
  desc?: string;
  desc_hy?: string;
  desc_ru?: string;
  desc_en?: string;
  badge?: string;
  badge_hy?: string;
  badge_ru?: string;
  badge_en?: string;
}

const sectionTranslations = {
  hy: {
    title: "Մեր Տեսականին",
    subtitle: "Ընտրեք բաժինը և կապվեք մեզ հետ գների ու ճշգրիտ առկայության համար",
    contractPrice: "Պայմանագրային",
    askOrderBtn: "Հարցնել / Պատվիրել",
    viewAllBtn: "Տեսնել Ամբողջ Տեսականին",
    loadingText: "Բեռնվում են ապրանքները...",
    emptyTitle: "Ապրանքներ չեն գտնվել",
    emptyDesc: "Այս կատեգորիայում ապրանքներ դեռ ավելացված չեն",
    categories: {
      all: "Ամբողջը",
      boxes: "Տուփեր և Փաթեթներ",
      ribbons: "Ժապավեններ և Թղթեր",
      decor: "Տոնական Դեկոր",
      florist: "Ֆլորիստիկա",
      candles: "Մոմեր",
    },
    waMsg: (title: string) => `Ողջույն, հետաքրքրում է "${title}" ապրանքը`,
  },
  ru: {
    title: "Наш Ассортимент",
    subtitle: "Выберите категорию и свяжитесь с нами для уточнения цен и наличия",
    contractPrice: "Договорная",
    askOrderBtn: "Уточнить / Заказать",
    viewAllBtn: "Посмотреть Весь Каталог",
    loadingText: "Загрузка товаров...",
    emptyTitle: "Товары не найдены",
    emptyDesc: "В этой категории пока нет товаров",
    categories: {
      all: "Все",
      boxes: "Коробки и Пакеты",
      ribbons: "Ленты и Бумага",
      decor: "Праздничный Декор",
      florist: "Флористика",
      candles: "Свечи",
    },
    waMsg: (title: string) => `Здравствуйте, меня интересует товар "${title}"`,
  },
  en: {
    title: "Our Selection",
    subtitle: "Choose a category and contact us for pricing and availability",
    contractPrice: "Negotiable",
    askOrderBtn: "Inquire / Order",
    viewAllBtn: "View Full Catalog",
    loadingText: "Loading products...",
    emptyTitle: "No Products Found",
    emptyDesc: "No products added in this category yet",
    categories: {
      all: "All",
      boxes: "Boxes & Bags",
      ribbons: "Ribbons & Paper",
      decor: "Festive Decor",
      florist: "Floristics",
      candles: "Candles",
    },
    waMsg: (title: string) => `Hello, I am interested in the product "${title}"`,
  },
};

export default function Catalog() {
  const { products, loading } = useProducts();
  const { lang } = useLanguage();
  const t = sectionTranslations[lang as keyof typeof sectionTranslations] || sectionTranslations.hy;
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return activeCategory === "all"
      ? products
      : products.filter((p: Product) => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <section id="catalog" className="max-w-6xl mx-auto py-10 sm:py-14 px-4">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 animate-in fade-in duration-300">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0f2e24] tracking-tight">
          {t.title}
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const localizedCatName = (t.categories as Record<string, string>)[cat.id] || cat.name;
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                isSelected
                  ? "bg-[#0f2e24] text-white shadow-xs font-bold"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {localizedCatName}
            </button>
          );
        })}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs font-semibold animate-in fade-in duration-300">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-700" />
          <span>{t.loadingText}</span>
        </div>
      ) : filtered.length > 0 ? (
        
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 animate-in fade-in slide-in-from-bottom-2 duration-400">
          {filtered.map((item: Product) => {
            const displayTitle =
              (lang === "ru" && item.title_ru) ||
              (lang === "en" && item.title_en) ||
              item.title_hy ||
              item.title ||
              "";

            const displayDesc =
              (lang === "ru" && item.desc_ru) ||
              (lang === "en" && item.desc_en) ||
              item.desc_hy ||
              item.desc ||
              "";

            const displayBadge =
              (lang === "ru" && item.badge_ru) ||
              (lang === "en" && item.badge_en) ||
              item.badge_hy ||
              item.badge ||
              "";

            const waUrl = `https://wa.me/37494083089?text=${encodeURIComponent(
              t.waMsg(displayTitle)
            )}`;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative h-44 bg-slate-100 rounded-xl mb-3 overflow-hidden border border-slate-100">
                    <Image
                      src={item.image || "/logo.png"}
                      alt={displayTitle || "Product"}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/logo.png";
                      }}
                    />
                    {displayBadge && (
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-emerald-950 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md border border-emerald-100 shadow-2xs">
                        {displayBadge}
                      </span>
                    )}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-emerald-900 transition-colors">
                    {displayTitle}
                  </h3>
                  
                  {displayDesc && (
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {displayDesc}
                    </p>
                  )}

                  {/* Price */}
                  <div className="mt-2 text-xs font-black text-slate-900">
                    {Number(item.price) > 0
                      ? `${Number(item.price).toLocaleString()} ֏`
                      : t.contractPrice}
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 w-full bg-slate-50 hover:bg-emerald-50 text-[#0f2e24] border border-slate-200 hover:border-emerald-300 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <span>{t.askOrderBtn}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        
        /* Empty State */
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 animate-in fade-in duration-300">
          <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center mx-auto mb-2.5 text-slate-400 shadow-2xs">
            <PackageOpen className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-slate-700">{t.emptyTitle}</p>
          <p className="text-xs text-slate-400 mt-1">{t.emptyDesc}</p>
        </div>
      )}

      {/* Link to Full Catalog Page */}
      <div className="text-center mt-10">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 bg-[#0f2e24] hover:bg-emerald-800 text-white font-semibold text-xs px-6 py-3.5 rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
        >
          <span>{t.viewAllBtn}</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </Link>
      </div>

    </section>
  );
}