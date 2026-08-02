from PIL import Image
import glob
import os

def fix_image(path):
    try:
        img = Image.open(path).convert('RGB')
        
        # We want to map [150, 215] to [150, 255]
        # Anything > 215 becomes 255 (Pure White)
        # Anything < 150 remains unchanged
        
        img = img.point(lambda p: p if p < 150 else min(255, int(150 + (p - 150) * (105.0 / 65.0))))
        
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
