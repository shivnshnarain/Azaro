import cv2
import numpy as np

img = cv2.imread('public/images/ruby113-1.png')
h, w = img.shape[:2]
mask = np.zeros((h+2, w+2), np.uint8)

# Floodfill from 4 corners
lo = (30, 30, 30)
up = (30, 30, 30)
flags = 4 | (255 << 8) | cv2.FLOODFILL_FIXED_RANGE

cv2.floodFill(img, mask, (0,0), (255,255,255), lo, up, flags)
cv2.floodFill(img, mask, (w-1,0), (255,255,255), lo, up, flags)
cv2.floodFill(img, mask, (0,h-1), (255,255,255), lo, up, flags)
cv2.floodFill(img, mask, (w-1,h-1), (255,255,255), lo, up, flags)

# Count how many pixels were filled
filled = np.sum(mask == 255)
total = h * w
print(f"Filled {filled} out of {total} pixels ({filled/total*100:.1f}%)")

cv2.imwrite('test_cv_flood_out.png', img)
