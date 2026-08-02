from PIL import Image

for i in range(1, 6):
    img = Image.open(f'public/images/panel{i}.png')
    extrema = img.getextrema()
    print(f'Panel {i}: mode={img.mode}, extrema={extrema}')
