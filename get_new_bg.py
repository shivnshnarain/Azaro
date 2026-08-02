from PIL import Image

for i in range(1, 6):
    img = Image.open(f'public/images/new_panel{i}.jpg')
    # Get top-left pixel color
    r, g, b = img.getpixel((0, 0))
    print(f".rightPlaceholder > .imageWrapper:nth-child({i}) {{ background-color: rgb({r}, {g}, {b}); }}")
