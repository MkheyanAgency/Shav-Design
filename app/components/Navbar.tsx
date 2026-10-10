"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, ShoppingBag, Globe } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsCartOpen, totalCount } = useCart();
  const { lang, changeLanguage } = useLanguage();

  const navLabels = {
    hy: {
      home: "Գլխավոր",
      catalog: "Տեսականի",
      about: "Մեր մասին",
      contacts: "Կապ",
    },
    ru: {
      home: "Главная",
      catalog: "Каталог",
      about: "О нас",
      contacts: "Контакты",
    },
    en: {
      home: "Home",
      catalog: "Catalog",
      about: "About",
      contacts: "Contact",
    },
  };

  const t = navLabels[lang as keyof typeof navLabels] || navLabels.hy;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm text-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="Shav Design Logo"
            width={40}
            height={40}
            priority
            sizes="40px"
            style={{ width: "auto", height: "auto" }}
            className="rounded-full object-cover border border-slate-200 group-hover:scale-105 transition duration-200"
          />
          <span className="font-black text-base sm:text-lg tracking-wider text-slate-900">
            SHAV <span className="text-emerald-700">DESIGN</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-emerald-700 transition duration-150">
            {t.home}
          </Link>
          <Link href="/catalog" className="hover:text-emerald-700 transition duration-150">
            {t.catalog}
          </Link>
          <Link href="/about" className="hover:text-emerald-700 transition duration-150">
            {t.about}
          </Link>
          <Link href="/contacts" className="hover:text-emerald-700 transition duration-150">
            {t.contacts}
          </Link>
        </nav>

        {/* Actions (Language Switcher, Cart & Contact) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1 hidden sm:inline" />
            {(["hy", "ru", "en"] as const).map((item) => (
              <button
                key={item}
                onClick={() => changeLanguage(item)}
                className={`px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all uppercase cursor-pointer ${
                  lang === item
                    ? "bg-white text-emerald-950 shadow-xs font-black"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 transition active:scale-95 cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 text-slate-700" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-700 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {totalCount}
              </span>
            )}
          </button>

          {/* Contact button */}
          <a
            href="tel:094083089"
            className="hidden sm:flex items-center gap-2 bg-[#0f2e24] hover:bg-emerald-800 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition shadow-xs active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>094 08 30 89</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-3 text-sm text-slate-700 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-1.5 hover:text-emerald-700 font-semibold transition"
          >
            {t.home}
          </Link>
          <Link
            href="/catalog"
            onClick={() => setIsOpen(false)}
            className="block py-1.5 hover:text-emerald-700 font-semibold transition"
          >
            {t.catalog}
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block py-1.5 hover:text-emerald-700 font-semibold transition"
          >
            {t.about}
          </Link>
          <Link
            href="/contacts"
            onClick={() => setIsOpen(false)}
            className="block py-1.5 hover:text-emerald-700 font-semibold transition"
          >
            {t.contacts}
          </Link>

          <a
            href="tel:094083089"
            className="flex items-center justify-center gap-2 bg-[#0f2e24] text-white text-xs font-semibold py-3 rounded-xl mt-3 shadow-xs active:scale-95"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>094 08 30 89</span>
          </a>
        </div>
      )}
    </header>
  );
}