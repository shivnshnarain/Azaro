# Aazaro E-Commerce

## Product Configurator & 360° Viewer

The Platinum 101 product page includes an advanced, future-ready 360° Interactive Viewer that seamlessly falls back to high-quality static images. 

### 1. Managing the Static Images
The 5 official, approved chair images are stored in the public folder:
- `public/images/platinum-101-black.png`
- `public/images/platinum-101-white.png`
- `public/images/platinum-101-cream.png`
- `public/images/platinum-101-maroon.png`
- `public/images/platinum-101-brown.png`

**To replace them in the future:**
Simply overwrite these existing `.png` files in the `public/images/` folder with your new images. Ensure the filenames remain exactly the same. No code changes are required.

### 2. Enabling the 360° 3D Viewer (with a .glb model)
If you acquire a 3D model of the chair, you can enable a full 3D interactive viewer instantly:
1. Place your `.glb` or `.gltf` model in the `public/images/` folder (e.g., `platinum-101-black.glb`).
2. Open `src/components/sections/ProductConfigurator.tsx`.
3. Locate the `COLORS` array and add a `modelPath` property to the color:
   ```ts
   { id: "black", name: "Black", hex: "#1A1A1A", imagePath: "/images/platinum-101-black.png", modelPath: "/images/platinum-101-black.glb" }
   ```
4. Scroll down to the `<InteractiveViewer />` component inside the same file and uncomment the `model3D` prop:
   ```tsx
   <InteractiveViewer 
     staticImage={selectedColor.imagePath}
     model3D={selectedColor.modelPath} // <-- Uncomment this line
     alt={`Platinum 101 Chair in ${selectedColor.name}`}
   />
   ```

### 3. Enabling the 360° Image Slider (with 36 photos)
If you acquire 36 physical photos taken on a turntable (instead of a 3D model), you can enable the drag-to-rotate sequence viewer:
1. Create a folder for the sequence, e.g., `public/images/360/black/`.
2. Name the images sequentially using angles (e.g., `chair_000.png`, `chair_010.png`, `chair_020.png`, up to `chair_350.png`).
3. Open `src/components/sections/ProductConfigurator.tsx`.
4. Locate the `<InteractiveViewer />` component and uncomment/edit the `imageSequence` prop:
   ```tsx
   <InteractiveViewer 
     staticImage={selectedColor.imagePath}
     imageSequence={{ template: `/images/360/${selectedColor.id}/chair_{index}.png`, count: 36, zeroPad: 3 }} // <-- Uncomment this line
     alt={`Platinum 101 Chair in ${selectedColor.name}`}
   />
   ```

The system is highly optimized and handles preloading automatically. The UI requires zero structural changes to support these future enhancements.
# azaro
