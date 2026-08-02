import cv2
import numpy as np

for i in range(1, 6):
    img = cv2.imread(f'public/images/new_panel{i}.jpg')
    h, w = img.shape[:2]
    
    # We want to find the lowest pixel of the physical chair structure (wheels/legs).
    # These are usually dark (wheels) or metallic (legs). 
    # Let's find the lowest edge using Canny edge detection, which ignores soft shadows.
    
    crop_h = 600
    bottom = img[-crop_h:, :]
    
    # Grayscale
    gray = cv2.cvtColor(bottom, cv2.COLOR_BGR2GRAY)
    
    # Canny Edge Detection (high thresholds to ignore soft shadows)
    edges = cv2.Canny(gray, 50, 150)
    
    # Find lowest edge
    coords = cv2.findNonZero(edges)
    if coords is not None:
        _, y, _, bh = cv2.boundingRect(coords)
        lowest = y + bh
        dist = crop_h - lowest
        print(f"Panel {i}: Lowest structural edge is {dist}px from bottom.")
    else:
        print(f"Panel {i}: No edges found.")

