import cv2
import numpy as np
import os
import glob

# Ensure we process all images mentioned, mapping the product names to file paths
# Actually, let's just process all pngs in public/images/ that contain these product names!
target_names = ["silver", "coral", "emerald", "ivory", "jasper", "opal", "pearl", "ruby", "lotus", "rose", "jasmine", "daisy", "tulip", "lavender", "diamond", "palladium"]

all_images = glob.glob('public/images/*.png') + glob.glob('public/images/*.jpg')
images_to_process = []
for p in all_images:
    for t in target_names:
        if t in p.lower():
            images_to_process.append(p)
            break

images_to_process = list(set(images_to_process))

for path in images_to_process:
    img = cv2.imread(path)
    if img is None:
        continue
        
    orig = img.copy()
    h, w = img.shape[:2]
    mask = np.zeros((h+2, w+2), np.uint8)
    
    # We use a generously large tolerance because backgrounds are smooth gradients
    # and shadows/chairs are usually significantly different.
    lo = (35, 35, 35)
    up = (35, 35, 35)
    flags = 4 | (255 << 8) | cv2.FLOODFILL_FIXED_RANGE
    
    cv2.floodFill(img, mask, (0,0), (255,255,255), lo, up, flags)
    cv2.floodFill(img, mask, (w-1,0), (255,255,255), lo, up, flags)
    cv2.floodFill(img, mask, (0,h-1), (255,255,255), lo, up, flags)
    cv2.floodFill(img, mask, (w-1,h-1), (255,255,255), lo, up, flags)
    
    m = mask[1:-1, 1:-1]
    
    # Smooth the mask for a soft anti-aliased edge
    m_smooth = cv2.GaussianBlur(m, (3,3), 0)
    blend = m_smooth.astype(np.float32) / 255.0
    blend = np.stack([blend]*3, axis=-1)
    
    # Blend pure white background
    result = orig.astype(np.float32) * (1 - blend) + 255.0 * blend
    result = np.clip(result, 0, 255).astype(np.uint8)
    
    cv2.imwrite(path, result)
    print(f"Processed {path} - background filled: {np.sum(m==255)/(h*w)*100:.1f}%")

print("All done.")
