"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { Award, HeartHandshake, Truck, Sparkles, ShoppingBag } from "lucide-react";
import Link from "next/link";

const translations = {
  hy: {
    badge: "Մեր Պատմությունը",
    title: "SHAV",
    titleAccent: "DESIGN",
    subtitle: "Տոնական տրամադրություն, որակյալ փաթեթավորում և դիզայներական լուծումներ",
    p1: "«Shav Design»-ը մասնագիտացված խանութ-սրահ է, որտեղ ներկայացված է դիզայնի, տոնական ձևավորման և փաթեթավորման պարագաների լայն տեսականի։",
    p2: "Մենք առաջարկում ենք ինչպես մանրածախ վաճառք բոլոր նրանց համար, ովքեր ցանկանում են գեղեցիկ փաթեթավորել իրենց նվերները կամ ձևավորել իրենց միջոցառումները, այնպես էլ մեծածախ շահավետ պայմաններ ծաղկի սրահների, event-կազմակերպիչների և խանութների համար։",
    adv1Title: "Բարձր Որակ",
    adv1Desc: "Ներմուծված և խնամքով ընտրված պրեմիում տեսականի։",
    adv2Title: "Մեծածախ & Մանրածախ",
    adv2Desc: "Ճկուն գնացուցակ ինչպես անհատների, այնպես էլ բիզնեսի համար։",
    adv3Title: "Առաքման Ծառայություն",
    adv3Desc: "Առաքում Երևանում և դեպի ՀՀ բոլոր մարզեր (վճարովի)։",
    adv4Title: "Մշտապես Թարմ Ընտրանի",
    adv4Desc: "Պարբերաբար թարմացվող և թրենդային տեսականի։",
    ctaTitle: "Ծանոթացե՛ք մեր ապրանքատեսականուն",
    ctaSubtitle: "Տեսեք տուփերի, ժապավենների և դեկորների ամբողջ կատալոգը։",
    ctaBtn: "Դիտել Տեսականին",
  },
  ru: {
    badge: "Наша История",
    title: "SHAV",
    titleAccent: "DESIGN",
    subtitle: "Праздничное настроение, качественная упаковка и дизайнерские решения",
    p1: "«Shav Design» — специализированный салон-магазин, предлагающий широкий ассортимент материалов для дизайна, праздничного декора и упаковки.",
    p2: "Мы предлагаем как розничные продажи для тех, кто хочет красиво оформить подарки или мероприятия, так и выгодные оптовые условия для цветочных салонов, организаторов мероприятий и магазинов.",
    adv1Title: "Высокое Качество",
    adv1Desc: "Импортный и тщательно отобранный премиум ассортимент.",
    adv2Title: "Опт и Розница",
    adv2Desc: "Гибкая ценовая политика как для частных клиентов, так и для бизнеса.",
    adv3Title: "Служба Доставки",
    adv3Desc: "Доставка по Еревану и во все регионы Армении.",
    adv4Title: "Постоянное Обновление",
    adv4Desc: "Регулярно обновляемый и трендовый каталог товаров.",
    ctaTitle: "Ознакомьтесь с нашим каталогом",
    ctaSubtitle: "Посмотрите весь ассортимент коробок, лент и декора.",
    ctaBtn: "В Каталог",
  },
  en: {
    badge: "Our Story",
    title: "SHAV",
    titleAccent: "DESIGN",
    subtitle: "Festive mood, premium packaging, and creative design solutions",
    p1: "“Shav Design” is a specialized store offering a wide selection of supplies for design, festive decorations, and gift packaging.",
    p2: "We provide retail shopping for personal events and gifts, as well as wholesale terms for flower boutiques, event planners, and retail stores.",
    adv1Title: "Premium Quality",
    adv1Desc: "Carefully curated and imported high-grade materials.",
    adv2Title: "Wholesale & Retail",
    adv2Desc: "Flexible pricing models tailored for both individuals and businesses.",
    adv3Title: "Delivery Service",
    adv3Desc: "Fast delivery across Yerevan and all regions of Armenia.",
    adv4Title: "Trendy Collections",
    adv4Desc: "Constantly updated catalog reflecting the latest decorative trends.",
    ctaTitle: "Explore Our Full Catalog",
    ctaSubtitle: "Discover our full selection of boxes, ribbons, and event decorations.",
    ctaBtn: "View Catalog",
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.hy;

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-950">
      <Navbar/>

      <main className="max-w-5xl w-full mx-auto px-4 py-12 flex-1 animate-in fade-in duration-300">
        
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-12 animate-in fade-in zoom-in-95 duration-500">
          <span className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100 shadow-2xs">
            {t.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            {t.title} <span className="text-emerald-700">{t.titleAccent}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Main Content Box */}
        <div className="border border-slate-200/80 rounded-3xl p-6 sm:p-10 bg-white shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-base text-slate-900 font-medium leading-relaxed">
            <strong>«Shav Design»</strong> — {t.p1.replace(/^«Shav Design»\s*—?\s*/, "")}
          </p>

          <p className="text-slate-600 leading-relaxed">
            {t.p2}
          </p>

          {/* Advantages Grid */}
          <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-sm transition-all duration-300 group">
              <div className="p-2 bg-white rounded-xl shadow-2xs group-hover:scale-110 transition-transform duration-300">
                <Award className="w-5 h-5 text-emerald-700 shrink-0"/>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">{t.adv1Title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{t.adv1Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-sm transition-all duration-300 group">
              <div className="p-2 bg-white rounded-xl shadow-2xs group-hover:scale-110 transition-transform duration-300">
                <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0"/>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">{t.adv2Title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{t.adv2Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-sm transition-all duration-300 group">
              <div className="p-2 bg-white rounded-xl shadow-2xs group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-5 h-5 text-emerald-700 shrink-0"/>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">{t.adv3Title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{t.adv3Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-sm transition-all duration-300 group">
              <div className="p-2 bg-white rounded-xl shadow-2xs group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-emerald-700 shrink-0"/>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">{t.adv4Title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{t.adv4Desc}</p>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 hover:shadow-2xs transition-all duration-200">
            <div>
              <p className="font-bold text-slate-900 text-xs">{t.ctaTitle}</p>
              <p className="text-[11px] text-slate-600 mt-0.5">{t.ctaSubtitle}</p>
            </div>
            <Link className="inline-flex items-center gap-1.5 bg-[#0f2e24] hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-2xs whitespace-nowrap active:scale-95" href="/catalog">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400"/>
              {t.ctaBtn}
            </Link>
          </div>

        </div>

      </main>

      <Footer/>
    </div>
  );
}