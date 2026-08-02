import cv2
import sys

images = [
    "/Users/shivanshnarain/Downloads/D1DFB507-E0AD-4D47-A503-0546829A7D0E 8.jpg",
    "/Users/shivanshnarain/Downloads/980B94A4-8B0F-4D8E-8C05-FC433687A321 8.jpg",
    "/Users/shivanshnarain/Downloads/143EFD6B-20A7-4C43-96B2-7CE8AE04B50A 8.jpg",
    "/Users/shivanshnarain/aazaro/public/images/hero-new-left-image.jpg",
    "/Users/shivanshnarain/aazaro/public/images/hero-new-right-image.jpg"
]

for img_path in images:
    img = cv2.imread(img_path)
    if img is not None:
        color = img[0, 0]
        # BGR to RGB
        r, g, b = color[2], color[1], color[0]
        hex_color = "#{:02x}{:02x}{:02x}".format(r, g, b)
        print(f"{img_path.split('/')[-1]}: {hex_color}")
    else:
        print(f"Could not read {img_path}")
