import sys
import numpy as np
from PIL import Image

def get_patch_stats(img_path, x_pct, y_pct):
    img = Image.open(img_path).convert('RGBA')
    width, height = img.size
    
    # In CSS background-position: x% y% with 2500% size, 
    # the image is scaled by 25x.
    # The center of the patch will be at the given percentage.
    x = int(width * (x_pct / 100.0))
    y = int(height * (y_pct / 100.0))
    
    # 44px swatch / 25 = about 1.76px. But let's just grab a 20x20 patch to see if it's transparent or background.
    left = max(0, x - 10)
    top = max(0, y - 10)
    right = min(width, x + 10)
    bottom = min(height, y + 10)
    
    patch = img.crop((left, top, right, bottom))
    data = np.array(patch)
    pixels = data.reshape(-1, 4)
    
    transparent_ratio = np.mean(pixels[:, 3] < 200)
    white_ratio = np.mean((pixels[:, 0] > 240) & (pixels[:, 1] > 240) & (pixels[:, 2] > 240))
    
    return transparent_ratio, white_ratio, np.mean(pixels[:, :3], axis=0)

print("x_pct, y_pct | trans_ratio | white_ratio | mean_rgb")
for y in range(10, 40, 5):
    for x in range(35, 55, 5):
        t, w, rgb = get_patch_stats("public/images/plat102_1.png", x, y)
        if t < 0.1 and w < 0.1:
            print(f"{x}%, {y}% | {t:.2f} | {w:.2f} | {rgb}")

