"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./ProductCategories.module.css";
import { CATEGORIES } from "@/data/products";

interface ProductCategoriesProps {
  onCategorySelect: (categoryId: string) => void;
}

export default function ProductCategories({ onCategorySelect }: ProductCategoriesProps) {
  // Render clean vector outline SVGs based on chair category type
  const renderCategorySVG = (categoryId: string) => {
    switch (categoryId) {
      case "executive":
        return (
          <img 
            src="/images/executive-chair-new.png" 
            alt="AZARO Premium Executive Chair" 
            className={styles.productImage} 
           loading="lazy" decoding="async" />
        );
      case "director":
        return (
          <img 
            src="/images/director-chair-new.png" 
            alt="AZARO Premium Director Chair" 
            className={styles.productImage} 
           loading="lazy" decoding="async" />
        );
      case "mesh":
        return (
          <img 
            src="/images/blue-mesh-chair.png" 
            alt="AZARO Premium Mesh Chair" 
            className={styles.productImage} 
           loading="lazy" decoding="async" />
        );
      case "visitor":
        return (
          <img 
            src="/images/visitor-chair-new.png" 
            alt="AZARO Premium Visitor Chair" 
            className={styles.productImage} 
           loading="lazy" decoding="async" />
        );
      case "conference":
        return (
          <img 
            src="/images/cafe-chair-new.png" 
            alt="AZARO Premium Conference Chair" 
            className={styles.productImage} 
           loading="lazy" decoding="async" />
        );
      case "workstation":
        return (
          <img 
            src="/images/workstation-chair-transparent.png" 
            alt="AZARO Premium Workstation Chair" 
            className={styles.productImage} 
           loading="lazy" decoding="async" />
        );
      case "cafe":
        return (
          <img 
            src="/images/conference-chair-new.png" 
            alt="AZARO Premium Cafe Chair" 
            className={styles.productImage} 
           loading="lazy" decoding="async" />
        );
      default:
        return null;
    }
  };

  return (
    <section id="collections" className={styles.categoriesSection} style={{ scrollMarginTop: '80px' }}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.headerText}>
          <p className={styles.tagline}>Product Categories</p>
          <h2 className={styles.title}>
            Tailored Seating <br />
            For Every Workspace.
          </h2>
        </div>

        {/* Category Cards Grid */}
        <div className={styles.grid}>
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              className={styles.card}
              onClick={() => onCategorySelect(cat.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{cat.name}</h3>
                  <div className={styles.accentLine}></div>
                  <p className={styles.cardDesc}>{cat.description}</p>
                </div>

                <div className={styles.arrowButton}>
                  <ArrowUpRight size={20} />
                </div>
              </div>

              {/* Product Image on the Right */}
              <div className={styles.imageWrapper}>
                {renderCategorySVG(cat.id)}
              </div>
            </motion.div>
          ))}

          {/* Premium Promotional Banner (Spans 2 columns) */}
          <motion.div
            className={styles.promoCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            <img 
              src="/images/new_uploaded_showcase.jpg" 
              alt="AZARO Promotional Banner" 
              className={styles.promoImage} 
             loading="lazy" decoding="async" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
