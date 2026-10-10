import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFCF7] text-slate-900 font-sans selection:bg-emerald-200">
      <TopBanner />
      <Navbar />
      <Hero />
      <Features />
      <Catalog />
      <Footer />
    </main>
  );
}