from PIL import Image
import numpy as np
import cv2

for i in range(1, 6):
    img = cv2.imread(f'public/images/new_panel{i}.jpg')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Simple bounding box detection: assuming background is roughly uniform at top/bottom
    # Get top row background color
    bg_color = gray[0, 0]
    
    # Compute absolute difference
    diff = cv2.absdiff(gray, np.full_like(gray, bg_color))
    
    # Threshold
    _, thresh = cv2.threshold(diff, 10, 255, cv2.THRESH_BINARY)
    
    # Find bounding box
    coords = cv2.findNonZero(thresh)
    x, y, w, h = cv2.boundingRect(coords)
    
    print(f"Panel {i}: size={img.shape[1]}x{img.shape[0]}, object_bounds=(y:{y}, bottom:{y+h})")
