"use client";

import Image from "next/image";
import { MessageCircle, Eye, CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

interface Product {
  id: string | number;
  title?: string;
  title_hy?: string;
  title_ru?: string;
  title_en?: string;
  desc?: string;
  desc_hy?: string;
  desc_ru?: string;
  desc_en?: string;
  price: number;
  badge?: string;
  badge_hy?: string;
  badge_ru?: string;
  badge_en?: string;
  minOrder?: string;
  minOrder_hy?: string;
  minOrder_ru?: string;
  minOrder_en?: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const cardTranslations = {
  hy: {
    inStock: "Առկա է",
    quickView: "Արագ դիտում",
    priceLabel: "Գինը",
    contractPrice: "Պայմանագրային",
    cartBtn: "Զամբյուղ",
    buyBtn: "Գնել",
    whatsappMsg: (title: string, id: string | number) =>
      `Բարև ձեզ, ցանկանում եմ պատվիրել/ճշտել տեղեկություն հետևյալ ապրանքի մասին՝ "${title}" (ID: ${id})`,
  },
  ru: {
    inStock: "В наличии",
    quickView: "Быстрый просмотр",
    priceLabel: "Цена",
    contractPrice: "Договорная",
    cartBtn: "В корзину",
    buyBtn: "Купить",
    whatsappMsg: (title: string, id: string | number) =>
      `Здравствуйте, хочу заказать/уточнить информацию о товаре: "${title}" (ID: ${id})`,
  },
  en: {
    inStock: "In Stock",
    quickView: "Quick View",
    priceLabel: "Price",
    contractPrice: "Negotiable",
    cartBtn: "Cart",
    buyBtn: "Buy",
    whatsappMsg: (title: string, id: string | number) =>
      `Hello, I would like to order/inquire about the following product: "${title}" (ID: ${id})`,
  },
};

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { lang } = useLanguage();
  const t = cardTranslations[lang as keyof typeof cardTranslations] || cardTranslations.hy;

  // Multilingual dynamic fields
  const displayTitle =
    (lang === "ru" && product.title_ru) ||
    (lang === "en" && product.title_en) ||
    product.title_hy ||
    product.title ||
    "";

  const displayDesc =
    (lang === "ru" && product.desc_ru) ||
    (lang === "en" && product.desc_en) ||
    product.desc_hy ||
    product.desc ||
    "";

  const displayBadge =
    (lang === "ru" && product.badge_ru) ||
    (lang === "en" && product.badge_en) ||
    product.badge_hy ||
    product.badge ||
    "";

  const displayMinOrder =
    (lang === "ru" && product.minOrder_ru) ||
    (lang === "en" && product.minOrder_en) ||
    product.minOrder_hy ||
    product.minOrder ||
    "";

  const whatsappUrl = `https://wa.me/37494083089?text=${encodeURIComponent(
    t.whatsappMsg(displayTitle, product.id)
  )}`;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      title: displayTitle,
      desc: displayDesc,
    });
  };

  return (
    <div className="group border border-slate-200/80 rounded-2xl bg-white overflow-hidden hover:border-emerald-600/40 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col justify-between">
      
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <Image
          src={product.image || "/logo.png"}
          alt={displayTitle || "Product"}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/logo.png";
          }}
        />
        
        {displayBadge && (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#0f2e24]/90 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md border border-emerald-500/20 shadow-xs">
            {displayBadge}
          </span>
        )}

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView({ ...product, title: displayTitle, desc: displayDesc })}
          className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-xl backdrop-blur shadow-sm opacity-100 sm:opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer active:scale-95 border border-slate-200/50"
          title={t.quickView}
          aria-label={t.quickView}
        >
          <Eye className="w-4 h-4 text-slate-700" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{t.inStock}</span>
            {displayMinOrder && (
              <span className="text-slate-400 font-normal">({displayMinOrder})</span>
            )}
          </div>

          <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1 group-hover:text-emerald-800 transition">
            {displayTitle}
          </h3>

          {displayDesc && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {displayDesc}
            </p>
          )}
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">{t.priceLabel}</span>
            <span className="text-sm sm:text-base font-black text-slate-900 whitespace-nowrap">
              {Number(product.price) > 0 ? `${Number(product.price).toLocaleString()} ֏` : t.contractPrice}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 text-xs font-semibold px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
              title={t.cartBtn}
              aria-label={t.cartBtn}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">{t.cartBtn}</span>
            </button>

            {/* Direct WhatsApp Order */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-[#0f2e24] hover:bg-emerald-800 text-white text-xs font-semibold px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
              title={t.buyBtn}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{t.buyBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}