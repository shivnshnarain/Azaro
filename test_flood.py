from PIL import Image, ImageDraw
import sys

img = Image.open('public/images/ruby113-1.png').convert('RGB')
ImageDraw.floodfill(img, (0,0), (255, 255, 255), thresh=20)
ImageDraw.floodfill(img, (img.width-1, 0), (255, 255, 255), thresh=20)
ImageDraw.floodfill(img, (0, img.height-1), (255, 255, 255), thresh=20)
ImageDraw.floodfill(img, (img.width-1, img.height-1), (255, 255, 255), thresh=20)
img.save('test_ruby_flood.png')
print("Done")
