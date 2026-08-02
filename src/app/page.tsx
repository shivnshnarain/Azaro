"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const ProductCategories = dynamic(() => import("@/components/sections/ProductCategories"));
const ProductsCatalogue = dynamic(() => import("@/components/sections/ProductsCatalogue"));
const WhyAzaro = dynamic(() => import("@/components/sections/WhyAzaro"));
const About = dynamic(() => import("@/components/sections/About"));
const Certifications = dynamic(() => import("@/components/sections/Certifications"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [enquirySubject, setEnquirySubject] = useState("");
  const router = useRouter();

  // Handle smooth scroll navigation click
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === "products") {
      router.push("/products");
      return;
    }

    setActiveSection(sectionId);
    
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 75; // height of the fixed navbar
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleFeaturedEnquiry = (subject: string) => {
    setEnquirySubject(subject);
    handleScrollToSection("contact");
  };

  useEffect(() => {
    const sections = [
      "home",
      "collections",
      "products",
      "why-azaro",
      "about",
      "certifications",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in main view area
      threshold: 0,
    };

    let activeSet = new Set<string>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      let changed = false;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSet.add(entry.target.id);
          changed = true;
        } else {
          activeSet.delete(entry.target.id);
          changed = true;
        }
      });

      if (changed) {
        // Find the lowest section in the DOM that is currently intersecting
        for (let i = sections.length - 1; i >= 0; i--) {
          if (activeSet.has(sections[i])) {
            // Force home if we are near the top, otherwise use the lowest intersecting section
            if (window.scrollY < window.innerHeight * 0.3 && sections[i] === "collections") {
              setActiveSection("home");
            } else {
              setActiveSection(sections[i]);
            }
            return;
          }
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Force home active when scrolled to the very top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if there's a hash in the URL on mount and scroll to it
  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const headerOffset = 75;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Navigation activeSection={activeSection} onLinkClick={handleScrollToSection} />

      <main style={{ minHeight: "100vh" }}>
        <Hero
          onExploreClick={() => router.push("/products")}
          onRequestCatalogueClick={() => {
            const link = document.createElement("a");
            link.href = "/AZARO_Catalogue.pdf";
            link.download = "AZARO_Catalogue.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        />

        <div style={{ position: "relative", zIndex: 10, backgroundColor: "#FFFFFF" }}>
          <ProductCategories onCategorySelect={(id) => router.push("/products")} />
          <WhyAzaro />
          <About />
          <Certifications />
          <Contact enquirySubject={enquirySubject} />
        </div>
      </main>

      <Footer onLinkClick={handleScrollToSection} />
    </>
  );
}
