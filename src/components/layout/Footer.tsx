"use client";

import { useState } from "react";
import { ArrowRight, Download, CheckCircle2 } from "lucide-react";
import styles from "./Footer.module.css";

interface FooterProps {
  onLinkClick: (sectionId: string) => void;
}

export default function Footer({ onLinkClick }: FooterProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Trigger catalogue download
    setTimeout(() => {
      setDownloading(false);
      const link = document.createElement("a");
      link.href = "/AZARO_Catalogue.pdf";
      link.setAttribute("download", "AZARO_Catalogue.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.grid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.logo} onClick={() => onLinkClick("home")} style={{ cursor: "pointer" }}>
              <img src="/azaro-logo-red.png" alt="AZARO Logo" className={styles.sroLogo} />
            </div>
            <p className={styles.brandDesc}>
              Elite executive office seating engineered for lasting durability, comfort, and leadership environments. Designed in India since 1999.
            </p>
            <button className={styles.catalogBtn} onClick={handleDownload} disabled={downloading}>
              <Download size={14} style={{ marginRight: "8px", verticalAlign: "middle" }} />
              {downloading ? "Preparing Catalog..." : "Download Catalog"}
            </button>
          </div>

          {/* Quick Links Col */}
          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a onClick={() => onLinkClick("home")}>Home</a>
              </li>
              <li className={styles.linkItem}>
                <a onClick={() => onLinkClick("collections")}>Collections</a>
              </li>
              <li className={styles.linkItem}>
                <a onClick={() => onLinkClick("products")}>Products</a>
              </li>
              <li className={styles.linkItem}>
                <a onClick={() => onLinkClick("why-azaro")}>Why AZARO</a>
              </li>
              <li className={styles.linkItem}>
                <a onClick={() => onLinkClick("contact")}>Contact</a>
              </li>
            </ul>
          </div>

          {/* Company Col */}
          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>COMPANY</h3>
            <ul className={styles.companyList}>
              <li className={styles.companyItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                Premium Office Seating Solutions
              </li>
              <li className={styles.companyItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                Custom Leather Options Available
              </li>
              <li className={styles.companyItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                Bulk & Corporate Orders
              </li>
              <li className={styles.companyItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                PAN India Delivery
              </li>
              <li className={styles.companyItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                WhatsApp Support Available
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; 2026 AZARO Seating Systems. All Rights Reserved.
          </p>
          <p className={styles.credit}>
            <span className={styles.creditText}>Created by</span>
            <a href="https://shivanshnarain.me" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>
              Shivansh Narain
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
