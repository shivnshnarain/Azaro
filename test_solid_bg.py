import cv2
import numpy as np

img = cv2.imread("/Users/shivanshnarain/Downloads/143EFD6B-20A7-4C43-96B2-7CE8AE04B50A 8.jpg")
if img is not None:
    # Check variance of top row
    top_row = img[0, :]
    print(f"Top row std dev: {np.std(top_row, axis=0)}")
