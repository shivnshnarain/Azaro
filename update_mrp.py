import re
import random

file_path = "src/components/sections/ProductConfigurator.tsx"
with open(file_path, "r") as f:
    content = f.read()

def calculate_mrp(price_str, discount):
    # price_str might be "₹15,000"
    num_str = price_str.replace('₹', '').replace(',', '')
    try:
        sp = int(num_str)
        mrp = round(sp / (1 - discount/100))
        return f"₹{mrp:,}"
    except ValueError:
        return price_str

def replace_price(match):
    prefix = match.group(1)
    price_val = match.group(2)
    
    # Generate random discount between 5 and 20
    discount = random.randint(5, 20)
    mrp_val = calculate_mrp(price_val, discount)
    
    return f'{prefix}price: "{price_val}",\n{prefix}mrp: "{mrp_val}",\n{prefix}discount: {discount},'

content = re.sub(r'([ \t]+)price:\s*"([^"]+)",', replace_price, content)
content = re.sub(r"([ \t]+)price:\s*'([^']+)',", replace_price, content)

with open(file_path, "w") as f:
    f.write(content)

print("Updated MRPs successfully.")
