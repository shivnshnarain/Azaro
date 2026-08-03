import re
import os

filepath = "src/components/sections/ProductConfigurator.tsx"

with open(filepath, "r") as f:
    content = f.read()

# We want to extract definitions of PRODUCTS_DATA, DIRECTOR_PRODUCTS, and anything ending in _DATA
# This is safer done by finding the top-level 'export const ' matches that match our criteria.

pattern = r"export const ([A-Z0-9_]+)\s*=\s*(\[.*?\]|\{.*?\});\n"
# This regex might not handle nested brackets correctly. 
# Let's do a simple parsing by brace/bracket counting.

def extract_variables(text):
    results = {}
    idx = 0
    while True:
        match = re.search(r"export const ([A-Z0-9_]+)\s*=\s*([\[\{])", text[idx:])
        if not match:
            break
        
        var_name = match.group(1)
        
        # We only want to extract data arrays/objects, not React components
        if not (var_name.endswith("_DATA") or var_name in ["PRODUCTS_DATA", "DIRECTOR_PRODUCTS", "getSwatchStyle"]):
            idx += match.end()
            continue
            
        start_char = match.group(2)
        start_idx = idx + match.end() - 1
        
        open_char = start_char
        close_char = ']' if start_char == '[' else '}'
        
        count = 0
        end_idx = start_idx
        for i in range(start_idx, len(text)):
            if text[i] == open_char:
                count += 1
            elif text[i] == close_char:
                count -= 1
                if count == 0:
                    end_idx = i + 1
                    break
                    
        # Check if it ends with a semicolon
        if end_idx < len(text) and text[end_idx] == ';':
            end_idx += 1
            
        full_def = text[idx + match.start() : end_idx]
        results[var_name] = full_def
        idx = end_idx
        
    return results

vars = extract_variables(content)

os.makedirs("src/data", exist_ok=True)
with open("src/data/productsData.ts", "w") as f:
    for name, code in vars.items():
        # skip getSwatchStyle which is a function
        if name != "getSwatchStyle":
            f.write(code + "\n\n")

print(f"Extracted {len(vars)} variables.")

# Now remove these from ProductConfigurator.tsx
new_content = content
for name, code in vars.items():
    if name != "getSwatchStyle":
        new_content = new_content.replace(code + "\n", "")
        new_content = new_content.replace(code, "")

# Add import
import_stmt = 'import { ' + ', '.join([n for n in vars.keys() if n != "getSwatchStyle"]) + ' } from "@/data/productsData";\n'

lines = new_content.splitlines(True)
lines.insert(2, import_stmt)

with open(filepath, "w") as f:
    f.writelines(lines)

