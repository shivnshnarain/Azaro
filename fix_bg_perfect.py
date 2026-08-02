import cv2
import numpy as np
import io
from rembg import remove
from PIL import Image

def process_image(img_path, out_path):
    img = cv2.imread(img_path)
    if img is None:
        return
        
    with open(img_path, 'rb') as i:
        input_data = i.read()
    
    # Get mask
    output_data = remove(input_data, only_mask=True)
    mask_pil = Image.open(io.BytesIO(output_data)).convert('L')
    mask = np.array(mask_pil)
    
    # We want to adjust the background.
    # Background is where mask is NOT 255. Let's use a soft mask.
    # float_mask = 0 for background, 1 for chair.
    float_mask = mask.astype(np.float32) / 255.0
    float_mask = cv2.GaussianBlur(float_mask, (5,5), 0)
    # Expand float_mask to 3 channels
    float_mask = np.stack([float_mask]*3, axis=-1)
    
    # For the background, we want to map colors near 235 to 255.
    # We can apply a curve: result = img * (255.0 / 235.0)
    # Actually, let's just make it a bit more aggressive for the brightest parts,
    # or just use a simple multiplier:
    bg_adjusted = np.clip(img.astype(np.float32) * 1.08, 0, 255)
    
    # If the user wants PURE WHITE (#FFFFFF) for the empty areas,
    # multiplying by 1.08 might leave some pixels at 250.
    # Let's do: if pixel is > 220, fade it rapidly to 255.
    # An easier way:
    # bg_adjusted = img
    # For every pixel in bg, if it's > 215, we push it to 255 using a curve.
    
    # Let's use the simplest possible approach: 
    # Just threshold the background. The user said: "Mask ONLY the empty background area surrounding the chair. Replace ONLY the background colour."
    # If we just fill the background with 255, what about the shadow?
    # Let's find pixels that are definitely empty background (e.g. brightness > 220) and are in the background mask.
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Create a mask for "bright background"
    # It must be background (float_mask < 0.5) AND bright (gray > 225)
    bright_bg_mask = (mask < 128) & (gray > 225)
    
    # We can soften this mask
    bright_bg_mask_img = (bright_bg_mask * 255).astype(np.uint8)
    bright_bg_mask_img = cv2.GaussianBlur(bright_bg_mask_img, (5,5), 0)
    
    blend = bright_bg_mask_img.astype(np.float32) / 255.0
    blend = np.stack([blend]*3, axis=-1)
    
    # Apply to image
    result = img.astype(np.float32) * (1 - blend) + 255.0 * blend
    result = np.clip(result, 0, 255).astype(np.uint8)
    
    cv2.imwrite(out_path, result)
    print(f"Processed {img_path}")

process_image('public/images/ruby113-1.png', 'test_ruby_rembg.png')
