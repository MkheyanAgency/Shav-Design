"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "../context/ProductsContext";
import { CATEGORIES } from "../data/products";
import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Lock, 
  ArrowLeft, 
  UploadCloud, 
  X, 
  ShieldCheck, 
  Loader2, 
  Globe, 
  CheckCircle2 
} from "lucide-react";

export default function AdminPage() {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("hy"); // "hy" | "ru" | "en"

  const [formData, setFormData] = useState({
    // Multilingual Titles
    title_hy: "",
    title_ru: "",
    title_en: "",
    // Multilingual Descriptions
    desc_hy: "",
    desc_ru: "",
    desc_en: "",
    // Multilingual Badges
    badge_hy: "",
    badge_ru: "",
    badge_en: "",
    // Multilingual Min Order
    minOrder_hy: "",
    minOrder_ru: "",
    minOrder_en: "",
    // Common
    category: "boxes",
    price: "",
    image: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "shav2026";
    if (password === adminPass) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Սխալ գաղտնաբառ");
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setActiveTab("hy");
    setFormData({
      title_hy: "",
      title_ru: "",
      title_en: "",
      desc_hy: "",
      desc_ru: "",
      desc_en: "",
      badge_hy: "",
      badge_ru: "",
      badge_en: "",
      minOrder_hy: "",
      minOrder_ru: "",
      minOrder_en: "",
      category: "boxes",
      price: "",
      image: "",
    });
    setUploadingImg(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingId(p.id);
    setActiveTab("hy");
    setFormData({
      // Load multilingual or fallback to single string
      title_hy: p.title_hy || p.title || "",
      title_ru: p.title_ru || p.title || "",
      title_en: p.title_en || p.title || "",
      desc_hy: p.desc_hy || p.desc || "",
      desc_ru: p.desc_ru || p.desc || "",
      desc_en: p.desc_en || p.desc || "",
      badge_hy: p.badge_hy || p.badge || "",
      badge_ru: p.badge_ru || p.badge || "",
      badge_en: p.badge_en || p.badge || "",
      minOrder_hy: p.minOrder_hy || p.minOrder || "",
      minOrder_ru: p.minOrder_ru || p.minOrder || "",
      minOrder_en: p.minOrder_en || p.minOrder || "",
      category: p.category || "boxes",
      price: p.price || "",
      image: p.image || "",
    });
    setUploadingImg(false);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImg(true);
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const storageRef = ref(storage, `products/${Date.now()}_${cleanFileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error("Upload error details:", err);
      alert("Նկարի վերբեռնման սխալ: Տեղադրեք նկարի պատրաստի URL հղումը:");
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title_hy?.trim()) {
      setActiveTab("hy");
      alert("Խնդրում ենք լրացնել հայերեն անվանումը:");
      return;
    }

    try {
      setIsSubmitting(true);
      const productPayload = {
        // Fallback title / desc / badge for backward compatibility
        title: formData.title_hy.trim(),
        desc: formData.desc_hy?.trim() || "",
        badge: formData.badge_hy?.trim() || "",
        minOrder: formData.minOrder_hy?.trim() || "",

        // Multilingual fields
        title_hy: formData.title_hy.trim(),
        title_ru: formData.title_ru?.trim() || formData.title_hy.trim(),
        title_en: formData.title_en?.trim() || formData.title_hy.trim(),

        desc_hy: formData.desc_hy?.trim() || "",
        desc_ru: formData.desc_ru?.trim() || formData.desc_hy?.trim() || "",
        desc_en: formData.desc_en?.trim() || formData.desc_hy?.trim() || "",

        badge_hy: formData.badge_hy?.trim() || "",
        badge_ru: formData.badge_ru?.trim() || formData.badge_hy?.trim() || "",
        badge_en: formData.badge_en?.trim() || formData.badge_hy?.trim() || "",

        minOrder_hy: formData.minOrder_hy?.trim() || "",
        minOrder_ru: formData.minOrder_ru?.trim() || formData.minOrder_hy?.trim() || "",
        minOrder_en: formData.minOrder_en?.trim() || formData.minOrder_hy?.trim() || "",

        category: formData.category,
        price: Number(formData.price) || 0,
        image: formData.image?.trim() || "/logo.png",
        inStock: true,
      };

      if (editingId) {
        await updateProduct(editingId, productPayload);
      } else {
        await addProduct(productPayload);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Ապրանքը պահպանելիս սխալ տեղի ունեցավ:");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-emerald-100">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-sm w-full text-center">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xs">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black text-slate-900">Մուտք Ադմին Վահանակ</h1>
          <p className="text-xs text-slate-400 mt-1 mb-6">Մուտքագրեք գաղտնաբառը</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Գաղտնաբառ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center font-medium focus:outline-none focus:border-emerald-600 transition shadow-2xs"
            />
            {error && <p className="text-xs font-semibold text-rose-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#0f2e24] hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl transition shadow active:scale-95 cursor-pointer"
            >
              Մուտք Գործել
            </button>
          </form>

          <Link href="/" className="inline-block text-xs text-slate-400 hover:text-slate-700 mt-6">
            ← Վերադառնալ Գլխավոր Էջ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-black text-slate-900 text-base flex items-center gap-1.5">
                Firebase Dashboard <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </h1>
              <p className="text-[10px] text-slate-400">Բազմալեզու Ապրանքների Կառավարում (HY / RU / EN)</p>
            </div>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 bg-[#0f2e24] hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            Ավելացնել Ապրանք
          </button>
        </div>
      </header>

      {/* Table */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-bold text-sm text-slate-900">
              Ապրանքներ ({products.length})
            </h2>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center items-center gap-2 text-slate-400 text-xs font-semibold">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-700" /> Բեռնվում է Firestore-ից...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Նկար</th>
                    <th className="py-3 px-4">Անվանում (HY / RU / EN)</th>
                    <th className="py-3 px-4">Կատեգորիա</th>
                    <th className="py-3 px-4">Գին</th>
                    <th className="py-3 px-4">Պիտակ</th>
                    <th className="py-3 px-4 text-right">Գործողություններ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image
                            src={p.image || "/logo.png"}
                            alt={p.title_hy || p.title || "Product"}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 max-w-[280px]">
                        <div>{p.title_hy || p.title}</div>
                        {(p.title_ru || p.title_en) && (
                          <div className="text-[10px] text-slate-400 font-normal mt-0.5 space-x-2">
                            {p.title_ru && <span>RU: {p.title_ru}</span>}
                            {p.title_en && <span>EN: {p.title_en}</span>}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[10px] font-semibold">
                          {CATEGORIES.find((c) => c.id === p.category)?.name || p.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-slate-900">
                        {p.price > 0 ? `${Number(p.price).toLocaleString()} ֏` : "Պայմանագրային"}
                      </td>
                      <td className="py-3 px-4">
                        {p.badge_hy || p.badge ? (
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                            {p.badge_hy || p.badge}
                          </span>
                        ) : "—"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
                            title="Խմբագրել"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Իսկապե՞ս ջնջել «${p.title_hy || p.title}» ապրանքը Firestore-ից:`)) {
                                await deleteProduct(p.id);
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                            title="Ջնջել"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Multilingual Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 p-6 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-4">
              {editingId ? "Խմբագրել Ապրանքը" : "Ավելացնել Նոր Ապրանք"}
            </h3>

            {/* Language Tabs Selector */}
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl mb-4 border border-slate-200/60">
              {[
                { id: "hy", label: "🇦🇲 Հայերեն (Գլխավոր)" },
                { id: "ru", label: "🇷🇺 Русский" },
                { id: "en", label: "🇬🇧 English" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#0f2e24] text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Tab 1: Armenian Fields */}
              {activeTab === "hy" && (
                <div className="space-y-3 p-4 bg-slate-50/70 border border-slate-200/70 rounded-2xl animate-in fade-in duration-150">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      Անվանում (Հայերեն) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Օր․՝ Նվերի Պրեմիում Տուփ"
                      value={formData.title_hy}
                      onChange={(e) => setFormData({ ...formData, title_hy: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 shadow-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Պիտակ (Badge)</label>
                      <input
                        type="text"
                        placeholder="Օր․՝ Հիթ, Նորույթ"
                        value={formData.badge_hy}
                        onChange={(e) => setFormData({ ...formData, badge_hy: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Նվազագույն պատվեր</label>
                      <input
                        type="text"
                        placeholder="Օր․՝ 1 հատից"
                        value={formData.minOrder_hy}
                        onChange={(e) => setFormData({ ...formData, minOrder_hy: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Նկարագրություն (Հայերեն)</label>
                    <textarea
                      rows={2}
                      placeholder="Ապրանքի հայերեն նկարագրությունը..."
                      value={formData.desc_hy}
                      onChange={(e) => setFormData({ ...formData, desc_hy: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 resize-none shadow-2xs"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Russian Fields */}
              {activeTab === "ru" && (
                <div className="space-y-3 p-4 bg-slate-50/70 border border-slate-200/70 rounded-2xl animate-in fade-in duration-150">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      Название (Русский)
                    </label>
                    <input
                      type="text"
                      placeholder="Например: Подарочная коробка Premium"
                      value={formData.title_ru}
                      onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 shadow-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Бейдж (Badge)</label>
                      <input
                        type="text"
                        placeholder="Хит, Новинка"
                        value={formData.badge_ru}
                        onChange={(e) => setFormData({ ...formData, badge_ru: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Мин. заказ</label>
                      <input
                        type="text"
                        placeholder="от 1 шт."
                        value={formData.minOrder_ru}
                        onChange={(e) => setFormData({ ...formData, minOrder_ru: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Описание (Русский)</label>
                    <textarea
                      rows={2}
                      placeholder="Описание товара на русском..."
                      value={formData.desc_ru}
                      onChange={(e) => setFormData({ ...formData, desc_ru: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 resize-none shadow-2xs"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: English Fields */}
              {activeTab === "en" && (
                <div className="space-y-3 p-4 bg-slate-50/70 border border-slate-200/70 rounded-2xl animate-in fade-in duration-150">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Premium Gift Box"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 shadow-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Badge</label>
                      <input
                        type="text"
                        placeholder="Hit, New"
                        value={formData.badge_en}
                        onChange={(e) => setFormData({ ...formData, badge_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Min. Order</label>
                      <input
                        type="text"
                        placeholder="From 1 pc"
                        value={formData.minOrder_en}
                        onChange={(e) => setFormData({ ...formData, minOrder_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Description (English)</label>
                    <textarea
                      rows={2}
                      placeholder="Product description in English..."
                      value={formData.desc_en}
                      onChange={(e) => setFormData({ ...formData, desc_en: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 resize-none shadow-2xs"
                    />
                  </div>
                </div>
              )}

              {/* General Settings (Category & Price) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Կատեգորիա *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold cursor-pointer shadow-2xs"
                  >
                    <option value="boxes">Տուփեր և Փաթեթներ</option>
                    <option value="ribbons">Ժապավեններ և Թղթեր</option>
                    <option value="decor">Տոնական Դեկոր</option>
                    <option value="florist">Ֆլորիստիկա</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Գին (֏) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 font-bold shadow-2xs"
                  />
                </div>
              </div>

              {/* Image Section */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Ապրանքի Նկար</label>
                <div className="space-y-2">
                  <label className="cursor-pointer bg-slate-50 border border-dashed border-slate-300 hover:border-emerald-600 rounded-xl p-3 flex items-center justify-center gap-2 text-slate-600 transition">
                    {uploadingImg ? (
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                    ) : (
                      <UploadCloud className="w-4 h-4 text-emerald-700" />
                    )}
                    <span className="text-[11px] font-semibold">
                      {uploadingImg ? "Վերբեռնվում է..." : "Ընտրել նկար ֆայլերից (Firebase Storage)"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>

                  <input
                    type="text"
                    placeholder="Կամ տեղադրեք ցանկացած կայքի ուղիղ URL հղում (https://...)"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 text-[11px] shadow-2xs"
                  />
                </div>

                {formData.image && (
                  <div className="mt-2 flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-300 bg-white">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/logo.png";
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 truncate">{formData.image}</span>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={uploadingImg || isSubmitting}
                  className="w-full bg-[#0f2e24] hover:bg-emerald-800 disabled:bg-slate-400 text-white font-bold text-xs py-3.5 rounded-xl transition shadow active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? "Պահպանել Փոփոխությունները" : "Ավելացնել Firestore-ում"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </main>
  );
}