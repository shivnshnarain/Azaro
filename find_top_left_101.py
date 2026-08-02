import sys
import numpy as np
from PIL import Image

def get_patch_stats(img_path, x_pct, y_pct):
    img = Image.open(img_path).convert('RGBA')
    width, height = img.size
    x = int(width * (x_pct / 100.0))
    y = int(height * (y_pct / 100.0))
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

print(get_patch_stats("public/images/plat101-2-new.png", 30, 20))
print(get_patch_stats("public/images/plat101-2-new.png", 35, 20))
print(get_patch_stats("public/images/plat101-2-new.png", 40, 20))
