"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, RotateCcw } from "lucide-react";

interface CartItem {
  id: string | number;
  title?: string;
  title_hy?: string;
  title_ru?: string;
  title_en?: string;
  price: number;
  quantity: number;
  image: string;
}

const drawerTranslations = {
  hy: {
    cartTitle: "Զամբյուղ",
    itemsCount: (count: number) => `${count} ապրանքատեսակ`,
    clearCart: "Մաքրել զամբյուղը",
    emptyTitle: "Ձեր զամբյուղը դատարկ է",
    emptyDesc: "Ավելացրեք ապրանքներ տեսականու էջից պատվեր ձևակերպելու համար:",
    totalLabel: "Ընդհանուր գումար՝",
    checkoutBtn: "Ուղարկել Պատվերը WhatsApp-ով",
    waHeader: "🛒 *Նոր Պատվեր Shav Design-ից*\n-----------------------------\n",
    waQty: "Քանակ՝",
    waPrice: "Գին՝",
    waTotal: "💰 *Ընդհանուր՝",
  },
  ru: {
    cartTitle: "Корзина",
    itemsCount: (count: number) => `${count} товаров`,
    clearCart: "Очистить корзину",
    emptyTitle: "Ваша корзина пуста",
    emptyDesc: "Добавьте товары из каталога, чтобы оформить заказ.",
    totalLabel: "Итоговая сумма:",
    checkoutBtn: "Отправить заказ в WhatsApp",
    waHeader: "🛒 *Новый Заказ из Shav Design*\n-----------------------------\n",
    waQty: "Количество:",
    waPrice: "Цена:",
    waTotal: "💰 *Итого:",
  },
  en: {
    cartTitle: "Shopping Cart",
    itemsCount: (count: number) => `${count} items`,
    clearCart: "Clear Cart",
    emptyTitle: "Your cart is empty",
    emptyDesc: "Add items from the catalog to place an order.",
    totalLabel: "Total Amount:",
    checkoutBtn: "Send Order via WhatsApp",
    waHeader: "🛒 *New Order from Shav Design*\n-----------------------------\n",
    waQty: "Quantity:",
    waPrice: "Price:",
    waTotal: "💰 *Total:",
  },
};

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { lang } = useLanguage();
  const t = drawerTranslations[lang as keyof typeof drawerTranslations] || drawerTranslations.hy;

  if (!isCartOpen) return null;

  // WhatsApp Order message generation
  const handleOrderWhatsApp = () => {
    let message = t.waHeader;
    cart.forEach((item: CartItem, index: number) => {
      const itemTitle =
        (lang === "ru" && item.title_ru) ||
        (lang === "en" && item.title_en) ||
        item.title_hy ||
        item.title ||
        "";

      message += `${index + 1}. *${itemTitle}*\n   ${t.waQty} ${item.quantity}\n   ${t.waPrice} ${(item.price * item.quantity).toLocaleString()} ֏\n\n`;
    });
    message += `-----------------------------\n${t.waTotal} ${totalPrice.toLocaleString()} ֏*`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/37494083089?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={() => setIsCartOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-100 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="font-black text-slate-900 text-base leading-none">{t.cartTitle}</h2>
                <span className="text-[11px] font-semibold text-slate-400">
                  {t.itemsCount(cart.length)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title={t.clearCart}
                  aria-label={t.clearCart}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors active:scale-95 cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart List */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3.5">
            {cart.length === 0 ? (
              <div className="text-center py-20 sm:py-24 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-bold text-slate-800 text-sm">{t.emptyTitle}</p>
                <p className="text-xs text-slate-400 mt-1 max-w-[220px] leading-relaxed">
                  {t.emptyDesc}
                </p>
              </div>
            ) : (
              cart.map((item: CartItem) => {
                const itemTitle =
                  (lang === "ru" && item.title_ru) ||
                  (lang === "en" && item.title_en) ||
                  item.title_hy ||
                  item.title ||
                  "";

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-slate-50/80 border border-slate-100 rounded-2xl hover:border-slate-200 transition-colors"
                  >
                    {/* Image */}
                    <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-slate-200/80">
                      <Image
                        src={item.image || "/logo.png"}
                        alt={itemTitle || "Product"}
                        fill
                        unoptimized
                        sizes="64px"
                        className="object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/logo.png";
                        }}
                      />
                    </div>

                    {/* Info & Quantity */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {itemTitle}
                      </h4>
                      <p className="text-xs font-black text-slate-900 mt-0.5">
                        {(item.price * item.quantity).toLocaleString()} ֏
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center bg-white border border-slate-200 rounded-lg px-1 py-0.5 shadow-xs">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer active:scale-90"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 px-2 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer active:scale-90"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer active:scale-95"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-semibold">{t.totalLabel}</span>
                <span className="text-lg sm:text-xl font-black text-slate-900">
                  {totalPrice.toLocaleString()} ֏
                </span>
              </div>

              <button
                onClick={handleOrderWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#0f2e24] hover:bg-emerald-800 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.checkoutBtn}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}