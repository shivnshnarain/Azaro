import sys
import numpy as np
from PIL import Image

def get_crop(img_path, x_pct, y_pct):
    img = Image.open(img_path).convert('RGBA')
    width, height = img.size
    
    x = int(width * (x_pct / 100.0))
    y = int(height * (y_pct / 100.0))
    
    # 2500% scale means the container shows 1/25th of the image width
    crop_w = width // 25
    crop_h = crop_w
    
    left = x - crop_w // 2
    top = y - crop_h // 2
    right = left + crop_w
    bottom = top + crop_h
    
    return img.crop((left, top, right, bottom))

images = {
    'sun': 'public/images/sun132-1.png',
    'ruby': 'public/images/ruby113-1.png',
    'orchid': 'public/images/orchid120-1.png',
    'daisy': 'public/images/daisy117-1.png'
}

positions = [(30, 20), (35, 20), (40, 20), (30, 25), (35, 25), (40, 25)]

out = Image.new('RGBA', (6 * 100, 4 * 100))

for y_idx, (name, path) in enumerate(images.items()):
    for x_idx, pos in enumerate(positions):
        crop = get_crop(path, pos[0], pos[1])
        crop = crop.resize((100, 100))
        out.paste(crop, (x_idx * 100, y_idx * 100))

out.save('crops_preview.png')
print("Saved crops_preview.png")
