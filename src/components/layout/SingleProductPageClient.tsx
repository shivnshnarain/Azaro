"use client";

import { useRouter } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { PRODUCTS_DATA } from "@/data/productsData";
import { ProductCard, DirectorCard } from "@/components/sections/ProductConfigurator";
import configuratorStyles from "@/components/sections/ProductConfigurator.module.css";

export default function SingleProductPageClient({ product }: { product: any }) {
  const router = useRouter();

  const handleFooterLinkClick = (sectionId: string) => {
    if (sectionId === "products") {
      router.push("/products");
    } else if (sectionId === "home") {
      router.push("/");
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const isMainProduct = PRODUCTS_DATA.some((p) => p.id === product.id);

  return (
    <>
      <Navigation />
      
      <main style={{ minHeight: "100vh", backgroundColor: "#FFFFFF", paddingTop: "75px" }}>
        <section id="products" className={configuratorStyles.configuratorSection} style={{ scrollMarginTop: '80px', paddingTop: '40px' }}>
          {isMainProduct ? (
            <div className={configuratorStyles.productsStack}>
              <ProductCard product={product} />
            </div>
          ) : (
            <div className={configuratorStyles.directorSeriesContainer}>
              <div className={configuratorStyles.directorSeriesGrid}>
                <DirectorCard product={product} />
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer onLinkClick={handleFooterLinkClick} />
    </>
  );
}
