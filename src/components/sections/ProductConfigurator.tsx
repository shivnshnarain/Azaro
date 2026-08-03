"use client";

import { PRODUCTS_DATA, DIRECTOR_PRODUCTS, PEARL_112_DATA, CROWN_122_DATA, DYNAMIC_123_DATA, FANTASY_124_DATA, LOTUS_114_DATA, ROSE_115_DATA, JASMINE_116_DATA, CLASSIC_126_DATA, PYRAMID_127_DATA, ROYAL_128_DATA, TULIP_118_DATA, LAVENDER_119_DATA, PLUTO_130_DATA, JUPITER_131_DATA, CHERRY_133_DATA, FLEXI_134_DATA, MIRAZ_135_DATA, VIVA_136_DATA, NOVA_137_DATA, CRYSTAL_138_DATA, AQUA_139_DATA, MOSAIC_140_DATA, ZANTE_141_DATA, SIESTA_142_DATA, GRAVITY_143_DATA, NEBULA_144_DATA, FLINT_145_DATA, SENATE_146_DATA, PRESIDENTIAL_147_DATA, STELLAR_148_DATA, STYLIZE_149_DATA, FAB_150_DATA, MICRO_151_DATA, INKA_152_DATA, SIGNATURE_153_DATA, COSMO_154_DATA, GALLIO_155_DATA, ACHIEVE_156_DATA, ADMIRE_157_DATA, STELLE_158_DATA, VERA_159_DATA, WESLEY_160_DATA, GEORGIA_164_DATA, ITALIA_165_DATA, KINSLEY_161_DATA, ULTIMA_162_DATA, CHICEGO_163_DATA, ZERLINA_166_DATA, MILAN_167_DATA, TRENTO_168_DATA, GENOA_169_DATA, MARKO_170_DATA, SYNERGY_171_DATA, PENTAGON_172_DATA, PRESTON_173_DATA, REGALIA_174_DATA, MONTAGE_175_DATA, SOLITAIRE_176_DATA } from "@/data/productsData";
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
    const productUrl = `${window.location.origin}/products/${product.id}`;
    const shareData = {
      title: `AZARO | ${product.title}`,
      text: `Check out the premium ${product.title} chair by AZARO.`,
      url: productUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(productUrl);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, [product.title, product.description]);

  const staticHeader = useMemo(() => (
    <div className={styles.headerTopRow}>
      <span className={styles.seriesBadge}>{product.series}</span>
      <div style={{ display: 'flex', flexDirection: 'column', width: 'max-content' }}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        {product.price && (
          <div className={styles.priceContainer}>
            {product.mrp && <div className={styles.mrpText}>MRP {product.mrp}</div>}
            <div className={styles.finalPriceText}>{product.price}</div>
            {product.discount && <div className={styles.savingsText}>You Save {product.discount}%</div>}
          </div>
        )}
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
    <div id={`product-${product.id}`} className={styles.mainProductCard} style={{ scrollMarginTop: '100px' }}>
      {/* Preload images to avoid delay */}
      <div style={{ display: 'none' }}>
        {product.colors.map((c: any) => <img key={`preload-${c.id}`} src={c.imagePath} alt="preload"  loading="lazy" decoding="async" />)}
      </div>
      
      {/* LEFT COLUMN (45%) */}
      <div className={styles.leftColumn}>
        <div className={styles.productImageWrapper}>
          {product.discount && (
            <div className={styles.discountBadge}>
              <span className={styles.discountBadgePercent}>{product.discount}%</span>
              <span className={styles.discountBadgeText}>OFF</span>
            </div>
          )}
          <InteractiveViewer 
            staticImage={selectedColor.imagePath}
            alt={`${product.title} Chair`}
            className={styles.productImage}
          />
        </div>
      </div>

      {/* RIGHT COLUMN (55%) */}
      <div className={styles.rightColumn}>
        {staticHeader}
          
        <div className={styles.colorsSection} style={{ margin: '0 0 24px 0', width: '100%' }}>
          <div className={styles.sectionHeadingBlack}>AVAILABLE COLOURS</div>
          <div className={styles.colorsRowWrapper}>
            <div className={styles.thumbnailSelectorsRow} style={{ marginBottom: '-8px' }}>
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





























































export const DirectorCard = memo(function DirectorCard({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [showToast, setShowToast] = useState(false);
  const [isEnquiryPopupOpen, setIsEnquiryPopupOpen] = useState(false);
  const [isPremiumViewerOpen, setIsPremiumViewerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const { addToCart, showToast: showGlobalToast } = useCart();
  
  const currentImagePath = selectedColor ? selectedColor.imagePath : product.imagePath;

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handleZoomClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isDesktop) {
      setIsPremiumViewerOpen(true);
    }
  };

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
    const productUrl = `${window.location.origin}/products/${product.id}`;
    const shareData = {
      title: `AZARO | ${product.title}`,
      text: `Check out the premium ${product.title} chair by AZARO.`,
      url: productUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(productUrl);
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
        id={`product-${product.id}`}
        className={`${styles.directorTargetCard} ${isHighlighted ? styles.premiumHighlightCard : ''}`}
        style={{ scrollMarginTop: '100px' }}
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
          style={{ marginBottom: 0 }}
        >
          {product.discount && (
            <div className={styles.discountBadge}>
              <span className={styles.discountBadgePercent}>{product.discount}%</span>
              <span className={styles.discountBadgeText}>OFF</span>
            </div>
          )}
          <img 
            src={currentImagePath} 
            alt={`${product.title} Chair`} 
            className={styles.directorSeriesImage} 
            loading="lazy" 
            decoding="async"
            style={{ cursor: isDesktop ? "zoom-in" : "default" }}
            onClick={handleZoomClick}
          />
        </div>

        {/* 2 & 3. Heading Group */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', margin: 0, width: '100%' }}>
          <span className={styles.seriesBadge} style={{ margin: 0 }}>{product.series || "DIRECTOR SERIES"}</span>
          <h3 className={styles.directorSeriesTitle} style={{ margin: 0 }}>{product.title}</h3>
          {product.price && (
            <div className={styles.priceContainer} style={{ alignItems: 'center', marginTop: '4px' }}>
              {product.mrp && <div className={styles.mrpText}>MRP {product.mrp}</div>}
              <div className={styles.finalPriceText}>{product.price}</div>
              {product.discount && <div className={styles.savingsText}>You Save {product.discount}%</div>}
            </div>
          )}
        </div>

        {/* 4 & 5. Colours Group */}
        {product.colors && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: 0, width: '100%' }}>
            <div className={styles.sectionHeadingBlack} style={{ margin: 0 }}>AVAILABLE COLOURS</div>
            <div className={styles.thumbnailSelectorsRow} style={{ margin: '-8px', justifyContent: 'center' }}>
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

        <CustomColorCard onClick={handleContactRequest} style={{ margin: '0 0 24px 0' }} />
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
    <div id={`product-${product.id}`} className={`${styles.directorSeriesCard} ${isHighlighted ? styles.premiumHighlightCard : ''}`} style={{ scrollMarginTop: '100px' }}>
      {/* Preload images to avoid delay */}
      {product.colors && (
        <div style={{ display: 'none' }}>
          {product.colors.map((c: any) => <img key={`preload-${c.id}`} src={c.imagePath} alt="preload"  loading="lazy" decoding="async" />)}
        </div>
      )}
      <div className={styles.directorSeriesImageWrapper}>
        {product.discount && (
          <div className={styles.discountBadge}>
            <span className={styles.discountBadgePercent}>{product.discount}%</span>
            <span className={styles.discountBadgeText}>OFF</span>
          </div>
        )}
        <img 
          src={currentImagePath} 
          alt={`${product.title} Chair`} 
          className={styles.directorSeriesImage} 
          loading="lazy" 
          decoding="async" 
          style={{ cursor: isDesktop ? "zoom-in" : "default" }}
          onClick={handleZoomClick}
        />
      </div>
      <div className={styles.headerTopRow}>
        <span className={styles.seriesBadge}>{product.series || "DIRECTOR SERIES"}</span>
        <h3 className={styles.directorSeriesTitle} style={{ margin: 0 }}>{product.title}</h3>
        {product.price && (
          <div className={styles.priceContainer} style={{ marginTop: '4px' }}>
            {product.mrp && <div className={styles.mrpText}>MRP {product.mrp}</div>}
            <div className={styles.finalPriceText}>{product.price}</div>
            {product.discount && <div className={styles.savingsText}>You Save {product.discount}%</div>}
          </div>
        )}
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

      <CustomColorCard onClick={handleContactRequest} style={{ margin: '0 0 24px 0' }} />

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
