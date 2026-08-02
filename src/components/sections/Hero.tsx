"use client";

import styles from "./Hero.module.css";
import {
  ArrowRight,
  Download,
  Armchair,
  ShieldCheck,
  Flag,
  Award,
} from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onRequestCatalogueClick: () => void;
}

export default function Hero({
  onExploreClick,
  onRequestCatalogueClick,
}: HeroProps) {
  return (
    <section id="home" className={styles.hero}>
      {/* Centered Premium Content Overlay */}
      <div className={styles.heroContentBlock}>
        <h1 className={styles.heroHeadline}>
          <span className={styles.headingLine1}>
            <svg width="100%" height="1.2em" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient
                  id="outlineGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#D1001F" />
                  <stop offset="50%" stopColor="#EE6B6E" />
                  <stop offset="100%" stopColor="#F6C5CC" />
                </linearGradient>
                <mask id="textOuterMask">
                  {/* Expanded bounds to prevent stroke clipping at the edges of the first and last letters */}
                  <rect
                    x="-10%"
                    y="-10%"
                    width="120%"
                    height="120%"
                    fill="white"
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="black"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      letterSpacing: "2px",
                      fontWeight: 800,
                    }}
                  >
                    Evaluate Every
                  </text>
                </mask>
              </defs>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="none"
                stroke="url(#outlineGradient)"
                strokeWidth="4" /* 4px total = 2px outer + 2px inner (masked out) */
                strokeLinejoin="round"
                mask="url(#textOuterMask)"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "2px",
                  fontWeight: 800,
                }}
              >
                Evaluate Every
              </text>
            </svg>
          </span>
          <span className={styles.headingLine2}>Workspace.</span>
        </h1>
        <div className={styles.heroDivider}></div>
        <p className={styles.heroDescription}>
          Premium seating solutions for modern workspaces,
          <br />
          crafted for comfort, performance, and timeless design.
        </p>
        <div className={styles.heroButtons}>
          <button className={styles.primaryBtn} onClick={onExploreClick}>
            Explore Products <ArrowRight size={20} className={styles.btnIcon} />
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={onRequestCatalogueClick}
          >
            Catalogue <Download size={20} className={styles.btnIcon} />
          </button>
        </div>
      </div>

      <div className={styles.heroWrapper}>
        {/* Full Width Image Gallery */}
        <div className={styles.rightPlaceholder}>
          <div className={styles.imageWrapper}>
            <img
              src="/images/new_panel1.jpg"
              alt="Hero Visual First"
              className={styles.heroImage}
              loading="eager"
              fetchPriority="high"
            />
            <div className={styles.glassEffect}></div>
          </div>

          <div className={styles.imageWrapper}>
            <img
              src="/images/panel2_final.jpg"
              alt="Hero Visual Far Left"
              className={styles.heroImage}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.glassEffect}></div>
          </div>

          <div className={styles.imageWrapper}>
            <img
              src="/images/panel3_final.jpg"
              alt="Hero Visual Middle"
              className={styles.heroImage}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.glassEffect}></div>
          </div>

          <div className={styles.imageWrapper}>
            <img
              src="/images/panel4_new_upload.jpg"
              alt="Hero Visual Left"
              className={styles.heroImage}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.glassEffect}></div>
          </div>

          <div className={styles.imageWrapper}>
            <img
              src="/images/new_panel5.jpg"
              alt="Hero Visual Right"
              className={styles.heroImage}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.glassEffect}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
