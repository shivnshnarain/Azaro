"use client";

import React, { useState, useEffect, useMemo, useCallback, memo, useRef } from "react";
import { Award, Armchair, Settings, Palette, Plus, Shield, ShoppingBag, Share2, Check, ShoppingCart, Paintbrush, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveViewer from "../ui/InteractiveViewer";
import styles from "./ProductConfigurator.module.css";
import { useCart } from "@/context/CartContext";
import EnquiryPopup from "../ui/EnquiryPopup";
import PremiumImageViewer from "../ui/PremiumImageViewer";

const BASE_PRICE = 59999;

export const CustomColorCard = memo(({ onClick, style }: { onClick: () => void, style?: React.CSSProperties }) => (
  <div className={styles.customColorNewCard} onClick={onClick} style={style}>
    <div className={styles.customColorContent}>
      <Paintbrush size={18} strokeWidth={2} className={styles.customColorIcon} />
      <div className={styles.customColorText}>
        <div className={styles.customColorTitle}>Custom Colour</div>
        <div className={styles.customColorSubtitle}>Create your own shade</div>
      </div>
    </div>
    <ArrowRight size={18} strokeWidth={2} className={styles.customColorNewArrow} />
  </div>
));

export const PRODUCTS_DATA = [
  {
    id: "platinum-101",
    series: "DIRECTOR SERIES",
    title: "Platinum 101",
    price: "₹15,000",
    description: "Designed for modern executive workspaces, the Platinum 101 combines refined craftsmanship with exceptional everyday comfort. Premium upholstery, advanced ergonomic support, and a heavy-duty base deliver a sophisticated aesthetic while ensuring long-lasting performance for professional use.",
    colors: [
      { id: "variant5", name: "Brown Leather", hex: "#4A0E17", imagePath: "/images/plat101-5-new.png" },
      { id: "variant3", name: "White Leather", hex: "#F9F9F9", imagePath: "/images/plat101-3-new.png" },
      { id: "variant4", name: "Red Leather", hex: "#3E2723", imagePath: "/images/plat101-4-new.png" },
      { id: "variant2", name: "Black Leather", hex: "#111111", imagePath: "/images/plat101-2-new.png" },
    ]
  },
  {
    id: "sun-132",
    series: "DIRECTOR SERIES",
    title: "Sun 132",
    price: "₹19,800",
    description: "Sophisticated seating tailored for dedicated professionals, the Sun 132 merges contemporary styling with premium materials. Its ergonomic high-back profile, refined detailing, and durable construction guarantee superior comfort and steadfast reliability throughout extended corporate working hours.",
    specifications: [
      "Premium Leatherette Upholstery",
      "High-Back Executive Design",
      "Multi-Layer Cushioned Backrest",
      "High-Density Foam Seat Cushion",
      "Premium Cushioned Armrests",
      "Smooth Hydraulic Height Adjustment",
      "Heavy-Duty Chrome Base",
      "360° Smooth Swivel",
      "Premium Twin-Wheel Casters",
      "Ergonomic Lumbar Support",
      "Ideal for Executive Cabins, Boardrooms & Corporate Offices"
    ],
    colors: [
      { id: "sun132-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/sun132-1.png" },
      { id: "sun132-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/sun132-2.png" },
      { id: "sun132-var3", name: "Colour Option 3", hex: "#000000", imagePath: "/images/sun132-3.png" },
      { id: "sun132-var4", name: "Colour Option 4", hex: "#000000", imagePath: "/images/sun132-4.png" },
    ]
  },
  {
    id: "orchid-120",
    series: "DIRECTOR SERIES",
    title: "Orchid 120",
    price: "₹15,300",
    description: "Designed for modern executive workspaces, the Orchid 120 combines refined craftsmanship with exceptional everyday comfort. Premium upholstery, advanced ergonomic support, and a heavy-duty base deliver a sophisticated aesthetic while ensuring long-lasting performance for professional use.",
    colors: [
      { id: "orchid120-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/orchid120-1.png" },
      { id: "orchid120-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/orchid120-2.png" },
      { id: "orchid120-var3", name: "Colour Option 3", hex: "#000000", imagePath: "/images/orchid120-3.png" },
    ]
  },
  {
    id: "lily-121",
    series: "DIRECTOR SERIES",
    title: "Lily 121",
    price: "₹10,900",
    description: "Designed for modern executive workspaces, the Lily 121 combines refined craftsmanship with exceptional everyday comfort. Premium upholstery, advanced ergonomic support, and a heavy-duty base deliver a sophisticated aesthetic while ensuring long-lasting performance for professional use.",
    specifications: [
      "Premium Leatherette Upholstery",
      "Diamond-Quilted Backrest Design",
      "High-Density Cushion Seat",
      "Fixed Cushioned Chrome Armrests",
      "Smooth Height Adjustment Mechanism",
      "Heavy-Duty Chrome Base",
      "360° Smooth Swivel",
      "Premium Twin-Wheel Casters",
      "Ergonomic Executive Seating",
      "Ideal for Executive Cabins, Conference Rooms & Corporate Offices"
    ],
    colors: [
      { id: "lily121-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/lily121-1.png" },
      { id: "lily121-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/lily121-2.png" },
      { id: "lily121-var3", name: "Colour Option 3", hex: "#000000", imagePath: "/images/lily121-3.png" },
    ]
  },
  {
    id: "heaven-125",
    series: "DIRECTOR SERIES",
    title: "Heaven 125",
    price: "₹11,000",
    description: "Crafted to deliver a commanding presence, the Heaven 125 perfectly balances premium upholstery with exceptional ergonomic engineering. Thoughtful detailing, plush support, and heavy-duty materials provide an elegant, highly durable seating solution for modern corporate spaces.",
    specifications: [
      "Premium Leatherette Upholstery",
      "High-Back Ergonomic Executive Design",
      "Multi-Layer Cushioned Backrest",
      "High-Density Foam Seat Cushion",
      "Premium Metallic Cushioned Armrests",
      "Smooth Height Adjustment Mechanism",
      "Heavy-Duty Chrome Base",
      "360° Smooth Swivel",
      "Premium Twin-Wheel Casters",
      "Strong Hydraulic Lift System",
      "Ergonomic Lumbar Support",
      "Ideal for Executive Cabins, Boardrooms & Corporate Offices"
    ],
    colors: [
      { id: "heaven125-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/heaven125-1.png" },
      { id: "heaven125-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/heaven125-2.png" },
      { id: "heaven125-var3", name: "Colour Option 3", hex: "#000000", imagePath: "/images/heaven125-3.png" },
    ]
  },
  {
    id: "mercury-129",
    series: "DIRECTOR SERIES",
    title: "Mercury 129",
    price: "₹11,000",
    description: "Engineered for leadership environments, the Mercury 129 blends premium craftsmanship with superior ergonomic comfort. Featuring luxurious cushioning, refined materials, and a polished chrome finish, it ensures exceptional posture support and long-lasting durability for everyday executive use.",
    specifications: [
      "Premium Leatherette Upholstery",
      "High-Back Executive Design",
      "Multi-Layer Ergonomic Backrest",
      "High-Density Foam Cushion Seat",
      "Premium Cushioned Metallic Armrests",
      "Heavy-Duty Hydraulic Height Adjustment",
      "Smooth 360° Swivel Mechanism",
      "Heavy-Duty Chrome Base",
      "Premium Twin-Wheel Casters",
      "Superior Lumbar & Back Support",
      "Ideal for Executive Cabins, Boardrooms & Corporate Offices"
    ],
    colors: [
      { id: "mercury129-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/mercury129-1.png" },
      { id: "mercury129-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/mercury129-2.png" },
      { id: "mercury129-var3", name: "Colour Option 3", hex: "#000000", imagePath: "/images/mercury129-3.png" },
    ]
  },
  {
    id: "ruby-113",
    series: "DIRECTOR SERIES",
    title: "Ruby 113",
    price: "₹13,000",
    description: "An elegant executive design crafted for corporate offices, the Ruby 113 features premium materials and refined stitching. Offering exceptional ergonomic posture support and a durable foundation, it ensures superior comfort for demanding meetings and prolonged professional use.",
    colors: [
      { id: "ruby113-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/ruby113-1.png" },
      { id: "ruby113-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/ruby113-2.png" },
      { id: "ruby113-var3", name: "Colour Option 3", hex: "#000000", imagePath: "/images/ruby113-3.png" },
    ]
  },
  {
    id: "platinum-102",
    series: "DIRECTOR SERIES",
    title: "Platinum 102",
    price: "₹13,940",
    description: "Engineered for leadership environments, the Platinum 102 blends premium craftsmanship with superior ergonomic comfort. Featuring luxurious cushioning, refined materials, and a polished chrome finish, it ensures exceptional posture support and long-lasting durability for everyday executive use.",
    colors: [
      { id: "plat102-var1", name: "Olive Leather", hex: "#87906f", imagePath: "/images/plat102_1.png" },
      { id: "plat102-var2", name: "Brown Leather", hex: "#73513b", imagePath: "/images/plat102_2.png" },
      { id: "plat102-var3", name: "Grey Leather", hex: "#cbcaca", imagePath: "/images/plat102_3.png" },
      { id: "plat102-var4", name: "Black Leather", hex: "#3a3a3a", imagePath: "/images/plat102_4.png" },
    ]
  },
  {
    id: "gold-103",
    series: "DIRECTOR SERIES",
    title: "Gold 103",
    price: "₹9,000",
    description: "Designed for modern executive workspaces, the Gold 103 combines refined craftsmanship with exceptional everyday comfort. Premium upholstery, advanced ergonomic support, and a heavy-duty base deliver a sophisticated aesthetic while ensuring long-lasting performance for professional use.",
    colors: [
      { id: "gold103-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/gold103_1.png" },
      { id: "gold103-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/gold103_2.png" },
    ]
  },
  {
    id: "coral-107",
    series: "DIRECTOR SERIES",
    title: "Coral 107",
    price: "₹10,100",
    description: "Engineered for leadership environments, the Coral 107 blends premium craftsmanship with superior ergonomic comfort. Featuring luxurious cushioning, refined materials, and a polished chrome finish, it ensures exceptional posture support and long-lasting durability for everyday executive use.",
    colors: [
      { id: "coral107-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/coral107-1-new.png" },
      { id: "coral107-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/coral107-2-new.png" },
    ]
  },
  {
    id: "emerald-108",
    series: "DIRECTOR SERIES",
    title: "Emerald 108",
    price: "₹8,900",
    description: "Crafted to deliver a commanding presence, the Emerald 108 perfectly balances premium upholstery with exceptional ergonomic engineering. Thoughtful detailing, plush support, and heavy-duty materials provide an elegant, highly durable seating solution for modern corporate spaces.",
    colors: [
      { id: "emerald108-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/emerald108-1-new.png" },
      { id: "emerald108-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/emerald108-2-new.png" },
    ]
  },
  {
    id: "ivory-109",
    series: "DIRECTOR SERIES",
    title: "Ivory 109",
    price: "₹11,100",
    description: "Crafted to deliver a commanding presence, the Ivory 109 perfectly balances premium upholstery with exceptional ergonomic engineering. Thoughtful detailing, plush support, and heavy-duty materials provide an elegant, highly durable seating solution for modern corporate spaces.",
    colors: [
      { id: "ivory109-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/ivory109-1-new.png" },
      { id: "ivory109-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/ivory109-2-new.png" },
    ]
  },
  {
    id: "jasper-110",
    series: "DIRECTOR SERIES",
    title: "Jasper 110",
    price: "₹11,200",
    description: "Engineered for leadership environments, the Jasper 110 blends premium craftsmanship with superior ergonomic comfort. Featuring luxurious cushioning, refined materials, and a polished chrome finish, it ensures exceptional posture support and long-lasting durability for everyday executive use.",
    colors: [
      { id: "jasper110-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/jasper110-1-new.png" },
      { id: "jasper110-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/jasper110-2-new.png" },
      { id: "jasper110-var3", name: "Colour Option 3", hex: "#000000", imagePath: "/images/jasper110-3-new.png" },
    ]
  },
  {
    id: "opal-111",
    series: "DIRECTOR SERIES",
    title: "Opal 111",
    price: "₹10,100",
    description: "Designed for modern executive workspaces, the Opal 111 combines refined craftsmanship with exceptional everyday comfort. Premium upholstery, advanced ergonomic support, and a heavy-duty base deliver a sophisticated aesthetic while ensuring long-lasting performance for professional use.",
    colors: [
      { id: "opal111-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/opal111-1.png" },
      { id: "opal111-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/opal111-2.png" },
    ]
  },
  {
    id: "daisy-117",
    series: "DIRECTOR SERIES",
    title: "Daisy 117",
    price: "₹13,200",
    description: "Engineered for leadership environments, the Daisy 117 blends premium craftsmanship with superior ergonomic comfort. Featuring luxurious cushioning, refined materials, and a polished chrome finish, it ensures exceptional posture support and long-lasting durability for everyday executive use.",
    colors: [
      { id: "daisy117-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/daisy117-1.png" },
      { id: "daisy117-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/daisy117-2.png" },
      { id: "daisy117-var3", name: "Colour Option 3", hex: "#000000", imagePath: "/images/daisy117-3.png" },
    ]
  }
];

export function getSwatchStyle(productId: string, imagePath: string) {
  let bgPos = '35% 20%';
  
  if (productId === 'achieve-156' || productId === 'admire-157' || productId === 'synergy-171' || productId === 'pentagon-172') {
    bgPos = '40% 30%'; // Deeper into the upper-left to hit upholstery instead of frame
  }

  return {
    backgroundImage: `url("${imagePath}")`,
    backgroundSize: '2500%',
    backgroundPosition: bgPos
  };
}

export function ProductCard({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [showToast, setShowToast] = useState(false);
  const [isEnquiryPopupOpen, setIsEnquiryPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specifications">("description");
  const [hoverTab, setHoverTab] = useState<"description" | "specifications" | null>(null);
  
  const descriptionRef = useRef<HTMLButtonElement>(null);
  const specificationsRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const activeTarget = hoverTab || activeTab;

  useEffect(() => {
    const targetRef = activeTarget === 'description' ? descriptionRef : specificationsRef;
    if (targetRef.current) {
      setIndicatorStyle({
        left: targetRef.current.offsetLeft,
        width: targetRef.current.offsetWidth,
      });
    }
  }, [activeTarget]);

  const { addToCart, showToast: showGlobalToast } = useCart();

  const selectPresetColor = useCallback((color: typeof product.colors[0]) => {
    setSelectedColor(color);
  }, []);

  const handleContactRequest = useCallback(() => {
    const message = `Hello AZARO Team! 👋

I am interested in the *Custom Leather* option for your *${product.title}* chair.

Could you please share:

• All available leather colour options for this model
• Premium leather variants available
• Leather texture choices
• Finish options
• Material samples (if available)
• Custom leather customization options
• Any additional charges (if applicable)
• Expected delivery time for custom leather orders

I would like to explore all the custom leather options available for the *${product.title}* model before placing my order.

Looking forward to your response.

Thank you!`;
    const url = `https://wa.me/919412367715?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }, [product.title]);

  const handleWhatsAppOrder = useCallback(() => {
    setIsEnquiryPopupOpen(true);
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: product.title,
      text: product.description,
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
  }, [product.title, product.description]);

  const staticHeader = useMemo(() => (
    <div className={styles.headerTopRow}>
      <span className={styles.seriesBadge}>{product.series}</span>
      <div style={{ display: 'flex', flexDirection: 'column', width: 'max-content' }}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        {product.price && <div className={styles.productPrice}>{product.price}</div>}
        <div className={styles.titleDivider} style={{ width: '58%', margin: '24px 0 0 0' }}>
          <div className={styles.dividerLine} />
          <div className={styles.dividerDiamond} />
          <div className={styles.dividerLine} />
        </div>
      </div>
    </div>
  ), [product.series, product.title]);



  const staticTabs = useMemo(() => (
    <>
      <div className={styles.tabsWrapper}>
        <div 
          className={styles.tabsContainer}
          onMouseLeave={() => setHoverTab(null)}
        >
          <button 
            ref={descriptionRef}
            className={`${styles.tabButton} ${activeTarget === "description" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("description")}
            onMouseEnter={() => setHoverTab("description")}
          >
            Description
          </button>
          <button 
            ref={specificationsRef}
            className={`${styles.tabButton} ${activeTarget === "specifications" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("specifications")}
            onMouseEnter={() => setHoverTab("specifications")}
          >
            Specifications
          </button>
        </div>
        <div className={styles.tabsBaseLine} />
        <div 
          className={styles.tabsActiveLine} 
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`
          }} 
        />
      </div>

      <div className={styles.tabContentContainer}>
        <div className={`${styles.tabContent} ${activeTab === "description" ? styles.activeTabContent : ""}`}>
          <p className={styles.productDescription}>
            {product.description}
          </p>
        </div>
        <div className={`${styles.tabContent} ${activeTab === "specifications" ? styles.activeTabContent : ""}`}>
          <div className={styles.specificationsGrid}>
            <div className={styles.specCard}><Award size={20} strokeWidth={1.5} className={styles.specIcon} /> <span className={styles.specText}>{product.specifications?.[0] || "Premium Quality"}</span></div>
            <div className={styles.specCard}><Armchair size={20} strokeWidth={1.5} className={styles.specIcon} /> <span className={styles.specText}>{product.specifications?.[1] || "Ergonomic Design"}</span></div>
            <div className={styles.specCard}><Settings size={20} strokeWidth={1.5} className={styles.specIcon} /> <span className={styles.specText}>{product.specifications?.[2] || "Made to Order"}</span></div>
            <div className={styles.specCard}><Shield size={20} strokeWidth={1.5} className={styles.specIcon} /> <span className={styles.specText}>{product.specifications?.[3] || "Heavy Duty Base"}</span></div>
          </div>
        </div>
      </div>
    </>
  ), [activeTab, activeTarget, indicatorStyle, hoverTab, product.description]);

  const purchaseSection = useMemo(() => (
    <div className={styles.purchaseSection}>
      <button 
        className={styles.addToCartBtn}
        onClick={() => {
          addToCart({
            id: product.id,
            title: product.title,
            series: product.series,
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
  ), [handleWhatsAppOrder, handleShare, showToast, selectedColor, product, addToCart, showGlobalToast]);

  return (
    <div className={styles.mainProductCard}>
      {/* Preload images to avoid delay */}
      <div style={{ display: 'none' }}>
        {product.colors.map((c: any) => <img key={`preload-${c.id}`} src={c.imagePath} alt="preload"  loading="lazy" decoding="async" />)}
      </div>
      
      {/* LEFT COLUMN (45%) */}
      <div className={styles.leftColumn}>
        <InteractiveViewer 
          staticImage={selectedColor.imagePath}
          alt={`${product.title} Chair`}
          className={styles.productImage}
        />
      </div>

      {/* RIGHT COLUMN (55%) */}
      <div className={styles.rightColumn}>
        {staticHeader}
          
        <div className={styles.colorsSection} style={{ margin: '0 0 24px 0', width: '100%' }}>
          <div className={styles.sectionHeadingBlack}>AVAILABLE COLOURS</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div className={styles.thumbnailSelectorsRow} style={{ marginBottom: 0 }}>
              {product.colors.map((color: any) => (
                <div 
                  key={`swatch-${color.id}`}
                  className={`${styles.colorSwatch} ${selectedColor.id === color.id ? styles.activeSwatch : ""}`}
                  style={getSwatchStyle(product.id, color.imagePath)}
                  onClick={() => selectPresetColor(color)}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
            
            <CustomColorCard onClick={handleContactRequest} />
          </div>
        </div>
        
        <div className={styles.thinGreyDivider} />

        <div className={styles.customLeatherNewContainer}>
          <div className={styles.customLeatherNewIconWrapper}>
            <Armchair size={24} strokeWidth={1.5} color="#D71920" />
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#111827', fontSize: '1.05rem', marginBottom: '2px' }}>
              {product.series === 'MESH SERIES' ? 'Looking for a custom mesh colour?' : 'Looking for a custom leather colour?'}
            </div>
            <div style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
              {product.series === 'MESH SERIES' 
                ? `Contact our team to customise your ${product.title.toUpperCase()} with your preferred mesh colour and finish for your workspace.` 
                : "Contact our team and we'll manufacture your chair in your preferred shade."}
            </div>
          </div>
        </div>

        {staticTabs}
        {purchaseSection}
      </div>

      <EnquiryPopup 
        isOpen={isEnquiryPopupOpen} 
        onClose={() => setIsEnquiryPopupOpen(false)} 
        productName={product.title}
        selectedColorName={selectedColor.name}
        swatchPreview={
          <div 
            className={`${styles.colorSwatch} ${styles.activeSwatch}`}
            style={{ 
              ...getSwatchStyle(product.id, selectedColor.imagePath),
              cursor: 'default'
            }}
          />
        }
      />
    </div>
  );
}

export const DIRECTOR_PRODUCTS = [
  { id: 'silver-104', title: "Silver 104",
 price: "₹9,200", imagePath: '/images/silver104_1.png' },
  { id: 'palladium-105', title: "Palladium 105",
 price: "₹6,800", imagePath: '/images/palladium105_1.png' },
  { id: 'diamond-106', title: "Diamond 106",
 price: "₹6,800", imagePath: '/images/diamond106_1.png' }
];

export const PEARL_112_DATA = {
  id: 'pearl-112',
  title: "Pearl 112",
  price: "₹7,100",
  colors: [
    { id: "pearl112-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/pearl112-1.png" },
    { id: "pearl112-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/pearl112-2.png" },
  ]
};

export const CROWN_122_DATA = {
  id: 'crown-122',
  title: "Crown 122",
  price: "₹15,500",
  series: 'DIRECTOR SERIES',
  description: 'Designed for executive workspaces, the Crown 122 combines modern office aesthetics with long working comfort. Featuring premium cushioning, ergonomic support, and a polished chrome finish, it delivers an exceptional daily seating experience for dedicated executives.',
  colors: [
    { id: "crown122-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/crown122-1.png" },
    { id: "crown122-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/crown122-2.png" },
  ]
};

export const DYNAMIC_123_DATA = {
  id: 'dynamic-123',
  title: "Dynamic 123",
  price: "₹14,400",
  series: 'DIRECTOR SERIES',
  description: 'Sophisticated executive seating tailored for leadership workspaces. The Dynamic 123 blends contemporary styling with premium materials, ensuring superior comfort and ergonomic posture support alongside long-lasting durability.',
  colors: [
    { id: "dynamic123-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/dynamic123-1.png" },
    { id: "dynamic123-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/dynamic123-2.png" },
  ]
};

export const FANTASY_124_DATA = {
  id: 'fantasy-124',
  title: "Fantasy 124",
  price: "₹10,400",
  series: 'DIRECTOR SERIES',
  description: 'An elegant executive design crafted for corporate offices and executive cabins. The Fantasy 124 features premium leather upholstery with refined stitching, offering superior comfort and high durability for demanding meetings and prolonged professional use.',
  colors: [
    { id: "fantasy124-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/fantasy124-1.png" },
    { id: "fantasy124-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/fantasy124-2.png" },
  ]
};

export const LOTUS_114_DATA = {
  id: 'lotus-114',
  title: "Lotus 114",
  price: "₹11,800",
  description: 'Designed for executive workspaces, the Lotus 114 combines modern office aesthetics with long working comfort. Featuring premium cushioning, ergonomic support, and a polished chrome finish, it delivers an exceptional daily seating experience for dedicated executives.',
  colors: [
    { id: "lotus114-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/lotus114-1.png" },
    { id: "lotus114-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/lotus114-2.png" },
  ]
};

export const ROSE_115_DATA = {
  id: 'rose-115',
  title: "Rose 115",
  price: "₹9,000",
  description: 'An elegant executive design crafted for corporate offices and executive cabins. The Rose 115 features premium leather upholstery with refined stitching, offering superior comfort and high durability for demanding meetings and prolonged professional use.',
  colors: [
    { id: "rose115-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/rose115-1.png" },
    { id: "rose115-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/rose115-2.png" },
  ]
};

export const JASMINE_116_DATA = {
  id: 'jasmine-116',
  title: "Jasmine 116",
  price: "₹7,400",
  description: 'Sophisticated executive seating tailored for leadership workspaces. The Jasmine 116 blends contemporary styling with premium materials, ensuring superior comfort and ergonomic posture support alongside long-lasting durability.',
  colors: [
    { id: "jasmine116-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/jasmine116-1.png" },
    { id: "jasmine116-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/jasmine116-2.png" },
  ]
};

export const CLASSIC_126_DATA = {
  id: 'classic-126',
  title: "Classic 126",
  price: "₹9,400",
  series: 'DIRECTOR SERIES',
  description: 'Designed for executive workspaces, the Classic 126 combines modern office aesthetics with long working comfort. Featuring premium cushioning, ergonomic support, and a polished chrome finish, it delivers an exceptional daily seating experience for dedicated executives.',
  colors: [
    { id: "classic126-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/classic126-1.png" },
    { id: "classic126-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/classic126-2.png" },
  ]
};

export const PYRAMID_127_DATA = {
  id: 'pyramid-127',
  title: "Pyramid 127",
  price: "₹8,100",
  series: 'DIRECTOR SERIES',
  description: 'An elegant executive design crafted for corporate offices and executive cabins. The Pyramid 127 features premium leather upholstery with refined stitching, offering superior comfort and high durability for demanding meetings and prolonged professional use.',
  colors: [
    { id: "pyramid127-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/pyramid127-1.png" },
    { id: "pyramid127-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/pyramid127-2.png" },
  ]
};

export const ROYAL_128_DATA = {
  id: 'royal-128',
  title: "Royal 128",
  price: "₹6,600",
  series: 'DIRECTOR SERIES',
  description: 'Sophisticated executive seating tailored for leadership workspaces. The Royal 128 blends contemporary styling with premium materials, ensuring superior comfort and ergonomic posture support alongside long-lasting durability.',
  colors: [
    { id: "royal128-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/royal128-1.png" },
    { id: "royal128-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/royal128-2.png" },
  ]
};

export const TULIP_118_DATA = {
  id: 'tulip-118',
  title: "Tulip 118",
  price: "₹7,000",
  description: 'Executive comfort meets an elegant leather finish and premium stitching. The Tulip 118 provides exceptional ergonomic posture support and polished chrome armrests for long-lasting durability, tailored exclusively for corporate offices and executive cabins.',
  colors: [
    { id: "tulip118-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/tulip118-1.png" },
    { id: "tulip118-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/tulip118-2.png" },
  ]
};

export const LAVENDER_119_DATA = {
  id: 'lavender-119',
  title: "Lavender 119",
  price: "₹6,950",
  description: 'Designed with modern executive aesthetics and refined craftsmanship, the Lavender 119 offers premium cushioning for comfortable all-day seating. Its durable construction and ergonomic support make it the definitive choice for professional workspaces and leadership environments.',
  colors: [
    { id: "lavender119-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/lavender119-1.png" },
    { id: "lavender119-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/lavender119-2.png" },
  ]
};

export const PLUTO_130_DATA = {
  id: 'pluto-130',
  title: "Pluto 130",
  price: "₹11,100",
  series: 'DIRECTOR SERIES',
  description: 'Designed for executive workspaces where luxury meets everyday performance. The Pluto 130 offers premium comfort with exceptional ergonomic posture support and polished chrome armrests for long-lasting durability.',
  colors: [
    { id: "pluto130-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/pluto130-1.png" },
    { id: "pluto130-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/pluto130-2.png" },
  ]
};

export const JUPITER_131_DATA = {
  id: 'jupiter-131',
  title: "Jupiter 131",
  price: "₹10,200",
  series: 'DIRECTOR SERIES',
  description: 'An elegant executive design crafted for corporate offices and executive cabins. The Jupiter 131 offers superior comfort and high durability for demanding meetings and prolonged professional use.',
  colors: [
    { id: "jupiter131-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/jupiter131-1.png" },
  ]
};

export const CHERRY_133_DATA = {
  id: 'cherry-133',
  title: "Cherry 133",
  price: "₹10,300",
  series: 'DIRECTOR SERIES',
  description: 'Designed for executive workspaces where luxury meets everyday performance. The Cherry 133 offers premium comfort with exceptional ergonomic posture support and polished chrome armrests for long-lasting durability.',
  colors: [
    { id: "cherry133-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/cherry133-1.png" },
    { id: "cherry133-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/cherry133-2.png" },
  ]
};

export const FLEXI_134_DATA = {
  id: 'flexi-134',
  title: "Flexi 134",
  price: "₹7,500",
  series: 'DIRECTOR SERIES',
  description: 'An elegant executive design crafted for corporate offices and executive cabins. The Flexi 134 offers superior comfort and high durability for demanding meetings and prolonged professional use.',
  colors: [
    { id: "flexi134-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/flexi134-1.png" },
  ]
};

export const MIRAZ_135_DATA = {
  id: 'miraz-135',
  title: "Miraz 135",
  price: "₹13,200",
  series: 'DIRECTOR SERIES',
  description: 'Designed for executive workspaces, the Miraz 135 combines modern office aesthetics with long working comfort. Featuring premium cushioning, ergonomic support, and a polished chrome finish, it delivers an exceptional daily seating experience for dedicated executives.',
  colors: [
    { id: "miraz135-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/miraz135-1.png" },
  ]
};

export const VIVA_136_DATA = {
  id: 'viva-136',
  title: "Viva 136",
  price: "₹9,000",
  series: 'DIRECTOR SERIES',
  description: 'An elegant executive design crafted for corporate offices and executive cabins. The Viva 136 features premium leather upholstery with refined stitching, offering superior comfort and high durability for demanding meetings and prolonged professional use.',
  colors: [
    { id: "viva136-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/viva136-1.png" },
  ]
};

export const NOVA_137_DATA = {
  id: 'nova-137',
  title: "Nova 137",
  price: "₹7,100",
  series: 'DIRECTOR SERIES',
  description: 'Sophisticated executive seating tailored for leadership workspaces. The Nova 137 blends contemporary styling with premium materials, ensuring superior comfort and ergonomic posture support alongside long-lasting durability.',
  colors: [
    { id: "nova137-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/nova137-1.png" },
  ]
};

export const CRYSTAL_138_DATA = {
  id: 'crystal-138',
  title: "Crystal 138",
  price: "₹13,100",
  series: 'DIRECTOR SERIES',
  description: 'Designed for executive workspaces where luxury meets everyday performance. The Crystal 138 offers premium comfort with exceptional ergonomic posture support and polished chrome armrests for long-lasting durability.',
  colors: [
    { id: "crystal138-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/crystal138-1.png" },
    { id: "crystal138-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/crystal138-2.png" },
  ]
};

export const AQUA_139_DATA = {
  id: 'aqua-139',
  title: "Aqua 139",
  price: "₹12,200",
  series: 'DIRECTOR SERIES',
  description: 'An elegant executive design crafted for corporate offices and executive cabins. The Aqua 139 offers superior comfort and high durability for demanding meetings and prolonged professional use.',
  colors: [
    { id: "aqua139-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/aqua139-1.png" },
    { id: "aqua139-var2", name: "Colour Option 2", hex: "#000000", imagePath: "/images/aqua139-2.png" },
  ]
};

export const MOSAIC_140_DATA = {
  id: 'mosaic-140',
  title: "Mosaic 140",
  price: "₹10,400",
  series: 'DIRECTOR SERIES',
  description: 'Designed for executive workspaces, the Mosaic 140 combines modern office aesthetics with long working comfort. Featuring premium cushioning, ergonomic support, and a polished chrome finish, it delivers an exceptional daily seating experience for dedicated executives.',
  colors: [
    { id: "mosaic140-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/mosaic_140.png" },
  ]
};

export const ZANTE_141_DATA = {
  id: 'zante-141',
  title: "Zante 141",
  price: "₹9,500",
  series: 'DIRECTOR SERIES',
  description: 'An elegant executive design crafted for corporate offices and executive cabins. The Zante 141 features premium leather upholstery with refined stitching, offering superior comfort and high durability for demanding meetings and prolonged professional use.',
  colors: [
    { id: "zante141-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/zante_141.png" },
  ]
};

export const SIESTA_142_DATA = {
  id: 'siesta-142',
  title: "Siesta 142",
  price: "₹8,800",
  series: 'DIRECTOR SERIES',
  description: 'Sophisticated executive seating tailored for leadership workspaces. The Siesta 142 blends contemporary styling with premium materials, ensuring superior comfort and ergonomic posture support alongside long-lasting durability.',
  colors: [
    { id: "siesta142-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/siesta_142.png" },
  ]
};

export const GRAVITY_143_DATA = {
  id: 'gravity-143',
  title: "Gravity 143",
  price: "₹10,700",
  series: 'DIRECTOR SERIES',
  description: 'Designed for executive workspaces, the Gravity 143 combines modern office aesthetics with long working comfort. Featuring premium cushioning, ergonomic support, and a polished chrome finish, it delivers an exceptional daily seating experience for dedicated executives.',
  colors: [
    { id: "gravity143-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/gravity_143.png" },
  ]
};

export const NEBULA_144_DATA = {
  id: 'nebula-144',
  title: "Nebula 144",
  price: "₹10,200",
  series: 'DIRECTOR SERIES',
  description: 'An elegant executive design crafted for corporate offices and executive cabins. The Nebula 144 features premium leather upholstery with refined stitching, offering superior comfort and high durability for demanding meetings and prolonged professional use.',
  colors: [
    { id: "nebula144-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/nebula_144.png" },
  ]
};

export const FLINT_145_DATA = {
  id: 'flint-145',
  title: "Flint 145",
  price: "₹8,400",
  series: 'DIRECTOR SERIES',
  description: 'Sophisticated executive seating tailored for leadership workspaces. The Flint 145 blends contemporary styling with premium materials, ensuring superior comfort and ergonomic posture support alongside long-lasting durability.',
  colors: [
    { id: "flint145-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/flint_145.png" },
  ]
};

export const SENATE_146_DATA = {
  id: 'senate-146',
  title: "Senate 146",
  price: "₹7,600",
  series: 'DIRECTOR SERIES',
  description: 'Designed for executive workspaces, the Senate 146 combines modern office aesthetics with long working comfort. Featuring premium cushioning, ergonomic support, and a polished chrome finish, it delivers an exceptional daily seating experience for dedicated executives.',
  colors: [
    { id: "senate146-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/senate_146.png" },
  ]
};

export const PRESIDENTIAL_147_DATA = {
  id: 'presidential-147',
  title: "Presidential 147",
  price: "₹9,300",
  series: 'DIRECTOR SERIES',
  description: 'An elegant executive design crafted for corporate offices and executive cabins. The Presidential 147 features premium leather upholstery with refined stitching, offering superior comfort and high durability for demanding meetings and prolonged professional use.',
  colors: [
    { id: "presidential147-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/presidential_147.png" },
  ]
};

export const STELLAR_148_DATA = {
  id: 'stellar-148',
  title: "Stellar 148",
  price: "₹8,800",
  series: 'DIRECTOR SERIES',
  description: 'Sophisticated executive seating tailored for leadership workspaces. The Stellar 148 blends contemporary styling with premium materials, ensuring superior comfort and ergonomic posture support alongside long-lasting durability.',
  colors: [
    { id: "stellar148-var1", name: "Colour Option 1", hex: "#000000", imagePath: "/images/stellar_148.png" },
  ]
};

export const STYLIZE_149_DATA = {
  id: 'stylize-149',
  title: "STYLIZE 149",
  price: "₹10,100",
  series: 'MESH SERIES',
  description: 'Designed for modern workspaces, STYLIZE 149 combines breathable mesh support, ergonomic comfort, and a sleek executive profile. Its adjustable headrest, contoured backrest, and durable construction deliver lasting comfort throughout extended working hours.',
  specifications: [
    "Premium Mesh Quality",
    "Ergonomic Design",
    "Adjustable Headrest",
    "Heavy Duty Base"
  ],
  colors: [
    { id: "stylize149-var1", name: "Black Mesh", hex: "#111111", imagePath: "/images/stylize-149-1.png" },
    { id: "stylize149-var2", name: "Grey Mesh", hex: "#888888", imagePath: "/images/stylize-149-2.png" },
    { id: "stylize149-var3", name: "White Mesh", hex: "#EAEAEA", imagePath: "/images/stylize-149-3.png" },
    { id: "stylize149-var4", name: "Blue Mesh", hex: "#2A4B7C", imagePath: "/images/stylize-149-4.png" },
  ]
};

export const FAB_150_DATA = {
  id: 'fab-150',
  title: "FAB 150",
  price: "₹6,300",
  series: 'MESH SERIES',
  description: 'FAB 150 is a modern ergonomic mesh office chair designed for everyday productivity and long-lasting comfort. Featuring a breathable mesh backrest, cushioned fabric seat, adjustable height mechanism, and durable nylon base, it delivers excellent posture support for offices, workstations, study spaces, and home work environments. Built for reliability, comfort, and everyday performance, FAB 150 combines practical functionality with a clean, contemporary design.',
  specifications: [
    "Premium Mesh Quality",
    "Ergonomic Design",
    "Adjustable Mechanism",
    "Heavy Duty Base"
  ],
  colors: [
    { id: "fab150-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/fab150-1.png" },
    { id: "fab150-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/fab150-2.png" }
  ]
};

export const MICRO_151_DATA = {
  id: 'micro-151',
  title: "MICRO 151",
  price: "₹6,200",
  series: 'MESH SERIES',
  description: 'A modern ergonomic office chair designed for everyday productivity and comfort. MICRO-151 features a breathable backrest, supportive cushioning, smooth mobility, and durable construction, making it ideal for offices, workstations, study spaces, and professional environments.',
  imagePath: "/images/micro151-2.png",
  colors: [
    { id: "micro151-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/micro151-2.png" },
    { id: "micro151-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/micro151-1.png" },
    { id: "micro151-var3", name: "Variant 3", hex: "#EAEAEA", imagePath: "/images/micro151-3.png" }
  ]
};

export const INKA_152_DATA = {
  id: 'inka-152',
  title: "INKA 152",
  price: "₹6,200",
  series: 'MESH SERIES',
  description: 'INKA-152 combines premium comfort with contemporary styling. Built for long working hours, it offers ergonomic support, refined craftsmanship, and dependable performance for executive offices, meeting rooms, and modern workspaces.',
  imagePath: "/images/inka152-1.png",
  colors: [
    { id: "inka152-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/inka152-1.png" },
    { id: "inka152-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/inka152-2.png" }
  ]
};

export const SIGNATURE_153_DATA = {
  id: 'signature-153',
  title: "SIGNATURE 153",
  price: "₹5,600",
  series: 'MESH SERIES',
  description: 'SIGNATURE-153 is a premium office seating solution crafted for executive comfort and timeless aesthetics. Featuring elegant design, ergonomic support, and high-quality materials, it is ideal for leadership spaces and professional environments.',
  imagePath: "/images/signature153-1.png",
  colors: [
    { id: "signature153-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/signature153-1.png" }
  ]
};

export const COSMO_154_DATA = {
  id: 'cosmo-154',
  title: "COSMO 154",
  price: "₹4,400",
  series: 'MESH SERIES',
  description: 'COSMO 154 is a premium office seating solution crafted for executive comfort and timeless aesthetics. Featuring elegant design, ergonomic support, and high-quality materials, it is ideal for leadership spaces and professional environments.',
  imagePath: "/images/cosmo154-1.png",
  colors: [
    { id: "cosmo154-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/cosmo154-1.png" },
    { id: "cosmo154-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/cosmo154-2.png" },
    { id: "cosmo154-var3", name: "Variant 3", hex: "#EAEAEA", imagePath: "/images/cosmo154-3.png" }
  ]
};

export const GALLIO_155_DATA = {
  id: 'gallio-155',
  title: "GALLIO 155",
  price: "₹6,100",
  series: 'MESH SERIES',
  description: 'GALLIO 155 is a premium office seating solution crafted for executive comfort and timeless aesthetics. Featuring elegant design, ergonomic support, and high-quality materials, it is ideal for leadership spaces and professional environments.',
  imagePath: "/images/gallio155-1.png",
  colors: [
    { id: "gallio155-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/gallio155-1.png" },
    { id: "gallio155-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/gallio155-2.png" }
  ]
};

export const ACHIEVE_156_DATA = {
  id: 'achieve-156',
  title: "ACHIEVE 156",
  price: "₹5,800",
  series: 'MESH SERIES',
  description: 'ACHIEVE 156 is a premium office seating solution crafted for executive comfort and timeless aesthetics. Featuring elegant design, ergonomic support, and high-quality materials, it is ideal for leadership spaces and professional environments.',
  imagePath: "/images/achieve156-1.png",
  colors: [
    { id: "achieve156-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/achieve156-1.png" },
    { id: "achieve156-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/achieve156-2.png" }
  ]
};

export const ADMIRE_157_DATA = {
  id: 'admire-157',
  title: "ADMIRE 157",
  price: "₹8,500",
  series: 'MESH SERIES',
  description: 'ADMIRE 157 is a premium office seating solution crafted for executive comfort and timeless aesthetics. Featuring elegant design, ergonomic support, and high-quality materials, it is ideal for leadership spaces and professional environments.',
  imagePath: "/images/admire157-1.png",
  colors: [
    { id: "admire157-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/admire157-1.png" },
    { id: "admire157-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/admire157-2.png" }
  ]
};

export const STELLE_158_DATA = {
  id: "stelle-158",
  series: "MESH SERIES",
  title: "STELLE 158",
  price: "₹8,100",
  description: "Designed for contemporary workspaces, STELLE 158 combines refined ergonomics, breathable comfort, and modern aesthetics. Engineered for long working hours with premium craftsmanship and reliable everyday performance.",
  colors: [
    { id: "stelle158-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/stelle158-1.png" },
    { id: "stelle158-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/stelle158-2.png" },
    { id: "stelle158-var3", name: "Variant 3", hex: "#EAEAEA", imagePath: "/images/stelle158-3.png" },
  ]
};

export const VERA_159_DATA = {
  id: "vera-159",
  series: "MESH SERIES",
  title: "VERA 159",
  price: "₹6,200",
  description: "Engineered for daily office productivity, VERA 159 offers a breathable ergonomic design and modern workstation comfort. Its premium build quality and professional aesthetics ensure long-lasting durability for any demanding workspace.",
  colors: [
    { id: "vera159-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/vera159-1.png" },
    { id: "vera159-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/vera159-2.png" },
  ]
};

export const WESLEY_160_DATA = {
  id: "wesley-160",
  series: "MESH SERIES",
  title: "WESLEY 160",
  price: "₹7,700",
  description: "Crafted for modern workstation aesthetics, WESLEY 160 delivers exceptional ergonomic office seating with breathable comfort. Its durable premium construction guarantees a smooth, long-hour seating experience for maximum daily productivity.",
  colors: [
    { id: "wesley160-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/wesley160-1.png" },
    { id: "wesley160-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/wesley160-2.png" },
  ]
};

export const GEORGIA_164_DATA = {
  id: "georgia-164",
  series: "WORKSTATION SERIES",
  title: "GEORGIA 164",
  price: "₹5,900",
  description: "GEORGIA 164 is engineered for everyday workplace comfort with a high-density cushioned seat, ergonomic support, and smooth height adjustment. Designed to enhance daily office productivity while delivering a professional workstation aesthetic for modern environments.",
  colors: [
    { id: "georgia164-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/georgia164-1.png" },
    { id: "georgia164-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/georgia164-2.png" },
  ]
};

export const ITALIA_165_DATA = {
  id: "italia-165",
  series: "WORKSTATION SERIES",
  title: "ITALIA 165",
  price: "₹7,100",
  description: "ITALIA 165 combines refined executive styling with ergonomic comfort, offering a generously cushioned seat, supportive backrest, and smooth mobility. Built for everyday productivity, it delivers lasting durability and a premium seating experience for modern professional environments.",
  colors: [
    { id: "italia165-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/italia165-1.png" },
    { id: "italia165-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/italia165-2.png" },
  ]
};

export const KINSLEY_161_DATA = {
  id: "kinsley-161",
  series: "MESH SERIES",
  title: "KINSLEY 161",
  price: "₹5,100",
  description: "Designed for modern office use, KINSLEY 161 combines breathable seating with advanced ergonomic comfort. Crafted from premium materials, it guarantees daily durability and elevates your productivity throughout the workday.",
  colors: [
    { id: "kinsley161-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/kinsley161-1.png" },
    { id: "kinsley161-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/kinsley161-2.png" },
  ]
};

export const ULTIMA_162_DATA = {
  id: "ultima-162",
  series: "MESH SERIES",
  title: "ULTIMA 162",
  price: "₹6,200",
  description: "ULTIMA 162 delivers unparalleled ergonomic comfort for the contemporary workspace. Its breathable seating and premium materials ensure exceptional daily durability, keeping you focused and productive for hours.",
  colors: [
    { id: "ultima162-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/ultima162-1.png" },
  ]
};

export const CHICEGO_163_DATA = {
  id: "chicego-163",
  series: "MESH SERIES",
  title: "CHICEGO 163",
  price: "₹6,900",
  description: "Experience ultimate productivity with CHICEGO 163, tailored for modern office use. Featuring breathable seating and premium materials, it provides lasting ergonomic comfort and reliable daily durability.",
  colors: [
    { id: "chicego163-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/chicego163-1.png" },
  ]
};

export const ZERLINA_166_DATA = {
  id: "zerlina-166",
  series: "WORKSTATION SERIES",
  title: "ZERLINA 166",
  price: "₹7,100",
  description: "Experience premium ergonomic support with ZERLINA 166. Designed for modern office aesthetics, it provides breathable seating and smooth mobility for long-hour comfort and exceptional durability.",
  colors: [
    { id: "zerlina166-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/zerlina166-1.png" },
    { id: "zerlina166-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/zerlina166-2.png" },
  ]
};

export const MILAN_167_DATA = {
  id: "milan-167",
  series: "WORKSTATION SERIES",
  title: "MILAN 167",
  price: "₹6,950",
  description: "MILAN 167 delivers superior ergonomic workstation seating with a sophisticated modern profile. Crafted for premium durability, its breathable design ensures focused productivity throughout your day.",
  colors: [
    { id: "milan167-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/milan167-1.png" },
    { id: "milan167-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/milan167-2.png" },
  ]
};

export const TRENTO_168_DATA = {
  id: "trento-168",
  series: "WORKSTATION SERIES",
  title: "TRENTO 168",
  price: "₹7,300",
  description: "Tailored for the contemporary professional, TRENTO 168 blends premium office aesthetics with advanced ergonomic comfort. Enjoy smooth mobility and steadfast support during extended working hours.",
  colors: [
    { id: "trento168-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/trento168-1.png" },
    { id: "trento168-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/trento168-2.png" },
  ]
};

export const GENOA_169_DATA = {
  id: "genoa-169",
  series: "CAFE SERIES",
  title: "GENOA 169",
  price: "₹5,400",
  description: "Designed for everyday office performance, GENOA 169 combines clean aesthetics with ergonomic support for long working hours. Its premium cushioning, smooth mobility and durable construction make it an excellent choice for modern workspaces seeking lasting comfort and reliability.",
  colors: [
    { id: "genoa169-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/genoa169-1.png" },
    { id: "genoa169-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/genoa169-2.png" },
  ]
};

export const MARKO_170_DATA = {
  id: "marko-170",
  series: "CAFE SERIES",
  title: "MARKO 170",
  price: "₹5,450",
  description: "MARKO 170 delivers a refined seating experience with plush comfort, elegant styling and dependable everyday performance. Built for professional environments, it offers ergonomic support, premium finishing and effortless movement throughout the workday.",
  colors: [
    { id: "marko170-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/marko170-1.png" },
    { id: "marko170-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/marko170-2.png" },
  ]
};

export const SYNERGY_171_DATA = {
  id: "synergy-171",
  series: "CAFE SERIES",
  title: "SYNERGY 171",
  price: "₹3,800",
  description: "Designed for premium spaces.",
  colors: [
    { id: "synergy171-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/synergy171-1.png" },
    { id: "synergy171-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/synergy171-2.png" },
  ]
};

export const PENTAGON_172_DATA = {
  id: "pentagon-172",
  series: "CAFE SERIES",
  title: "PENTAGON 172",
  price: "₹6,300",
  description: "Designed for premium spaces.",
  colors: [
    { id: "pentagon172-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/pentagon172-1.png" },
    { id: "pentagon172-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/pentagon172-2.png" },
  ]
};

export const PRESTON_173_DATA = {
  id: "preston-173",
  series: "CAFE SERIES",
  title: "PRESTON 173",
  price: "₹5,100",
  description: "PRESTON 173 is designed for modern workspaces, combining ergonomic comfort, durable construction and contemporary styling. Built for everyday productivity, it delivers reliable support, premium finishing and long-lasting performance for professional office environments.",
  colors: [
    { id: "preston173-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/preston173-1.png" },
    { id: "preston173-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/preston173-2.png" },
  ]
};

export const REGALIA_174_DATA = {
  id: "regalia-174",
  series: "CAFE SERIES",
  title: "REGALIA 174",
  price: "₹5,400",
  description: "REGALIA 174 offers a balanced combination of comfort, refined aesthetics and dependable durability. Designed for continuous office use, it provides ergonomic support, smooth mobility and a premium seating experience throughout the workday.",
  colors: [
    { id: "regalia174-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/regalia174-1.png" },
    { id: "regalia174-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/regalia174-2.png" },
  ]
};

export const MONTAGE_175_DATA = {
  id: "montage-175",
  series: "CAFE SERIES",
  title: "MONTAGE 175",
  price: "₹4,450",
  description: "MONTAGE 175 is crafted to deliver superior comfort with a clean modern design. Featuring ergonomic support, premium-quality materials and reliable performance, it is an ideal seating solution for contemporary workspaces.",
  colors: [
    { id: "montage175-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/montage175-1.png" },
    { id: "montage175-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/montage175-2.png" },
  ]
};

export const SOLITAIRE_176_DATA = {
  id: "solitaire-176",
  series: "CAFE SERIES",
  title: "SOLITAIRE 176",
  price: "₹5,700",
  description: "SOLITAIRE 176 blends elegant contemporary styling with premium comfort, making it an ideal choice for executive offices, meeting rooms and modern interiors. Featuring refined craftsmanship, superior cushioning and a durable frame, it delivers lasting support while enhancing the sophistication of every workspace.",
  colors: [
    { id: "solitaire176-var1", name: "Variant 1", hex: "#111111", imagePath: "/images/solitaire176-new-1.png" },
    { id: "solitaire176-var2", name: "Variant 2", hex: "#888888", imagePath: "/images/solitaire176-new-2.png" },
    { id: "solitaire176-var3", name: "Variant 3", hex: "#EAEAEA", imagePath: "/images/solitaire176-new-3.png" },
    { id: "solitaire176-var4", name: "Variant 4", hex: "#2A4B7C", imagePath: "/images/solitaire176-new-4.png" },
  ]
};


export const DirectorCard = memo(function DirectorCard({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [showToast, setShowToast] = useState(false);
  const [isEnquiryPopupOpen, setIsEnquiryPopupOpen] = useState(false);
  const [isPremiumViewerOpen, setIsPremiumViewerOpen] = useState(false);
  const { addToCart, showToast: showGlobalToast } = useCart();
  
  const currentImagePath = selectedColor ? selectedColor.imagePath : product.imagePath;

  const handleContactRequest = () => {
    const message = `Hello AZARO Team! 👋

I am interested in the *Custom Leather* option for your *${product.title}* chair.

Could you please share:

• All available leather colour options for this model
• Premium leather variants available
• Leather texture choices
• Finish options
• Material samples (if available)
• Custom leather customization options
• Any additional charges (if applicable)
• Expected delivery time for custom leather orders

I would like to explore all the custom leather options available for the *${product.title}* model before placing my order.

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
      title: product.title,
      text: "AZARO " + product.title,
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

  const premiumGridProducts = [
    'pearl-112', 'tulip-118', 'lavender-119', 'pluto-130', 'jupiter-131', 'cherry-133', 'flexi-134', 'crystal-138', 'aqua-139',
    'classic-126', 'pyramid-127', 'royal-128',
    'gold-103', 'silver-104', 'palladium-105',
    'diamond-106', 'coral-107', 'emerald-108',
    'lotus-114', 'rose-115', 'jasmine-116',
    'crown-122', 'dynamic-123', 'fantasy-124',
    'miraz-135', 'viva-136', 'nova-137',
    'mosaic-140', 'zante-141', 'siesta-142',
    'gravity-143', 'nebula-144', 'flint-145',
    'senate-146', 'presidential-147', 'stellar-148', 'stylize-149',
    'micro-151', 'inka-152', 'signature-153', 'cosmo-154',
    'gallio-155', 'achieve-156', 'admire-157',
    'kinsley-161', 'ultima-162', 'chicego-163',
    'zerlina-166', 'milan-167', 'trento-168',
    'synergy-171', 'pentagon-172', 'preston-173', 'regalia-174', 'montage-175'
  ];

  const premiumHighlightProducts = [
    'pyramid-127',
    'palladium-105',
    'coral-107',
    'rose-115',
    'dynamic-123',
    'viva-136',
    'zante-141',
    'nebula-144',
    'presidential-147',
    'pearl-112',
    'tulip-118',
    'lavender-119',
    'pluto-130',
    'jupiter-131',
    'cherry-133',
    'flexi-134',
    'crystal-138',
    'aqua-139',
    'inka-152',
    'cosmo-154',
    'achieve-156',
    'ultima-162',
    'milan-167',
    'synergy-171',
    'pentagon-172',
    'regalia-174'
  ];

  const isTargetProduct = premiumGridProducts.includes(product.id);
  const isHighlighted = premiumHighlightProducts.includes(product.id);

  if (isTargetProduct) {
    return (
      <div 
        className={`${styles.directorTargetCard} ${isHighlighted ? styles.premiumHighlightCard : ''}`}
      >
        {/* Preload images to avoid delay */}
        {product.colors && (
          <div style={{ display: 'none' }}>
            {product.colors.map((c: any) => <img key={`preload-${c.id}`} src={c.imagePath} alt="preload"  loading="lazy" decoding="async" />)}
          </div>
        )}

        {/* 1. Product Image */}
        <div 
          className={styles.directorSeriesImageWrapper} 
          style={
            isHighlighted ? {
              marginBottom: 0,
              border: '2px solid #D71920',
              borderRadius: '22px'
            } : { marginBottom: 0 }
          }
        >
          <img 
            src={currentImagePath} 
            alt={`${product.title} Chair`} 
            className={styles.directorSeriesImage} 
            loading="lazy" 
            decoding="async"
            style={{ cursor: "zoom-in" }}
            onClick={() => setIsPremiumViewerOpen(true)}
          />
        </div>

        {/* 2 & 3. Heading Group */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', margin: 0, width: '100%' }}>
          <span className={styles.seriesBadge} style={{ margin: 0 }}>{product.series || "DIRECTOR SERIES"}</span>
          <h3 className={styles.directorSeriesTitle} style={{ margin: 0 }}>{product.title}</h3>
          {product.price && <div className={styles.productPrice}>{product.price}</div>}
        </div>

        {/* 4 & 5. Colours Group */}
        {product.colors && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: 0, width: '100%' }}>
            <div className={styles.sectionHeadingBlack} style={{ margin: 0 }}>AVAILABLE COLOURS</div>
            <div className={styles.thumbnailSelectorsRow} style={{ margin: 0, justifyContent: 'center' }}>
              {product.colors.map((color: any) => (
                <div 
                  key={`swatch-${color.id}`}
                  className={`${styles.colorSwatch} ${selectedColor?.id === color.id ? styles.activeSwatch : ""}`}
                  style={getSwatchStyle(product.id, color.imagePath)}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
          </div>
        )}

        <CustomColorCard onClick={handleContactRequest} style={{ margin: '0 0 24px 0', width: '240px' }} />
        {/* 8. Purchase Section (REDESIGNED VERTICAL) */}
        <div className={styles.purchaseSection} style={{ width: '100%', margin: 0, flexDirection: 'column', alignItems: 'center' }}>
          <button 
            className={styles.addToCartBtn}
            style={{ width: '240px', flex: 'none' }}
            onClick={() => {
              addToCart({
                id: product.id,
                title: product.title,
                series: product.series || "DIRECTOR SERIES",
                colorId: selectedColor?.id,
                colorName: selectedColor?.name,
                imagePath: currentImagePath,
              });
              showGlobalToast("Added to Cart");
            }}
          >
            <ShoppingCart size={22} strokeWidth={1.5} style={{marginRight: '12px', flexShrink: 0}} />
            Add to Cart
          </button>

          <button 
            className={styles.placeOrderBtn}
            style={{ width: '240px', flex: 'none' }}
            onClick={handleWhatsAppOrder}
          >
            <ShoppingBag size={22} strokeWidth={1.5} style={{marginRight: '12px', flexShrink: 0}} />
            Place Order
          </button>

          <div style={{ position: 'relative' }}>
            <button 
              className={styles.shareBtn} 
              onClick={handleShare} 
              aria-label="Share Product"
              title="Share Product"
            >
              {showToast ? <Check size={22} strokeWidth={2} className={styles.toastCheck} /> : <Share2 size={22} strokeWidth={1.5} />}
            </button>
            {showToast && <div className={styles.toastNotification} style={{ bottom: '110%' }}>Link Copied!</div>}
          </div>
        </div>

        <EnquiryPopup 
          isOpen={isEnquiryPopupOpen} 
          onClose={() => setIsEnquiryPopupOpen(false)} 
          productName={product.title}
          selectedColorName={selectedColor ? selectedColor.name : "Default"}
          swatchPreview={
            selectedColor ? (
              <div 
                className={`${styles.colorSwatch} ${styles.activeSwatch}`}
                style={{ 
                  ...getSwatchStyle(product.id, selectedColor.imagePath),
                  cursor: 'default'
                }}
              />
            ) : null
          }
        />
        
        <PremiumImageViewer 
          isOpen={isPremiumViewerOpen}
          onClose={() => setIsPremiumViewerOpen(false)}
          imageSrc={currentImagePath}
          alt={`${product.title} Chair`}
        />
      </div>
    );
  }

  // DEFAULT LAYOUT FOR ALL OTHER PRODUCTS
  return (
    <div className={`${styles.directorSeriesCard} ${isHighlighted ? styles.premiumHighlightCard : ''}`}>
      {/* Preload images to avoid delay */}
      {product.colors && (
        <div style={{ display: 'none' }}>
          {product.colors.map((c: any) => <img key={`preload-${c.id}`} src={c.imagePath} alt="preload"  loading="lazy" decoding="async" />)}
        </div>
      )}
      <div className={styles.directorSeriesImageWrapper}>
        <img 
          src={currentImagePath} 
          alt={`${product.title} Chair`} 
          className={styles.directorSeriesImage} 
          loading="lazy" 
          decoding="async" 
          style={{ cursor: "zoom-in" }}
          onClick={() => setIsPremiumViewerOpen(true)}
        />
      </div>
      <div className={styles.headerTopRow}>
        <span className={styles.seriesBadge}>{product.series || "DIRECTOR SERIES"}</span>
        <h3 className={styles.directorSeriesTitle} style={{ margin: 0 }}>{product.title}</h3>
        {product.price && <div className={styles.productPrice}>{product.price}</div>}
      </div>

      {product.colors && (
        <div className={styles.colorsSection} style={{ marginTop: '16px', marginBottom: '16px' }}>
          <div className={styles.sectionHeadingBlack}>AVAILABLE COLOURS</div>
          <div className={styles.thumbnailSelectorsRow}>
            {product.colors.map((color: any) => (
              <div 
                key={`swatch-${color.id}`}
                className={`${styles.colorSwatch} ${selectedColor?.id === color.id ? styles.activeSwatch : ""}`}
                style={getSwatchStyle(product.id, color.imagePath)}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color.name}`}
              />
            ))}
          </div>
        </div>
      )}

      <CustomColorCard onClick={handleContactRequest} style={{ margin: '0 0 24px 0', width: '240px' }} />

      <div className={styles.purchaseSection} style={{ marginTop: 'auto', paddingTop: '16px' }}>
        <button 
          className={styles.addToCartBtn}
          onClick={() => {
            addToCart({
              id: product.id,
              title: product.title,
              series: product.series || "DIRECTOR SERIES",
              colorId: selectedColor?.id,
              colorName: selectedColor?.name,
              imagePath: currentImagePath,
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
        productName={product.title}
        selectedColorName={selectedColor ? selectedColor.name : "Default"}
        swatchPreview={
          selectedColor ? (
            <div 
              className={`${styles.colorSwatch} ${styles.activeSwatch}`}
              style={{ 
                ...getSwatchStyle(product.id, selectedColor.imagePath),
                cursor: 'default'
              }}
            />
          ) : null
        }
      />
      
      <PremiumImageViewer 
        isOpen={isPremiumViewerOpen}
        onClose={() => setIsPremiumViewerOpen(false)}
        imageSrc={currentImagePath}
        alt={`${product.title} Chair`}
      />
    </div>
  );
});

export default function ProductConfigurator() {
  // Preload images to avoid delay
  useEffect(() => {
    PRODUCTS_DATA.forEach(product => {
      product.colors.forEach(color => {
        const img = new Image();
        img.src = color.imagePath;
      });
    });
    DIRECTOR_PRODUCTS.forEach(product => {
      const img = new Image();
      img.src = product.imagePath;
    });
  }, []);

  return (
    <section id="configurator" className={styles.configuratorSection}>
      <div className={styles.productsStack}>
        {PRODUCTS_DATA.filter(p => !['sun-132', 'orchid-120', 'lily-121', 'heaven-125', 'mercury-129', 'coral-107', 'emerald-108', 'ivory-109', 'jasper-110', 'opal-111', 'ruby-113', 'daisy-117'].includes(p.id)).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.directorSeriesContainer}>
        <div className={styles.directorSeriesGrid}>
          {DIRECTOR_PRODUCTS.map(product => (
            <DirectorCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className={styles.productsStack}>
        {PRODUCTS_DATA.filter(p => ['coral-107', 'emerald-108', 'ivory-109', 'jasper-110', 'opal-111'].includes(p.id)).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.directorSeriesContainer}>
        <div className={styles.directorSeriesGrid}>
          <DirectorCard product={PEARL_112_DATA} />
          <div className={styles.uploadedImageContainer} style={{ gridColumn: 'span 2' }}>
            <img 
              src="/images/new-uploaded-decoration.jpg" 
              alt="Uploaded Chair Decoration" 
              className={styles.uploadedImage} 
             loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <div className={styles.productsStack}>
        {PRODUCTS_DATA.filter(p => p.id === 'ruby-113').map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.directorSeriesContainer}>
        <div className={styles.directorSeriesGrid}>
          <DirectorCard product={LOTUS_114_DATA} />
          <DirectorCard product={ROSE_115_DATA} />
          <DirectorCard product={JASMINE_116_DATA} />
        </div>
      </div>

      <div className={styles.productsStack}>
        {PRODUCTS_DATA.filter(p => p.id === 'daisy-117').map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.directorSeriesContainer}>
        <div className={styles.directorSeriesGrid}>
          <DirectorCard product={TULIP_118_DATA} />
          <div className={styles.uploadedImageContainer}>
            <img 
              src="/images/center-decor.jpg" 
              alt="Premium Showcase Image" 
              className={styles.uploadedImage} 
             loading="lazy" decoding="async" />
          </div>
          <DirectorCard product={LAVENDER_119_DATA} />
        </div>
      </div>

      <div className={styles.productsStack}>
        {PRODUCTS_DATA.filter(p => ['orchid-120', 'lily-121'].includes(p.id)).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.directorSeriesContainer}>
        <div className={styles.directorSeriesGrid}>
          <DirectorCard product={CROWN_122_DATA} />
          <DirectorCard product={DYNAMIC_123_DATA} />
          <DirectorCard product={FANTASY_124_DATA} />
        </div>
      </div>

      <div className={styles.productsStack}>
        {PRODUCTS_DATA.filter(p => p.id === 'heaven-125').map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.directorSeriesContainer}>
        <div className={styles.directorSeriesGrid}>
          <DirectorCard product={CLASSIC_126_DATA} />
          <DirectorCard product={PYRAMID_127_DATA} />
          <DirectorCard product={ROYAL_128_DATA} />
        </div>
      </div>

      <div className={styles.productsStack}>
        {PRODUCTS_DATA.filter(p => p.id === 'mercury-129').map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.directorSeriesContainer}>
        <div className={styles.directorSeriesGrid}>
          <DirectorCard product={PLUTO_130_DATA} />
          <div className={styles.uploadedImageContainer}>
            <img 
              src="/images/premium-showcase-130-131.png" 
              alt="Premium Showcase Image" 
              className={styles.uploadedImage} 
             loading="lazy" decoding="async" />
          </div>
          <DirectorCard product={JUPITER_131_DATA} />
        </div>
      </div>

      <div className={styles.productsStack}>
        {PRODUCTS_DATA.filter(p => p.id === 'sun-132').map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.directorSeriesContainer}>
        <div className={styles.directorSeriesGrid}>
          <DirectorCard product={CHERRY_133_DATA} />
          <DirectorCard product={FLEXI_134_DATA} />
          <DirectorCard product={CRYSTAL_138_DATA} />
          <DirectorCard product={AQUA_139_DATA} />
        </div>
      </div>

      <div className={styles.productsStack}>
        <ProductCard product={STYLIZE_149_DATA} />
      </div>
    </section>
  );
}
