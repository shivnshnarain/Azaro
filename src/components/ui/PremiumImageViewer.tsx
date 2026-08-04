"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "./PremiumImageViewer.module.css";

interface PremiumImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
  customOverlayHex?: string | null;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_SPEED = 0.2;
const LENS_SIZE = 115; // 115px diameter
const MAGNIFIER_POWER = 1.9; // 1.9x zoom relative to the image size on screen

export default function PremiumImageViewer({ isOpen, onClose, imageSrc, alt, customOverlayHex }: PremiumImageViewerProps) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Pinch-to-zoom state
  const initialPinchDistance = useRef<number | null>(null);
  const initialPinchZoom = useRef<number>(1);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle keyboard events (ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setZoom((z) => Math.min(z + ZOOM_SPEED, MAX_ZOOM));
    } else {
      setZoom((z) => Math.max(z - ZOOM_SPEED, MIN_ZOOM));
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoom > 1) {
      setZoom(1);
    } else {
      setZoom(2.5); // Double click to zoom in to 2.5x
    }
  };


  // Mobile Pinch to Zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      initialPinchDistance.current = dist;
      initialPinchZoom.current = zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance.current !== null) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      
      const scale = dist / initialPinchDistance.current;
      const newZoom = initialPinchZoom.current * scale;
      
      setZoom(Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM));
    }
  };

  const handleTouchEnd = () => {
    initialPinchDistance.current = null;
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <button className={styles.closeButtonTop} onClick={onClose} aria-label="Close viewer">
            <X size={24} strokeWidth={1.5} />
          </button>

          <div
            ref={containerRef}
            className={styles.imageContainer}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the container
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
          >
            {customOverlayHex ? (
              <motion.div
                ref={imageRef as any}
                className={styles.mainImage}
                drag={zoom > 1}
                dragConstraints={containerRef}
                dragElastic={0.1}
                animate={{ scale: zoom, x: zoom === 1 ? 0 : undefined, y: zoom === 1 ? 0 : undefined }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                style={{ 
                  cursor: zoom > 1 ? "grab" : "default",
                  touchAction: zoom > 1 ? "none" : "auto",
                  position: "relative",
                  display: "inline-block"
                }}
                whileDrag={{ cursor: "grabbing" }}
              >
                <img 
                  src="/images/white-chair-master.png" 
                  alt={alt} 
                  style={{ 
                    display: "block",
                    maxWidth: "90vw", 
                    maxHeight: "90vh", 
                    width: "auto", 
                    height: "auto", 
                    pointerEvents: "none" 
                  }}
                  draggable={false}
                />
                <div 
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: customOverlayHex,
                    mixBlendMode: "multiply",
                    WebkitMaskImage: 'url("/images/leather-mask.png")',
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: 'url("/images/leather-mask.png")',
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none"
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                ref={imageRef as any}
                className={styles.mainImage}
                drag={zoom > 1}
                dragConstraints={containerRef}
                dragElastic={0.1}
                animate={{ scale: zoom, x: zoom === 1 ? 0 : undefined, y: zoom === 1 ? 0 : undefined }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                style={{ 
                  cursor: zoom > 1 ? "grab" : "default",
                  touchAction: zoom > 1 ? "none" : "auto",
                  position: "relative",
                  display: "inline-block"
                }}
                whileDrag={{ cursor: "grabbing" }}
              >
                <img 
                  src={imageSrc} 
                  alt={alt}
                  style={{ 
                    display: "block",
                    maxWidth: "90vw", 
                    maxHeight: "90vh", 
                    width: "auto", 
                    height: "auto", 
                    pointerEvents: "none" 
                  }}
                  draggable={false}
                />
              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return mounted ? createPortal(content, document.body) : null;
}
