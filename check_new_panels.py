from PIL import Image

for i in range(1, 6):
    img = Image.open(f'public/images/new_panel{i}.jpg')
    print(f'New Panel {i}: size={img.size}, mode={img.mode}')
