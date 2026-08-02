from PIL import Image

images = [Image.open(f'public/images/new_panel{i}.jpg') for i in range(1, 6)]

# Panel 4 and 5 mirrored
images[3] = images[3].transpose(Image.FLIP_LEFT_RIGHT)
images[4] = images[4].transpose(Image.FLIP_LEFT_RIGHT)

out_w, out_h = 384, 1080
comp = Image.new('RGB', (out_w * 5, out_h))

# Base Y targets:
# Let's say we want all bases to be at y=1000 in the output image (which leaves 80px space below).
target_base_y = 1000

# Base coordinates in the original images
bottoms = [1809, 1593, 1580, 1844, 1846]

for i, (img, base_y_orig) in enumerate(zip(images, bottoms)):
    scale = out_w / img.width
    scaled_h = int(img.height * scale)
    scaled_img = img.resize((out_w, scaled_h), Image.Resampling.LANCZOS)
    
    # Scale the base coordinate
    scaled_base = int(base_y_orig * scale)
    
    # We want scaled_base to land at target_base_y in the output.
    # The output crop window goes from crop_y to crop_y + out_h.
    # Therefore, scaled_base - crop_y = target_base_y
    # => crop_y = scaled_base - target_base_y
    
    crop_y = scaled_base - target_base_y
    
    # We can't have negative crop_y (well, we can, it just means adding background at the top)
    # Let's handle padding
    if crop_y < 0:
        # We need to pad the top
        # We don't pad here, we just use a trick or create a new image
        res = Image.new('RGB', (out_w, out_h), img.getpixel((0,0)))
        # paste scaled_img at y = -crop_y
        res.paste(scaled_img, (0, -crop_y))
    else:
        # crop normally
        res = scaled_img.crop((0, crop_y, out_w, crop_y + out_h))
    
    comp.paste(res, (i * out_w, 0))

comp.save('test_alignment_target.jpg')
