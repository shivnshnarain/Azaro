import re

with open("src/data/productsData.ts", "r") as f:
    content = f.read()

# simple regex to find id: and title:
items = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"].*?title:\s*[\'"]([^\'"]+)[\'"]', content, re.DOTALL | re.IGNORECASE)
for id_str, title in items:
    expected_slug = title.lower().strip().replace(" ", "-")
    if id_str != expected_slug:
        print(f"Mismatch: title '{title}' -> id '{id_str}' (expected '{expected_slug}')")

