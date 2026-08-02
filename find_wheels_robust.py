import cv2
import numpy as np

for i in range(1, 6):
    img = cv2.imread(f'public/images/new_panel{i}.jpg')
    h, w = img.shape[:2]
    
    crop_h = 600
    # Crop horizontally to ignore border gradients
    bottom = img[-crop_h:, 50:-50]
    
    gray = cv2.cvtColor(bottom, cv2.COLOR_BGR2GRAY)
    
    # Blur slightly to remove noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    edges = cv2.Canny(blurred, 60, 150)
    
    coords = cv2.findNonZero(edges)
    if coords is not None:
        _, y, _, bh = cv2.boundingRect(coords)
        lowest = y + bh
        dist = crop_h - lowest
        print(f"Panel {i}: Lowest structural edge is {dist}px from bottom.")
    else:
        print(f"Panel {i}: No edges found.")

