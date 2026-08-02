"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import styles from "./Navigation.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface NavigationProps {
  activeSection?: string;
  onLinkClick?: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onLinkClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cartTotalItems, setIsCartOpen } = useCart();

  const isLinkActive = (target: string) => {
    if (pathname.startsWith("/products") && target === "products") return true;
    if (target === "why-azaro" && (activeSection === "why-azaro" || activeSection === "about" || activeSection === "certifications")) {
      return true;
    }
    return activeSection === target;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", target: "home", href: "/" },
    { label: "Collections", target: "collections", href: "/#collections" },
    { label: "Products", target: "products", href: "/products" },
    { label: "Why AZARO", target: "why-azaro", href: "/#why-azaro" },
    { label: "Contact", target: "contact", href: "/#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    setIsMobileOpen(false);

    if (pathname.startsWith("/products") && target === "products") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pathname === "/") {
      if (target === "products") return; // Let Next.js route to /products
      e.preventDefault();
      
      if (onLinkClick) {
        onLinkClick(target);
      } else {
        if (target === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const el = document.getElementById(target);
        if (el) {
          const headerOffset = 75;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileOpen(false);
    
    if (pathname === "/") {
      e.preventDefault();
      if (onLinkClick) {
        onLinkClick("home");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link href="/" onClick={handleLogoClick}>
            <img src="/azaro-logo-red.png" alt="AZARO Logo" className={styles.logoImage} />
          </Link>
        </div>

        <nav>
          <ul className={styles.menuList}>
            {navLinks.map((link) => (
              <li key={link.target}>
                <Link
                  href={link.href}
                  className={`${styles.menuLink} ${
                    isLinkActive(link.target) ? styles.activeLink : ""
                  }`}
                  onClick={(e) => handleNavClick(e, link.target)}
                  prefetch={false}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button 
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingCart size={20} />
            {cartTotalItems > 0 && (
              <span className={styles.cartBadge}>{cartTotalItems}</span>
            )}
          </button>
        </div>

        <div className={styles.mobileActions}>
          <button 
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingCart size={20} />
            {cartTotalItems > 0 && (
              <span className={styles.cartBadge}>{cartTotalItems}</span>
            )}
          </button>
          
          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`${styles.sidebar} ${isMobileOpen ? styles.sidebarOpen : ""}`}>
        <ul className={styles.sidebarList}>
          {navLinks.map((link) => (
            <li key={link.target}>
              <Link
                href={link.href}
                className={`${styles.sidebarLink} ${
                  isLinkActive(link.target) ? styles.activeLink : ""
                }`}
                onClick={(e) => handleNavClick(e, link.target)}
                prefetch={false}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.sidebarActions}>
          <Link 
            href="/#contact" 
            className={styles.sidebarQuoteBtn}
            style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}
            onClick={(e) => handleNavClick(e, "contact")}
            prefetch={false}
          >
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
