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
    
    # standard deviation of rgb values to detect stitching/wrinkles
    std_dev = np.std(pixels[:, :3], axis=0).mean()
    
    return transparent_ratio, white_ratio, std_dev, np.mean(pixels[:, :3], axis=0)

images = {
    'orchid': 'public/images/orchid120-1.png',
    'daisy': 'public/images/daisy117-1.png',
    'ruby': 'public/images/ruby113-1.png',
    'sun': 'public/images/sun132-1.png'
}

for name, path in images.items():
    print(f"--- {name} ---")
    best_pos = None
    min_std = 9999
    # Search upper left quadrant
    for y in range(15, 35, 5):
        for x in range(25, 45, 5):
            t, w, std, rgb = get_patch_stats(path, x, y)
            # Only consider solid patches (no transparent background or pure white studio background)
            if t < 0.05 and w < 0.05:
                print(f"x: {x}%, y: {y}% | std: {std:.2f} | rgb: {rgb}")
                if std < min_std:
                    min_std = std
                    best_pos = (x, y)
    print(f"BEST FOR {name}: {best_pos} with std {min_std:.2f}\n")
