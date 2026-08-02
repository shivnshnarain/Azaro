from PIL import Image
import glob
import os

def fix_image(path):
    try:
        img = Image.open(path).convert('RGB')
        
        # Smoothly map [180, 240] to [180, 255]
        # Any pixel > 240 will be clipped to 255 (Pure White)
        lut = []
        for i in range(256):
            if i < 180:
                lut.append(i)
            else:
                val = int(180 + (i - 180) * (75.0 / 60.0))
                lut.append(min(255, val))
                
        # point() expects a flat list for all bands if mode is RGB, so we duplicate the lut 3 times
        img = img.point(lut * 3)
        
        img.save(path)
        print(f"Fixed {path}")
    except Exception as e:
        print(f"Error on {path}: {e}")

if __name__ == "__main__":
    for path in glob.glob('public/images/*.png'):
        fix_image(path)
    for path in glob.glob('public/images/*.jpg'):
        fix_image(path)
    print("Done all.")
