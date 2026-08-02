from PIL import Image

images = [Image.open(f'public/images/new_panel{i}.jpg') for i in range(1, 6)]

# Simulate 20vw on 1920x1080 -> 384x1080
out_w, out_h = 384, 1080

results = []
for i, img in enumerate(images):
    # scale so width matches out_w
    scale = out_w / img.width
    scaled_h = int(img.height * scale)
    scaled_img = img.resize((out_w, scaled_h), Image.Resampling.LANCZOS)
    
    # default object-position: 50% 50%
    y_offset = (scaled_h - out_h) // 2
    
    # We want to lower the chairs. That means we crop less from the bottom, meaning we shift the crop window down.
    # So we increase y_offset towards (scaled_h - out_h)
    
    crop = scaled_img.crop((0, y_offset, out_w, y_offset + out_h))
    results.append(crop)

# Combine side-by-side
comp = Image.new('RGB', (out_w * 5, out_h))
for i, r in enumerate(results):
    comp.paste(r, (i * out_w, 0))

comp.save('test_alignment_center.jpg')
