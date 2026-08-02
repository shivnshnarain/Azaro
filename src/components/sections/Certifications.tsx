"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, CheckCircle2, HeartHandshake } from "lucide-react";
import styles from "./Certifications.module.css";

export default function Certifications() {
  const certificationsList = [
    {
      title: "ISO 9001:2015",
      subtitle: "Quality Standards",
      desc: "Certification for international quality management systems, guaranteeing consistent manufacturing precision.",
      icon: <Shield size={28} />
    },
    {
      title: "ISO 14001:2015",
      subtitle: "Ecological Safety",
      desc: "Certification for environmental systems, matching production workflows with zero-waste targets.",
      icon: <Sparkles size={28} />
    },
    {
      title: "ISO 45001:2018",
      subtitle: "Workplace Health",
      desc: "Certification for occupational health and safety systems, ensuring premium labor conditions.",
      icon: <CheckCircle2 size={28} />
    },
    {
      title: "BIFMA LEVEL 3",
      subtitle: "Global Furniture Compliance",
      desc: "Conformity to the highest tier of international business and institutional furniture safety standards.",
      icon: <HeartHandshake size={28} />
    }
  ];

  return (
    <section id="certifications" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.headerText}>
          <p className={styles.tagline}>International Approvals</p>
          <h2 className={styles.title}>Globally Audited Quality.</h2>
        </div>

        {/* Grid of Glass Cards */}
        <div className={styles.grid}>
          {certificationsList.map((cert, idx) => (
            <motion.div
              key={idx}
              className={styles.glassCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            >
              {/* Subtle hover background radial glow overlay */}
              <div className={styles.glow} />

              <div className={styles.iconBox}>
                {cert.icon}
              </div>
              <h3 className={styles.cardTitle}>{cert.title}</h3>
              <span className={styles.cardSubtitle}>{cert.subtitle}</span>
              <p className={styles.desc}>{cert.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
