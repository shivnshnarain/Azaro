"use client";

import { motion as m } from "framer-motion";
import { Activity, Gem, ShieldCheck, Award, Settings, Users, Briefcase, Zap } from "lucide-react";
import styles from "./WhyAzaro.module.css";

export default function WhyAzaro() {
  const cards = [
    {
      title: "Ergonomic Design",
      text: "Contour-engineered to mimic the natural curve of the spine, offering active lumbar support and advanced synchro tilt.",
      icon: <Activity size={24} strokeWidth={1.5} />,
      isFeatured: true,
      customClass: styles.ergonomicCard
    },
    {
      title: "Premium Materials",
      text: "Fine-grain Nappa leather, Korean high-elastic mesh, and chrome alloy bases for lasting excellence.",
      icon: <Gem size={24} strokeWidth={1.5} />,
      isFeatured: false
    },
    {
      title: "Long Durability",
      text: "Tested extensively under rigorous guidelines for seating solutions that stand the test of time.",
      icon: <Zap size={24} strokeWidth={1.5} />,
      isFeatured: false
    },
    {
      title: "Certified Quality",
      text: "ISO 9001, 14001, and 45001 certified. All lines conform strictly to BIFMA Level 3 design standards.",
      icon: <Award size={24} strokeWidth={1.5} />,
      isFeatured: false
    },
    {
      title: "Modern Manufacturing",
      text: "Combining high-performance automation with handcrafted finishing and multi-point quality control.",
      icon: <Settings size={24} strokeWidth={1.5} />,
      isFeatured: false
    },
    {
      title: "Warranty",
      text: "Complete peace of mind with comprehensive coverage on base joints, gas-lifts, and mechanisms.",
      icon: <ShieldCheck size={24} strokeWidth={1.5} />,
      isFeatured: false
    },
    {
      title: "Dealer Network",
      text: "Authorized dealers across India ready to assist with layout planning, delivery, and post-sales care.",
      icon: <Users size={24} strokeWidth={1.5} />,
      isFeatured: false
    },
    {
      title: "Corporate Projects",
      text: "Complete workspace solutions for corporate offices, institutions, and commercial environments. From planning and product selection to installation, AZARO delivers premium seating solutions tailored for projects of every scale.",
      icon: <Briefcase size={24} strokeWidth={1.5} />,
      isFeatured: true, // Making the last one featured to anchor the second block
      customClass: styles.corporateCard
    }
  ];

  // Block 1: 1 Featured Left, 4 Small Right
  const block1Featured = cards[0];
  const block1Small = cards.slice(1, 5);

  // Block 2: 2 Small Left, 1 Featured Right
  const block2Small = cards.slice(5, 7);
  const block2Featured = cards[7];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.06, ease: "easeOut" }
    })
  };

  const renderCard = (card: any, index: number) => (
    <m.div
      key={card.title}
      className={`${styles.card} ${card.isFeatured ? styles.featuredCard : ''} ${card.customClass || ''}`}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className={styles.cardTop}>
        <div className={styles.iconWrapper}>
          {card.icon}
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{card.title}</h3>
        <p className={styles.cardText}>{card.text}</p>
      </div>
    </m.div>
  );

  return (
    <section id="why-azaro" className={styles.whySection}>
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.headerText}>
          <p className={styles.tagline}>WHY AZARO</p>
          <h2 className={styles.title}>
            Mastery in Every Detail.
          </h2>
          <div className={styles.accentLine} />
          <p className={styles.subtitle}>
            Engineered for premium comfort, precision craftsmanship, and long-lasting performance.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className={styles.bentoContainer}>
          
          {/* Block 1 */}
          <div className={styles.bentoBlock}>
            <div className={styles.featuredLeft}>
              {renderCard(block1Featured, 0)}
            </div>
            <div className={styles.smallCards2x2}>
              {block1Small.map((card, idx) => renderCard(card, idx + 1))}
            </div>
          </div>

          {/* Block 2 (Reversed layout rhythm) */}
          <div className={styles.bentoBlock}>
            <div className={styles.smallCardsStacked}>
              {block2Small.map((card, idx) => renderCard(card, idx + 5))}
            </div>
            <div className={styles.featuredRight}>
              {renderCard(block2Featured, 7)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
