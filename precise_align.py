import cv2
import numpy as np

results = {}
for i in range(1, 6):
    img = cv2.imread(f'public/images/new_panel{i}.jpg')
    h, w = img.shape[:2]
    
    # Analyze the bottom 600 pixels
    crop_h = 600
    bottom_crop = img[-crop_h:, :]
    
    # To handle gradients, we check differences against the left and right edges.
    # The chairs are centered, so the left and right edges should be pure background.
    # We take the left 10 pixels and right 10 pixels as background reference.
    bg_left = bottom_crop[:, :10]
    bg_right = bottom_crop[:, -10:]
    
    # Create a 1D gradient reference for the background for each row
    # Just take the median of left and right for each row.
    bg_ref_left = np.median(bg_left, axis=1, keepdims=True)
    bg_ref_right = np.median(bg_right, axis=1, keepdims=True)
    bg_ref = (bg_ref_left + bg_ref_right) / 2
    
    # Broadcast to match image width
    bg_ref = np.repeat(bg_ref, w, axis=1).astype(np.float32)
    
    bottom_crop_f = bottom_crop.astype(np.float32)
    
    # Calculate difference
    diff = np.abs(bottom_crop_f - bg_ref)
    diff = np.sum(diff, axis=2) # sum across color channels
    
    # Threshold to find chair (difference > 30)
    thresh = (diff > 40).astype(np.uint8) * 255
    
    coords = cv2.findNonZero(thresh)
    if coords is not None:
        # Get lowest y coordinate
        _, y, _, bh = cv2.boundingRect(coords)
        lowest = y + bh
        dist_from_bottom = crop_h - lowest
        results[i] = dist_from_bottom
        print(f"Panel {i}: Chair ends {dist_from_bottom}px from the bottom of the image.")
    else:
        results[i] = 0
        print(f"Panel {i}: Chair touches bottom.")

# We want to align them.
# Panel 1 is master. It will move down by 1-2% in CSS. 
# CSS --base-y moves the image DOWN by X% of the IMAGE HEIGHT.
# Image height is 1844-1846 (let's say 1844). 1% is 18.44px.
# If Panel 1 moves down by 5% (was 3%, +2%), it shifts the image 92.2px down.
# The absolute vertical position of the chair bottom on the screen is:
# pos = dist_from_bottom - translation
# Since the image is translated down, the chair moves down, meaning the distance from the top increases.
