"use client";

import React, { useState, useEffect } from "react";
import { X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./EnquiryPopup.module.css";

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  selectedColorName: string;
  swatchPreview?: React.ReactNode;
}

export default function EnquiryPopup({ isOpen, onClose, productName, selectedColorName, swatchPreview }: EnquiryPopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    company: "",
    city: "",
    quantity: "",
    requirements: ""
  });

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "919412367715";
    const message = `Hello AZARO,

I would like to enquire about the following product.

Product:
${productName}

Selected Colour:
${selectedColorName}

Name:
${formData.name}

Mobile:
${formData.mobile}

Company:
${formData.company || "N/A"}

City:
${formData.city || "N/A"}

Quantity:
${formData.quantity || "N/A"}

Requirements:
${formData.requirements || "N/A"}

Please contact me regarding this enquiry.

Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div 
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.header}>
              <h3 className={styles.title}>Place Your Enquiry</h3>
              <p className={styles.subtitle}>Tell us your requirements and we'll get back to you shortly.</p>
              <button className={styles.closeButton} onClick={onClose} aria-label="Close popup">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            
            <form id="enquiry-form" onSubmit={handleSubmit} className={styles.body}>
              <div className={styles.productHighlightSection}>
                <div className={styles.highlightColumn}>
                  <span className={styles.highlightLabel}>Product</span>
                  <span className={styles.highlightValue}>{productName}</span>
                </div>
                <div className={styles.highlightColumn}>
                  <span className={styles.highlightLabel}>Selected Colour</span>
                  <div className={styles.swatchContainer}>
                    {swatchPreview}
                    <span className={styles.highlightValue}>{selectedColorName}</span>
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name <span className={styles.mandatoryStar}>*</span></label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required 
                      className={styles.input} 
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <label htmlFor="mobile">Mobile Number <span className={styles.mandatoryStar}>*</span></label>
                    <input 
                      type="tel" 
                      id="mobile"
                      name="mobile"
                      required 
                      className={styles.input} 
                      placeholder="e.g. 9876543210"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company">Company Name (Optional)</label>
                    <input 
                      type="text" 
                      id="company"
                      name="company"
                      className={styles.input} 
                      placeholder="e.g. ABC Pvt Ltd"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <label htmlFor="city">City</label>
                    <input 
                      type="text" 
                      id="city"
                      name="city"
                      className={styles.input} 
                      placeholder="e.g. Delhi"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="quantity">Quantity Required</label>
                <input 
                  type="number" 
                  id="quantity"
                  name="quantity"
                  min="1"
                  className={styles.input} 
                  placeholder="e.g. 10"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                <label htmlFor="requirements">Additional Requirements / Message</label>
                <textarea 
                  id="requirements"
                  name="requirements"
                  className={styles.textarea} 
                  placeholder="e.g. Need bulk pricing and delivery details."
                  value={formData.requirements}
                  onChange={handleChange}
                />
              </div>
            </form>
            
            <div className={styles.footer}>
              <button 
                type="submit" 
                form="enquiry-form"
                className={styles.submitBtn}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Send WhatsApp Enquiry
              </button>
              
              <div className={styles.safetyMessage}>
                <Shield size={16} strokeWidth={2} />
                <span>Your details are safe with us.</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
