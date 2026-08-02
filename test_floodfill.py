from PIL import Image, ImageDraw
import glob
import os

img_path = 'public/images/plat101-5-new.png'
img = Image.open(img_path).convert('RGB')
ImageDraw.floodfill(img, (0, 0), (255, 255, 255), thresh=15)
ImageDraw.floodfill(img, (img.width-1, 0), (255, 255, 255), thresh=15)
ImageDraw.floodfill(img, (0, img.height-1), (255, 255, 255), thresh=15)
ImageDraw.floodfill(img, (img.width-1, img.height-1), (255, 255, 255), thresh=15)
img.save('test_out.png')
print("Done test_out.png")
