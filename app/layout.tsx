import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { LanguageProvider } from "./context/LanguageContext";
import CartDrawer from "./components/CartDrawer";

export const metadata = {
  title: "Shav Design | Փաթեթավորում և Տոնական Ձևավորում",
  description: "Դիզայնի, տոնական ձևավորման և փաթեթավորման պարագաների մեծածախ & մանրածախ վաճառք:",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hy">
      <body className="bg-white text-slate-900">
        <LanguageProvider>
          <ProductsProvider>
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
          </ProductsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}