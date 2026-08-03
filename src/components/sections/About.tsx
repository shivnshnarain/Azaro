"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  const timelineItems = [
    {
      year: "1999",
      title: "The Genesis",
      desc: "Founded by Mr. Manjul Agarwal to manufacture high-end ergonomic chairs."
    },
    {
      year: "2008",
      title: "Quality Certifications",
      desc: "Attained ISO 9001:2015 and introduced heavy frame automation."
    },
    {
      year: "2016",
      title: "Design Breakthrough",
      desc: "Patented dynamic synchro-tilt mechanisms with orthopedic designers."
    },
    {
      year: "2026",
      title: "Digital & Ecological Era",
      desc: "Achieved zero-carbon goals with BIFMA Level 3 certification."
    }
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={`container ${styles.grid}`}>
        
        {/* Left Column: Brand Story */}
        <div className={styles.leftCol}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.tagline}>About AZARO</p>
            <h2 className={styles.title}>
              REDEFINING<br />
              COMFORT.<br />
              SUSTAINING<br />
              WORK.
            </h2>
            <div className={styles.accentDivider} />
          </motion.div>

          <motion.div
            className={styles.storyText}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p>
              Founded in the year <span>1999</span> by visionary leader <span>Mr. Manjul Agarwal</span>, AZARO has grown to become an elite, highly recommended corporate brand in the commercial furniture industry.
            </p>
            <p>
              Every seat we create is a balance of craftsmanship, technological precision, and biomechanics. We build office chairs that don't just furnish a room—they support the leaders of tomorrow. Our manufacturing plant combines advanced CNC leather cutting with artisanal stitchers to create works of structural art.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Cards & Timeline */}
        <div className={styles.rightCol}>
          
          <div className={styles.visionMissionGrid}>
            <motion.div
              className={styles.infoCardWrapper}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.infoCard}>
                <div className={styles.cardAccent} />
                <h3 className={styles.cardTitle}>Our Vision</h3>
                <p className={styles.cardText}>
                  Setting the global standard for executive workspaces by fusing ergonomic mastery with luxury aesthetics.
                </p>
              </div>
            </motion.div>

            <motion.div
              className={styles.infoCardWrapper}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={styles.infoCard}>
                <div className={styles.cardAccent} />
                <h3 className={styles.cardTitle}>Our Mission</h3>
                <p className={styles.cardText}>
                  Crafting premium, sustainable furniture that perfectly protects posture and continuously drives professional success.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className={styles.infoCardWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle} style={{ marginBottom: "24px" }}>The Journey</h3>
              <div className={styles.timeline}>
                {timelineItems.map((item, idx) => (
                  <div key={idx} className={styles.timelineItem}>
                    <div className={styles.timelineConnector} />
                    <div className={styles.timelineDot} />
                    
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineYear}>{item.year}</div>
                      <h4 className={styles.timelineTitle}>{item.title}</h4>
                      <p className={styles.timelineDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
