"use client";

import { useState } from "react";
import Image from "next/image";
import { X, MessageCircle, MapPin, Truck, Check, ShoppingBag, Plus, Minus } from "lucide-react";
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
  image: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const modalTranslations = {
  hy: {
    contractPrice: "Պայմանագրային",
    qtyLabel: "Քանակ՝",
    feature1: "Մեծածախ և Մանրածախ վաճառք",
    feature2: "«Փեթակ» տոնավաճառ, ա/կ 101-105",
    feature3: "Առաքում Երևանում և մարզեր",
    addToCartBtn: "Ավելացնել Զամբյուղ",
    whatsappBtn: "Պատվիրել WhatsApp-ով",
    whatsappMsg: (title: string, qty: number) =>
      `Բարև ձեզ, հետաքրքրված եմ հետևյալ ապրանքով (${qty} հատ)՝ "${title}"`,
  },
  ru: {
    contractPrice: "Договорная",
    qtyLabel: "Количество:",
    feature1: "Оптовая и розничная продажа",
    feature2: "Ярмарка «Петак», пав. 101-105",
    feature3: "Доставка по Еревану и регионам",
    addToCartBtn: "Добавить в корзину",
    whatsappBtn: "Заказать через WhatsApp",
    whatsappMsg: (title: string, qty: number) =>
      `Здравствуйте, меня интересует товар (${qty} шт.) — "${title}"`,
  },
  en: {
    contractPrice: "Negotiable",
    qtyLabel: "Quantity:",
    feature1: "Wholesale & Retail",
    feature2: "Petak Fair, tables 101-105",
    feature3: "Delivery across Yerevan and regions",
    addToCartBtn: "Add to Cart",
    whatsappBtn: "Order via WhatsApp",
    whatsappMsg: (title: string, qty: number) =>
      `Hello, I am interested in the following product (${qty} pcs) — "${title}"`,
  },
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { lang } = useLanguage();
  const t = modalTranslations[lang as keyof typeof modalTranslations] || modalTranslations.hy;

  if (!product) return null;

  // Multilingual field resolver
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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        title: displayTitle,
        desc: displayDesc,
      });
    }
    onClose();
  };

  const whatsappUrl = `https://wa.me/37494083089?text=${encodeURIComponent(
    t.whatsappMsg(displayTitle, quantity)
  )}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative max-h-[90vh] sm:max-h-[85vh] flex flex-col sm:block animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md backdrop-blur transition active:scale-95 cursor-pointer border border-slate-200/60"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid sm:grid-cols-2 overflow-y-auto max-h-[calc(90vh-2rem)] sm:max-h-none">
          {/* Image Container */}
          <div className="relative aspect-square sm:aspect-auto bg-slate-100 min-h-[240px] sm:min-h-[320px] w-full shrink-0">
            <Image
              src={product.image || "/logo.png"}
              alt={displayTitle || "Product"}
              fill
              unoptimized
              priority
              sizes="(max-width: 640px) 100vw, 320px"
              className="object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/logo.png";
              }}
            />
            {displayBadge && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#0f2e24]/90 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-emerald-500/20 shadow-xs">
                {displayBadge}
              </span>
            )}
          </div>

          {/* Details & Actions */}
          <div className="p-4 sm:p-6 flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {displayTitle}
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5 sm:mt-2">
                {Number(product.price) > 0 ? `${Number(product.price).toLocaleString()} ֏` : t.contractPrice}
              </p>

              {displayDesc && (
                <p className="text-xs text-slate-500 mt-2 sm:mt-3 leading-relaxed">
                  {displayDesc}
                </p>
              )}

              {/* Quantity Selector */}
              <div className="mt-4 sm:mt-5 flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-700 ml-1">{t.qtyLabel}</span>
                <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl px-2 py-1 shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-slate-600 hover:text-slate-900 transition cursor-pointer active:scale-90"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-slate-900 min-w-[16px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-slate-600 hover:text-slate-900 transition cursor-pointer active:scale-90"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Advantages Info */}
              <div className="mt-4 space-y-2 text-[11px] sm:text-xs text-slate-500 border-t border-slate-100 pt-3.5">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>{t.feature1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>{t.feature2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>{t.feature3}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 sm:mt-6 space-y-2">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200/80 font-bold text-xs py-3 rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                {t.addToCartBtn}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#0f2e24] hover:bg-emerald-800 text-white font-semibold text-xs py-3 rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                {t.whatsappBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}