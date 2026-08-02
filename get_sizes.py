import cv2

images = [
    "/Users/shivanshnarain/aazaro/public/images/hero-new-first-image.jpg",
    "/Users/shivanshnarain/aazaro/public/images/hero-new-left-image.jpg"
]

for img_path in images:
    img = cv2.imread(img_path)
    if img is not None:
        h, w, _ = img.shape
        print(f"{img_path.split('/')[-1]}: {w}x{h}")
