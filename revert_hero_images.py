import glob
from PIL import Image, ImageEnhance

# Target exactly the Hero Section images that have the enhancements
images = glob.glob('/Users/shivanshnarain/aazaro/public/images/hero-new-*.jpg')

for path in images:
    try:
        img = Image.open(path).convert("RGB")
        
        # 1. Reduce excessive color saturation / vibrance (back to natural levels)
        color_enhancer = ImageEnhance.Color(img)
        img = color_enhancer.enhance(0.65) # Reduces artificial saturation
        
        # 2. Reduce excessive contrast (return to balanced look)
        contrast_enhancer = ImageEnhance.Contrast(img)
        img = contrast_enhancer.enhance(0.80) # Soften the harsh contrast
        
        # 3. Reduce artificial sharpness
        sharpness_enhancer = ImageEnhance.Sharpness(img)
        img = sharpness_enhancer.enhance(0.4) # Soften the edges to natural look
        
        # 4. Slight brightness adjustment to compensate for contrast reduction if necessary
        # brightness_enhancer = ImageEnhance.Brightness(img)
        # img = brightness_enhancer.enhance(1.05)
        
        img.save(path, "JPEG", quality=95)
        print(f"Successfully restored natural appearance for: {path}")
    except Exception as e:
        print(f"Error processing {path}: {e}")
