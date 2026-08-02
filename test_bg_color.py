import cv2
import sys

img_path = sys.argv[1]
img = cv2.imread(img_path)
if img is not None:
    # Print the top-left pixel color
    print(f"Top-left color: {img[0, 0]}")
else:
    print("Could not read image")
