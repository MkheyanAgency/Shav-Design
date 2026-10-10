"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { useProducts } from "../context/ProductsContext";
import { useLanguage } from "../context/LanguageContext";
import { CATEGORIES } from "../data/products";
import { Search, SlidersHorizontal, ArrowUpDown, PhoneCall, RotateCcw, Loader2, PackageOpen } from "lucide-react";

const catalogTranslations = {
  hy: {
    badge: "Տեսականի",
    title: "Մեր Ապրանքատեսականին",
    subtitle: "Դիզայնի, տոնական ձևավորման և փաթեթավորման պարագաների մեծածախ & մանրածախ ընտրանի",
    searchPlaceholder: "Որոնել ըստ անվանման կամ նկարագրության...",
    sortLabel: "Դասավորել՝",
    sortDefault: "Սկզբնական",
    sortLow: "Գին՝ էժանից թանկ",
    sortHigh: "Գին՝ թանկից էժան",
    upTo: "Մինչև՝",
    loadingText: "Բեռնվում են ապրանքները...",
    emptyTitle: "Ապրանքներ չեն գտնվել",
    emptyDesc: "Բազան դատարկ է կամ ֆիլտրին համապատասխան ապրանք չկա",
    bannerBadge: "Անհատական պատվերներ",
    bannerTitle: "Փնտրում եք կոնկրետ ապրա՞նք կամ մեծաքանակ խմբաքանա՞կ",
    bannerDesc: "Ուղարկեք նկարը մեր մասնագետին WhatsApp-ով կամ Telegram-ով և ստացեք մեծածախ գնառաջարկ։",
    bannerBtn: "Գրել WhatsApp-ին",
    categories: {
      all: "Ամբողջը",
      boxes: "Տուփեր և Փաթեթներ",
      ribbons: "Ժապավեններ և Թղթեր",
      decor: "Տոնական Դեկոր",
      florist: "Ֆլորիստիկա",
      candles: "Մոմեր",
    },
  },
  ru: {
    badge: "Ассортимент",
    title: "Наш Каталог Товаров",
    subtitle: "Оптовый и розничный выбор материалов для дизайна, декора и упаковки",
    searchPlaceholder: "Искать по названию или описанию...",
    sortLabel: "Сортировка:",
    sortDefault: "По умолчанию",
    sortLow: "Цена: по возрастанию",
    sortHigh: "Цена: по убыванию",
    upTo: "До:",
    loadingText: "Загрузка товаров...",
    emptyTitle: "Товары не найдены",
    emptyDesc: "База пуста или нет подходящих товаров по фильтрам",
    bannerBadge: "Индивидуальные заказы",
    bannerTitle: "Ищете конкретный товар или крупную партию?",
    bannerDesc: "Отправьте фото нашему специалисту в WhatsApp или Telegram и получите оптовое предложение.",
    bannerBtn: "Написать в WhatsApp",
    categories: {
      all: "Все",
      boxes: "Коробки и Пакеты",
      ribbons: "Ленты и Бумага",
      decor: "Праздничный Декор",
      florist: "Флористика",
      candles: "Свечи",
    },
  },
  en: {
    badge: "Products",
    title: "Our Product Catalog",
    subtitle: "Wholesale & retail selection for design, festive decor, and packaging supplies",
    searchPlaceholder: "Search by title or description...",
    sortLabel: "Sort by:",
    sortDefault: "Default",
    sortLow: "Price: Low to High",
    sortHigh: "Price: High to Low",
    upTo: "Up to:",
    loadingText: "Loading products...",
    emptyTitle: "No Products Found",
    emptyDesc: "Database is empty or no products match your selected filters",
    bannerBadge: "Custom Orders",
    bannerTitle: "Looking for a specific item or wholesale volume?",
    bannerDesc: "Send a picture to our specialist via WhatsApp or Telegram and get a custom wholesale quote.",
    bannerBtn: "Chat on WhatsApp",
    categories: {
      all: "All",
      boxes: "Boxes & Bags",
      ribbons: "Ribbons & Paper",
      decor: "Festive Decor",
      florist: "Floristics",
      candles: "Candles",
    },
  },
};

export default function CatalogPage() {
  const { products, loading } = useProducts();
  const { lang } = useLanguage();
  const t = catalogTranslations[lang] || catalogTranslations.hy;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sortBy, setSortBy] = useState("default");
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchPrice = Number(item.price) <= maxPrice;
      return matchCat && matchSearch && matchPrice;
    }).sort((a, b) => {
      if (sortBy === "low") return Number(a.price) - Number(b.price);
      if (sortBy === "high") return Number(b.price) - Number(a.price);
      return 0;
    });
  }, [products, selectedCategory, searchQuery, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setMaxPrice(25000);
    setSortBy("default");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-950">
      <Navbar />

      <main className="max-w-6xl w-full mx-auto px-4 py-10 flex-1 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 animate-in fade-in zoom-in-95 duration-500">
          <span className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100 shadow-2xs">
            {t.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2.5 tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Filters Card */}
        <div className="bg-slate-50/90 border border-slate-200/80 rounded-3xl p-4 sm:p-6 mb-8 space-y-4 shadow-2xs backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-400">
          
          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-xl shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-500">{t.sortLabel}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="default">{t.sortDefault}</option>
                <option value="low">{t.sortLow}</option>
                <option value="high">{t.sortHigh}</option>
              </select>
            </div>
          </div>

          {/* Categories & Price Range */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-slate-200/60">
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => {
                const localizedName = t.categories[cat.id] || cat.name;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                      isSelected
                        ? "bg-[#0f2e24] text-white shadow-xs font-bold"
                        : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200/70"
                    }`}
                  >
                    {localizedName}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 border border-slate-200 rounded-xl self-start lg:self-auto shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">{t.upTo}</span>
                <span className="font-bold text-slate-900">{maxPrice.toLocaleString()} ֏</span>
              </div>
              <input
                type="range"
                min="500"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-emerald-800 cursor-pointer"
              />
              <button
                onClick={resetFilters}
                title="Reset"
                className="p-1 text-slate-400 hover:text-slate-700 transition ml-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State & Products Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400 animate-in fade-in duration-300">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-700" />
            <span className="text-xs font-semibold">{t.loadingText}</span>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-3 duration-400">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setActiveModalProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400 shadow-2xs">
              <PackageOpen className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">{t.emptyTitle}</p>
            <p className="text-xs text-slate-400 mt-1">{t.emptyDesc}</p>
          </div>
        )}

        {/* Banner */}
        <div className="mt-14 bg-[#0f2e24] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-950/5 hover:border-emerald-700/50 transition duration-300">
          <div>
            <span className="bg-[#8dc63f] text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded shadow-2xs">
              {t.bannerBadge}
            </span>
            <h3 className="text-lg font-bold mt-2.5 tracking-tight">{t.bannerTitle}</h3>
            <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed max-w-xl">
              {t.bannerDesc}
            </p>
          </div>
          <a
            href="https://wa.me/37494083089"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#8dc63f] hover:bg-[#9ddb47] text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition shadow active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" /> {t.bannerBtn}
          </a>
        </div>
      </main>

      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      <Footer />
    </div>
  );
}