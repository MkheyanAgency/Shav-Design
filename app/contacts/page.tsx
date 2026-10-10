"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { Phone, MapPin, Truck, MessageCircle, Send, ExternalLink, Clock } from "lucide-react";

const contactsTranslations = {
  hy: {
    badge: "Հետադարձ Կապ",
    title: "Ինչպե՞ս Գտնել Մեզ",
    subtitle: "Այցելեք մեր տաղավար «Փեթակ» տոնավաճառում կամ կապ հաստատեք հարմար տարբերակով",
    infoTitle: "Կոնտակտային Տվյալներ",
    addressLabel: "Հասցե",
    addressVal: "ք. Երևան, «Փեթակ» տոնավաճառ, ա/կ 101-105 սեղաններ",
    phoneLabel: "Հեռախոսահամար",
    deliveryLabel: "Առաքում",
    deliveryVal: "Առաքում Երևանում և մարզերում (վճարովի)",
    workingHoursLabel: "Աշխատանքային ռեժիմ",
    workingHoursVal: "Ամեն օր՝ 09:00 - 18:00",
    messengersTitle: "Արագ կապ մեսենջերներով",
    mapBadge: "2GIS Քարտեզ",
    mapTitle: "Գտեք մեզ «Փեթակ»-ում",
    mapDesc: "Մեր տաղավարը շատ հեշտ է գտնել 2GIS հավելվածով։ Քարտեզի միջոցով կարող եք կառուցել ճշգրիտ երթուղի դեպի մեր ա/կ 101-105 սեղանները։",
    mapBtn: "Բացել 2GIS քարտեզում",
  },
  ru: {
    badge: "Контакты",
    title: "Как Нас Найти",
    subtitle: "Посетите наш павильон в ТЦ «Петак» или свяжитесь любым удобным способом",
    infoTitle: "Контактные Данные",
    addressLabel: "Адрес",
    addressVal: "г. Ереван, ТЦ «Петак», павильон 101-105",
    phoneLabel: "Номер телефона",
    deliveryLabel: "Доставка",
    deliveryVal: "Платная доставка по Еревану и регионам",
    workingHoursLabel: "График работы",
    workingHoursVal: "Ежедневно: 09:00 - 18:00",
    messengersTitle: "Быстрая связь в мессенджерах",
    mapBadge: "Карта 2GIS",
    mapTitle: "Найдите нас в «Петаке»",
    mapDesc: "Наш павильон легко найти в приложении 2GIS. Вы можете проложить точный маршрут прямо к нашим столам 101-105.",
    mapBtn: "Открыть в 2GIS",
  },
  en: {
    badge: "Contact Us",
    title: "How to Find Us",
    subtitle: "Visit our store at Petak Fair or reach out through your preferred channel",
    infoTitle: "Contact Information",
    addressLabel: "Address",
    addressVal: "Yerevan, Petak Fair, tables 101-105",
    phoneLabel: "Phone Number",
    deliveryLabel: "Delivery",
    deliveryVal: "Paid delivery across Yerevan and all regions",
    workingHoursLabel: "Working Hours",
    workingHoursVal: "Daily: 09:00 - 18:00",
    messengersTitle: "Instant Messaging",
    mapBadge: "2GIS Map",
    mapTitle: "Find Us at Petak",
    mapDesc: "You can easily locate our showroom using the 2GIS map application and navigate directly to tables 101-105.",
    mapBtn: "Open in 2GIS Map",
  },
};

export default function ContactsPage() {
  const { lang } = useLanguage();
  const t = contactsTranslations[lang as keyof typeof contactsTranslations] || contactsTranslations.hy;

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-950">
      <Navbar />

      <main className="max-w-5xl w-full mx-auto px-4 py-12 flex-1 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 animate-in fade-in zoom-in-95 duration-500">
          <span className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100 shadow-xs">
            {t.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Contacts Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Information & Channels Card */}
          <div className="border border-slate-200/80 rounded-3xl p-6 sm:p-8 bg-white shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                {t.infoTitle}
              </h2>

              <div className="space-y-3 text-xs text-slate-600">
                
                {/* Address */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-emerald-50/30 transition">
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-xs mb-0.5">
                      {t.addressLabel}
                    </span>
                    <span>{t.addressVal}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-emerald-50/30 transition">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-xs mb-0.5">
                      {t.phoneLabel}
                    </span>
                    <a href="tel:094083089" className="text-emerald-700 font-bold hover:underline">
                      +374 94 08 30 89
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-emerald-50/30 transition">
                  <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-xs mb-0.5">
                      {t.workingHoursLabel}
                    </span>
                    <span>{t.workingHoursVal}</span>
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-emerald-50/30 transition">
                  <Truck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-xs mb-0.5">
                      {t.deliveryLabel}
                    </span>
                    <span>{t.deliveryVal}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Messengers */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
                {t.messengersTitle}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://wa.me/37494083089"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-950 border border-emerald-200/80 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-100 transition shadow-xs active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://t.me/+37494083089"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-sky-50 text-sky-950 border border-sky-200/80 py-2.5 rounded-xl font-bold text-xs hover:bg-sky-100 transition shadow-xs active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-sky-600" />
                  <span>Telegram</span>
                </a>

                <a
                  href="viber://chat?number=%2B37494083089"
                  className="flex items-center justify-center gap-1.5 bg-purple-50 text-purple-950 border border-purple-200/80 py-2.5 rounded-xl font-bold text-xs hover:bg-purple-100 transition shadow-xs active:scale-95 cursor-pointer"
                >
                  <span className="text-purple-700 font-black text-xs">V</span>
                  <span>Viber</span>
                </a>
              </div>
            </div>
          </div>

          {/* 2GIS Map Visual Card */}
          <div className="border border-slate-800 rounded-3xl p-6 sm:p-8 bg-[#0f2e24] text-white shadow-xl shadow-emerald-950/10 flex flex-col justify-between hover:border-emerald-600/40 transition-all duration-300">
            <div>
              <span className="inline-block bg-[#8dc63f] text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-4 shadow-xs">
                {t.mapBadge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">{t.mapTitle}</h3>
              <p className="text-xs text-emerald-100/70 mt-3 leading-relaxed">
                {t.mapDesc}
              </p>
            </div>

            <div className="pt-8">
              <a
                href="https://2gis.am/ru/yerevan/firm/70000001111109804?m=44.507093%2C40.163224%2F17.89"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#8dc63f] hover:bg-[#9ddb47] text-slate-950 font-bold text-xs py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>📍 {t.mapBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}