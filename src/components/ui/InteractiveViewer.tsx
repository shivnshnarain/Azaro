"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import PremiumImageViewer from "./PremiumImageViewer";

interface InteractiveViewerProps {
  staticImage: string;
  model3D?: string; // Path to a .glb or .gltf file
  imageSequence?: {
    template: string; // e.g., "/images/360/black/chair_{index}.png"
    count: number; // e.g., 36
    zeroPad?: number; // e.g., 3 for 000, 010...
  };
  customOverlayHex?: string | null;
  alt: string;
  className?: string;
}

// 3D Model Component
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function InteractiveViewer({
  staticImage,
  model3D,
  imageSequence,
  customOverlayHex,
  alt,
  className,
}: InteractiveViewerProps) {
  // State for Image Sequence Viewer
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const sequenceImages = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Premium Image Viewer State
  const [isPremiumViewerOpen, setIsPremiumViewerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

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
    setIsPremiumViewerOpen(true);
  };

  // Preload Image Sequence if provided
  useEffect(() => {
    if (!imageSequence) return;

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < imageSequence.count; i++) {
      const img = new Image();
      // Calculate angle if named chair_000, chair_010 etc.
      let indexStr = i.toString();
      if (imageSequence.zeroPad) {
        // Assume 36 frames = 10 degree increments
        const degrees = i * (360 / imageSequence.count);
        indexStr = degrees.toString().padStart(imageSequence.zeroPad, "0");
      }
      
      img.src = imageSequence.template.replace("{index}", indexStr);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageSequence.count) {
          setImagesLoaded(true);
        }
      };
      // For fast local dev or cached images, onload might fire instantly
      images.push(img);
    }
    sequenceImages.current = images;
  }, [imageSequence]);

  // Drag handlers for image sequence
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !imageSequence) return;

    const deltaX = e.clientX - startX.current;
    const sensitivity = 5; // Pixels per frame change

    if (Math.abs(deltaX) > sensitivity) {
      // Calculate frame shift
      const shift = deltaX > 0 ? -1 : 1;
      
      setCurrentFrame((prev) => {
        let next = prev + shift;
        if (next < 0) next = imageSequence.count - 1;
        if (next >= imageSequence.count) next = 0;
        return next;
      });
      
      startX.current = e.clientX;
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // 1. RENDER 3D MODEL
  if (model3D) {
    return (
      <div className={className} style={{ width: "100%", height: "100%", cursor: "grab" }}>
        <Suspense fallback={<img src={staticImage} alt={alt} className={className}  loading="lazy" decoding="async" />}>
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
            <Stage environment="city" intensity={0.5}>
              <Model url={model3D} />
            </Stage>
            <OrbitControls autoRotate autoRotateSpeed={2.0} enableZoom={true} />
          </Canvas>
        </Suspense>
      </div>
    );
  }

  // 2. RENDER 36-IMAGE SEQUENCE
  if (imageSequence && imagesLoaded) {
    return (
      <div
        className={className}
        style={{ cursor: isDragging ? "grabbing" : "grab", userSelect: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <img
          src={sequenceImages.current[currentFrame]?.src || staticImage}
          alt={`${alt} - 360 View`}
          className={className}
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
          loading="lazy" decoding="async" />
        {/* Helper overlay for UX */}
        <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", fontSize: "0.75rem", color: "#666", display: "flex", alignItems: "center", gap: "0.5rem", pointerEvents: "none" }}>
          <span>↔</span> Drag to rotate
        </div>
        
        {/* Open Viewer Button / Area */}
        <button 
          style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.8)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          onClick={handleZoomClick}
          title="Fullscreen View"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
        </button>

        <PremiumImageViewer 
          isOpen={isPremiumViewerOpen}
          onClose={() => setIsPremiumViewerOpen(false)}
          imageSrc={sequenceImages.current[currentFrame]?.src || staticImage}
          alt={alt}
        />
      </div>
    );
  }

  // 3. RENDER CUSTOM COLOR OVERLAY
  if (customOverlayHex) {
    return (
      <div 
        className={className} 
        style={{ cursor: isDesktop ? "zoom-in" : "default", position: "relative" }}
        onClick={handleZoomClick}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="custom-color-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ position: "relative", width: "100%", height: "100%" }}
          >
          {/* Base white chair */}
          <img 
            src="/images/white-chair-master.png" 
            alt="Custom Chair Base" 
            className={className} 
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
           loading="lazy" decoding="async" />
          {/* Tint overlay masked to leather only */}
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
              height: "100%"
            }}
          />
        </motion.div>
      </AnimatePresence>

      <PremiumImageViewer 
        isOpen={isPremiumViewerOpen}
        onClose={() => setIsPremiumViewerOpen(false)}
        imageSrc={staticImage} // Unused technically, but required
        customOverlayHex={customOverlayHex}
        alt={alt}
      />
    </div>
    );
  }

  // 4. FALLBACK: RENDER STATIC IMAGE
  return (
    <>
      <div 
        className={className} 
        style={{ cursor: isDesktop ? "zoom-in" : "default", position: "relative" }}
        onClick={handleZoomClick}
      >
        <img
          src={staticImage}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          loading="lazy" 
          decoding="async" 
        />
      </div>
      
      <PremiumImageViewer 
        isOpen={isPremiumViewerOpen}
        onClose={() => setIsPremiumViewerOpen(false)}
        imageSrc={staticImage}
        alt={alt}
      />
    </>
  );
}
