"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function CartToast() {
  const { toastMessage } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.9 }}
          style={{
            position: "fixed",
            bottom: "32px",
            left: "50%",
            background: "#111111",
            color: "#FFFFFF",
            padding: "16px 24px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            zIndex: 10000,
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            fontSize: "14px",
            pointerEvents: "none",
          }}
        >
          <CheckCircle2 size={20} color="#4ADE80" />
          {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
