"use client";

import { useRouter } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ProductsCatalogue from "@/components/sections/ProductsCatalogue";

export default function ProductsPage() {
  const router = useRouter();

  const handleFooterLinkClick = (sectionId: string) => {
    if (sectionId === "products") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "home") {
      router.push("/");
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <>
      <Navigation />
      
      <main style={{ minHeight: "100vh", backgroundColor: "#FFFFFF", paddingTop: "75px" }}>
        <ProductsCatalogue />
      </main>

      <Footer onLinkClick={handleFooterLinkClick} />
    </>
  );
}
