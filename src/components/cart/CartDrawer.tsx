"use client";

import { useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { getSwatchStyle } from "@/components/sections/ProductConfigurator";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotalItems } = useCart();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen]);

  const handleRequestQuote = () => {
    let message = "Hello AZARO Team! 👋\n\nI would like to request a quotation for the following products:\n\n--------------------------------------------------\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}.\n\n`;
      message += `Product:\n${item.title}\n\n`;
      message += `Model:\n${item.id}\n\n`;
      message += `Selected Colour:\n${item.colorName || "Standard"}\n\n`;
      message += `Quantity:\n${item.quantity}\n\n`;
      message += `--------------------------------------------------\n\n`;
    });

    message += "Kindly share:\n\n• Best quotation\n• Product availability\n• Estimated delivery timeline\n• Payment details\n• Shipping charges (if applicable)\n\nLooking forward to your response.\n\nThank you!";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919412367715?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          >
            {/* Drawer */}
            <motion.div
              className={styles.drawer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={styles.header}>
                <h2 className={styles.title}>Your Cart ({cartTotalItems})</h2>
                <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)} aria-label="Close cart">
                  <X size={24} />
                </button>
              </div>

              {/* Items */}
              <div className={styles.itemsContainer}>
                {cart.length === 0 ? (
                  <div className={styles.emptyState}>
                    <ShoppingCart size={48} />
                    <h3>Your cart is empty</h3>
                    <p>Add some premium seating to your workspace.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={`${item.id}-${item.colorId || idx}`} className={styles.cartItem}>
                      <img src={item.imagePath} alt={item.title} className={styles.itemImage}  loading="lazy" decoding="async" />
                      
                      <div className={styles.itemDetails}>
                        <p className={styles.itemSeries}>{item.series}</p>
                        <h4 className={styles.itemTitle}>{item.title}</h4>
                        {item.colorName && (
                          <div className={styles.swatchContainer}>
                            <span className={styles.swatchLabel}>Selected Colour</span>
                            <div 
                              className={styles.swatchCircle}
                              style={{ 
                                ...getSwatchStyle(item.id, item.imagePath),
                                cursor: 'default'
                              }}
                            />
                          </div>
                        )}
                        
                        <div className={styles.quantityControls}>
                          <button 
                            className={styles.qtyBtn} 
                            onClick={() => updateQuantity(item.id, item.colorId, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className={styles.qtyText}>{item.quantity}</span>
                          <button 
                            className={styles.qtyBtn} 
                            onClick={() => updateQuantity(item.id, item.colorId, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <div className={styles.itemActions}>
                        <span className={styles.price}>TBD</span>
                        <button 
                          className={styles.removeBtn} 
                          onClick={() => removeFromCart(item.id, item.colorId)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className={styles.footer}>
                  <div className={styles.summary}>
                    <span className={styles.summaryLabel}>Estimated Total</span>
                    <span className={styles.summaryTotal}>TBD</span>
                  </div>
                  <button className={styles.checkoutBtn} onClick={handleRequestQuote}>Request Quote</button>
                  <button className={styles.continueBtn} onClick={() => setIsCartOpen(false)}>
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
