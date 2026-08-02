import cv2
import numpy as np

for i in range(1, 6):
    img = cv2.imread(f'public/images/new_panel{i}.jpg')
    h, w = img.shape[:2]
    
    # Check bottom 600 pixels
    bottom_crop = img[-600:, :]
    gray = cv2.cvtColor(bottom_crop, cv2.COLOR_BGR2GRAY)
    
    # The very bottom row is pure background
    bg_color = gray[-1, -1]
    
    # Calculate difference
    diff = cv2.absdiff(gray, np.full_like(gray, bg_color))
    
    # Threshold (background might vary slightly, so use 15)
    _, thresh = cv2.threshold(diff, 15, 255, cv2.THRESH_BINARY)
    
    coords = cv2.findNonZero(thresh)
    if coords is not None:
        x, y, bw, bh = cv2.boundingRect(coords)
        # y + bh is the lowest point in the bottom crop
        lowest_point = h - 600 + y + bh
        dist_from_bottom = h - lowest_point
        print(f"Panel {i}: Lowest chair pixel is at {lowest_point}/{h} (Distance from bottom: {dist_from_bottom}px)")
    else:
        print(f"Panel {i}: No chair found in bottom 600px!")
