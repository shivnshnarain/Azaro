import cv2
import numpy as np

for i in range(1, 6):
    img = cv2.imread(f'public/images/new_panel{i}.jpg')
    bottom_crop = img[-300:, :]
    cv2.imwrite(f'bottom_{i}.jpg', bottom_crop)
