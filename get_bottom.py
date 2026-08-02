import cv2
import numpy as np

images = [f'public/images/new_panel{i}.jpg' for i in range(1, 6)]

bottoms = []
for i, path in enumerate(images):
    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # The backgrounds are light (gradient around 200-220). Chairs are darker.
    # Let's threshold to find the chair
    _, thresh = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY_INV)
    
    # Find bounding box
    coords = cv2.findNonZero(thresh)
    if coords is not None:
        x, y, w, h = cv2.boundingRect(coords)
        bottoms.append(y + h)
    else:
        bottoms.append(0)

for i, b in enumerate(bottoms):
    print(f'Panel {i+1} chair bottom at y={b} (total height 1844/1846)')
