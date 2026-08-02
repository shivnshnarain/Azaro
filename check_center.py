from PIL import Image
import os

img = Image.open('public/images/plat102-1.png')
w, h = img.size
# Crop center 1/25th of the image (since backgroundSize is 2500%, which is 25x zoom)
crop_w = w / 25
crop_h = h / 25
left = (w - crop_w) / 2
top = (h - crop_h) / 2
right = (w + crop_w) / 2
bottom = (h + crop_h) / 2

cropped = img.crop((left, top, right, bottom))
cropped.save('test_crop_102_1.png')

print(f"Center crop saved for plat102-1.png. Is it transparent? {cropped.getextrema()}")
