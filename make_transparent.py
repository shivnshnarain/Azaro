import io
from rembg import remove, new_session
from PIL import Image

def process_image(img_path, out_path):
    print(f"Processing {img_path}")
    with open(img_path, 'rb') as i:
        input_data = i.read()
    
    session = new_session("u2net")
    output_data = remove(input_data, session=session, post_process=True)
    
    out_img = Image.open(io.BytesIO(output_data))
    out_img.save(out_path, "PNG")
    print(f"Saved to {out_path}")

if __name__ == "__main__":
    process_image('public/images/new-uploaded-decoration.png', 'public/images/footer-overlap-chair.png')
