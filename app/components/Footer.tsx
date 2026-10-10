"use client";

import Image from "next/image";
import { Phone, MapPin, Truck, MessageCircle, Send, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const footerTranslations = {
  hy: {
    desc: "Դիզայնի, տոնական ձևավորման և փաթեթավորման պարագաների մասնագիտացված խանութ-սրահ։",
    badge: "Մեծածախ & Մանրածախ",
    contactsTitle: "Կոնտակտներ",
    address: "ք. Երևան, «Փեթակ» տոնավաճառ, ա/կ 101-105 սեղաններ",
    mapBtn: "📍 Բացել 2GIS քարտեզում",
    delivery: "Առաքում բոլոր ուղղություններով (վճարովի)",
    socialTitle: "Սոցիալական Ցանցեր և Կապ",
    rights: "Բոլոր իրավունքները պաշտպանված են:",
    devBy: "Designed & Developed by",
  },
  ru: {
    desc: "Специализированный салон-магазин товаров для дизайна, праздничного декора и упаковки.",
    badge: "Опт и Розница",
    contactsTitle: "Контакты",
    address: "г. Ереван, ТЦ «Петак», пав. 101-105",
    mapBtn: "📍 Открыть в 2GIS",
    delivery: "Платная доставка по всем направлениям",
    socialTitle: "Социальные сети и Связь",
    rights: "Все права защищены.",
    devBy: "Designed & Developed by",
  },
  en: {
    desc: "Specialized store offering supplies for creative design, festive decoration, and gift packaging.",
    badge: "Wholesale & Retail",
    contactsTitle: "Contacts",
    address: "Yerevan, Petak Fair, tables 101-105",
    mapBtn: "📍 Open in 2GIS Map",
    delivery: "Delivery to all destinations (paid)",
    socialTitle: "Social Media & Messaging",
    rights: "All rights reserved.",
    devBy: "Designed & Developed by",
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = footerTranslations[lang as keyof typeof footerTranslations] || footerTranslations.hy;

  return (
    <footer className="bg-[#0f2e24] text-white mt-16 pt-12 pb-8 px-4 border-t border-emerald-950">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 border-b border-emerald-900/60">
        
        {/* Info & Logo */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-emerald-700/60 shadow-xs shrink-0 bg-white">
              <Image
                src="/logo.png"
                alt="Shav Design Logo"
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </div>
            <h3 className="font-black text-lg tracking-wider">SHAV DESIGN</h3>
          </div>
          <p className="text-xs text-emerald-100/70 leading-relaxed mb-4">
            {t.desc}
          </p>
          <span className="inline-block text-xs font-semibold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/80">
            {t.badge}
          </span>
        </div>

        {/* Contacts & 2GIS */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400 mb-3">
            {t.contactsTitle}
          </h4>
          <ul className="space-y-2.5 text-xs text-emerald-100/80">
            <li>
              <a 
                href="tel:094083089" 
                className="flex items-center gap-2 hover:text-emerald-300 font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>094 08 30 89</span>
              </a>
            </li>

            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span>{t.address}</span>
                <div className="mt-1">
                  <a
                    href="https://2gis.am/ru/yerevan/firm/70000001111109804?m=44.507093%2C40.163224%2F17.89"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8dc63f] hover:text-[#a3dc54] transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 active:scale-95"
                  >
                    <span>{t.mapBtn}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </li>

            <li className="flex items-center gap-2 text-emerald-200/60 pt-1">
              <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{t.delivery}</span>
            </li>
          </ul>
        </div>

        {/* Social Networks & Messengers */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400 mb-3">
            {t.socialTitle}
          </h4>
          <div className="flex flex-wrap gap-2">
            
            {/* Instagram */}
            <a
              href="https://www.instagram.com/shavdesign/"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-medium border border-white/5 active:scale-95"
            >
              <svg 
                className="w-3.5 h-3.5 text-pink-400 fill-none stroke-current stroke-2" 
                viewBox="0 0 24 24" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@shav.design8?_r=1&_t=ZS-99KzOXibl1V"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-medium border border-white/5 active:scale-95"
            >
              <span className="font-black text-[10px] bg-white text-slate-950 px-1 rounded-xs">TT</span>
              <span>TikTok</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/37494083089"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-900/50 hover:bg-emerald-900/80 text-emerald-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-medium border border-emerald-700/50 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/+37494083089"
              target="_blank"
              rel="noreferrer"
              className="bg-sky-950/50 hover:bg-sky-900/80 text-sky-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-medium border border-sky-800/50 active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram</span>
            </a>

            {/* Viber */}
            <a
              href="viber://chat?number=%2B37494083089"
              className="bg-purple-950/50 hover:bg-purple-900/80 text-purple-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-medium border border-purple-800/50 active:scale-95"
            >
              <span className="text-purple-300 font-black text-[11px] bg-purple-900/80 px-1.5 py-0.5 rounded-full">V</span>
              <span>Viber</span>
            </a>

          </div>
        </div>

      </div>

      {/* Copyright & ArmCoding Signature */}
      <div className="pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-100/50">
        <p>© 2026 Shav Design. {t.rights}</p>

        <p className="flex items-center gap-1.5 font-medium">
          <span>{t.devBy}</span>
          <a
            href="https://armcoding.am"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-white hover:text-emerald-400 transition-colors underline underline-offset-2"
          >
            ArmCoding
          </a>
        </p>
      </div>
    </footer>
  );
}