"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ProductsCatalogue from "@/components/sections/ProductsCatalogue";

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Support both ?product=id and #id formats
    const productParam = searchParams.get("product");
    const hashTarget = typeof window !== "undefined" ? window.location.hash.replace("#", "") : null;
    
    const targetId = productParam || hashTarget;
    
    if (targetId) {
      // Delay slightly to ensure React has mounted all elements
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          // Optional highlight effect
          const originalTransition = element.style.transition;
          element.style.transition = "box-shadow 0.3s ease";
          element.style.boxShadow = "0 0 0 2px #111827"; 
          
          setTimeout(() => {
            element.style.boxShadow = "";
            setTimeout(() => {
               element.style.transition = originalTransition;
            }, 300);
          }, 1500);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

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

export default function ProductsPageClient() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
