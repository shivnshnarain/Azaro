import glob
from PIL import Image, ImageEnhance

# Target exactly the Hero Section images that were modified
images = glob.glob('/Users/shivanshnarain/aazaro/public/images/hero-new-*.jpg')

for path in images:
    try:
        img = Image.open(path).convert("RGB")
        
        # Invert the previous transformations in reverse order
        
        # 1. Reverse Sharpness (previously 0.4) -> 1 / 0.4 = 2.5
        sharpness_enhancer = ImageEnhance.Sharpness(img)
        img = sharpness_enhancer.enhance(2.5)
        
        # 2. Reverse Contrast (previously 0.80) -> 1 / 0.80 = 1.25
        contrast_enhancer = ImageEnhance.Contrast(img)
        img = contrast_enhancer.enhance(1.25)
        
        # 3. Reverse Color / Saturation (previously 0.65) -> 1 / 0.65 ≈ 1.53846
        color_enhancer = ImageEnhance.Color(img)
        img = color_enhancer.enhance(1.53846)
        
        img.save(path, "JPEG", quality=95)
        print(f"Successfully reversed modifications for: {path}")
    except Exception as e:
        print(f"Error processing {path}: {e}")
