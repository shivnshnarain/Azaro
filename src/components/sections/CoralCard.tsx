import React, { useState, memo } from "react";
import { Plus, ShoppingBag, Share2, Check, ShoppingCart } from "lucide-react";
import styles from "./ProductConfigurator.module.css";
import { useCart } from "@/context/CartContext";
import { CustomColorCard, getSwatchStyle } from "./ProductConfigurator";
import EnquiryPopup from "../ui/EnquiryPopup";

export const CORAL_COLORS = [
  { id: "coral-1", name: "Brown Leather", imagePath: "/images/coral107-1.png" },
  { id: "coral-2", name: "Black Leather", imagePath: "/images/coral107-2.png" }
];

export const CoralCard = memo(function CoralCard() {
  const [selectedColor, setSelectedColor] = useState(CORAL_COLORS[0]);
  const [showToast, setShowToast] = useState(false);
  const [isEnquiryPopupOpen, setIsEnquiryPopupOpen] = useState(false);
  const { addToCart, showToast: showGlobalToast } = useCart();

  const handleContactRequest = () => {
    const message = `Hello AZARO Team! 👋

I am interested in the *Custom Leather* option for your *Coral 107* chair.

Could you please share:

• All available leather colour options for this model
• Premium leather variants available
• Leather texture choices
• Finish options
• Material samples (if available)
• Custom leather customization options
• Any additional charges (if applicable)
• Expected delivery time for custom leather orders

I would like to explore all the custom leather options available for the *Coral 107* model before placing my order.

Looking forward to your response.

Thank you!`;
    const url = `https://wa.me/919412367715?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleWhatsAppOrder = () => {
    setIsEnquiryPopupOpen(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Coral 107",
      text: "AZARO Coral 107",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className={styles.directorSeriesCard}>
      <div className={styles.directorSeriesImageWrapper}>
        <img 
          src={selectedColor.imagePath} 
          alt={`Coral 107 Chair`} 
          className={styles.directorSeriesImage} 
          loading="lazy" 
          decoding="async" 
        />
      </div>
      <div className={styles.headerTopRow}>
        <span className={styles.seriesBadge}>DIRECTOR SERIES</span>
        <h3 className={styles.directorSeriesTitle} style={{ margin: 0 }}>Coral 107</h3>
      </div>
      
      <div className={styles.colorsSection} style={{ marginTop: '24px', marginBottom: '24px' }}>
        <div className={styles.sectionHeadingBlack} style={{ marginBottom: '16px' }}>AVAILABLE COLOURS</div>
        <div className={styles.thumbnailSelectorsRow} style={{ justifyContent: 'flex-start' }}>
          {CORAL_COLORS.map((color) => (
            <div 
              key={`coral-swatch-${color.id}`}
              className={`${styles.colorSwatch} ${selectedColor.id === color.id ? styles.activeSwatch : ""}`}
              style={{ 
                ...getSwatchStyle('coral-107', color.imagePath),
                width: '40px',
                height: '40px',
                borderRadius: '50%'
              }}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select ${color.name}`}
            />
          ))}
        </div>
      </div>

      <CustomColorCard onClick={handleContactRequest} style={{ margin: '0 0 24px 0', width: '100%' }} />

      <div className={styles.purchaseSection} style={{ marginTop: 'auto', paddingTop: '16px' }}>
        <button 
          className={styles.addToCartBtn}
          onClick={() => {
            addToCart({
              id: "coral-107",
              title: "Coral 107",
              series: "DIRECTOR SERIES",
              colorId: selectedColor.id,
              colorName: selectedColor.name,
              imagePath: selectedColor.imagePath,
            });
            showGlobalToast("Added to Cart");
          }}
        >
          <ShoppingCart size={22} strokeWidth={1.5} style={{marginRight: '12px', flexShrink: 0}} />
          Add to Cart
        </button>
        <button 
          className={styles.placeOrderBtn}
          onClick={handleWhatsAppOrder}
        >
          <ShoppingBag size={22} strokeWidth={1.5} style={{marginRight: '12px', flexShrink: 0}} />
          Place Order
        </button>
        <button 
          className={styles.shareBtn} 
          onClick={handleShare} 
          aria-label="Share Product"
          title="Share Product"
        >
          {showToast ? <Check size={22} strokeWidth={2} className={styles.toastCheck} /> : <Share2 size={22} strokeWidth={1.5} />}
        </button>
        {showToast && <div className={styles.toastNotification}>Link Copied!</div>}
      </div>

      <EnquiryPopup 
        isOpen={isEnquiryPopupOpen} 
        onClose={() => setIsEnquiryPopupOpen(false)} 
        productName="Coral 107"
        selectedColorName={selectedColor.name}
        swatchPreview={
          <div 
            className={`${styles.colorSwatch} ${styles.activeSwatch}`}
            style={{ 
              ...getSwatchStyle('coral-107', selectedColor.imagePath),
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'default'
            }}
          />
        }
      />
    </div>
  );
});
