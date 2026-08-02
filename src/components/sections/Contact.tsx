"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Mail, MapPin, Send } from "lucide-react";
import styles from "./Contact.module.css";

interface ContactProps {
  enquirySubject: string;
}

export default function Contact({ enquirySubject }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync enquirySubject prop if prefilled from carousel
  useEffect(() => {
    if (enquirySubject) {
      setFormData((prev) => ({ ...prev, subject: enquirySubject }));
    }
  }, [enquirySubject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Contact info */}
          <div className={styles.leftCol}>
            <div className={styles.headerBox}>
              <p className={styles.tagline}>Corporate Headquarters</p>
              <h2 className={styles.title}>Connect With Us.</h2>
            </div>

            <div className={styles.infoList}>
              {/* Phone Card */}
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Phone size={24} />
                </div>
                <div className={styles.infoDetails}>
                  <h3 className={styles.infoHeading}>Phone</h3>
                  <a href="tel:+919412367715" className={styles.infoText}>+91 9412367715</a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <MessageSquare size={24} />
                </div>
                <div className={styles.infoDetails}>
                  <h3 className={styles.infoHeading}>WhatsApp</h3>
                  <a
                    href="https://wa.me/9198100XXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.infoText}
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoDetails}>
                  <h3 className={styles.infoHeading}>Email</h3>
                  <a href="mailto:manjulagarwal4@gmail.com" className={styles.infoText}>manjulagarwal4@gmail.com</a>
                </div>
              </div>

              {/* Address Card */}
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <MapPin size={24} />
                </div>
                <div className={styles.infoDetails}>
                  <h3 className={styles.infoHeading}>ADDRESS</h3>
                  <div className={styles.infoText} style={{ lineHeight: "1.6" }}>
                    Old Rampur Road<br />
                    Govind Veer Shah Hazara<br />
                    Katghar Railway Station Road<br />
                    Moradabad
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className={styles.rightCol}>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.successState}
              >
                <div className={styles.successIcon}>
                  <Send size={32} />
                </div>
                <h3 className={styles.successTitle}>Enquiry Received</h3>
                <p className={styles.successText}>
                  Thank you for connecting with AZARO. An account executive will review your specifications and contact you within 2 business hours.
                </p>
              </motion.div>
            ) : (
              <div className={styles.formCard}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className={styles.input}
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Corporate Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className={styles.input}
                      placeholder="Enter your corporate email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="subject" className={styles.label}>Subject / Model Interest</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className={styles.input}
                      placeholder="E.g., Corporate installation inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message" className={styles.label}>Specifications & Requirements</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Provide details about volume requirements, custom materials, or corporate delivery timelines..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Request Quotation
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
