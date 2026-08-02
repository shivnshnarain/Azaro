from PIL import Image

for i in range(1, 6):
    img = Image.open(f'public/images/new_panel{i}.jpg')
    w, h = img.size
    bg1 = img.getpixel((0, 0))
    bg2 = img.getpixel((w-1, 0))
    print(f'New Panel {i} bg top-left: {bg1}, top-right: {bg2}')
