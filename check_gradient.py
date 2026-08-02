from PIL import Image

img = Image.open('public/images/new_panel2.jpg')
for y in range(0, 300, 50):
    print(f'Y={y}: {img.getpixel((0, y))}')
