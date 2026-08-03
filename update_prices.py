import re

price_list = """
Platinum 101 — ₹15,000
Platinum 102 — ₹13,940
Gold 103 — ₹9,000
Silver 104 — ₹9,200
Palladium 105 — ₹6,800
Diamond 106 — ₹6,800
Corel 107 — ₹10,100
Emerald 108 — ₹8,900
Ivory 109 — ₹11,100
Jasper 110 — ₹11,200
Opal 111 — ₹10,100
Pearl 112 — ₹7,100
Ruby 113 — ₹13,000
Lotus 114 — ₹11,800
Rose 115 — ₹9,000
Jasmine 116 — ₹7,400
Daisy 117 — ₹13,200
Tulip 118 — ₹7,000
Lavender 119 — ₹6,950
Orchid 120 — ₹15,300
Lily 121 — ₹10,900
Crown 122 — ₹15,500
Dynamic 123 — ₹14,400
Fantasy 124 — ₹10,400
Heaven 125 — ₹11,000
Classic 126 — ₹9,400
Pyramid 127 — ₹8,100
Royal 128 — ₹6,600
Mercury 129 — ₹11,000
Pluto 130 — ₹11,100
Jupiter 131 — ₹10,200
Sun 132 — ₹19,800
Cherry 133 — ₹10,300
Flexi 134 — ₹7,500
Miraz 135 — ₹13,200
Viva 136 — ₹9,000
Nova 137 — ₹7,100
Crystal 138 — ₹13,100
Aqua 139 — ₹12,200
Mosaic 140 — ₹10,400
Zante 141 — ₹9,500
Siesta 142 — ₹8,800
Gravity 143 — ₹10,700
Nebula 144 — ₹10,200
Flint 145 — ₹8,400
Senate 146 — ₹7,600
Presidential 147 — ₹9,300
Stellar 148 — ₹8,800
Stylize 149 — ₹10,100
Fab 150 — ₹6,300
Micro 151 — ₹6,200
Inka 152 — ₹6,200
Signature 153 — ₹5,600
Cosmo 154 — ₹4,400
Gallio 155 — ₹6,100
Achieve 156 — ₹5,800
Admire 157 — ₹8,500
Stella 158 — ₹8,100
Vera 159 — ₹6,200
Wesley 160 — ₹7,700
Kinsley 161 — ₹5,100
Ultima 162 — ₹6,200
Chicago 163 — ₹6,900
Georgia 164 — ₹5,900
Italia 165 — ₹7,100
Zerlina 166 — ₹7,100
Milan 167 — ₹6,950
Trento 168 — ₹7,300
Genoa 169 — ₹5,400
Marko 170 — ₹5,450
Synergy 171 — ₹3,800
Pentagon 172 — ₹6,300
Preston 173 — ₹5,100
Regalia 174 — ₹5,400
Montage 175 — ₹4,450
Solitaire 176 — ₹5,700
"""

price_map = {}
for line in price_list.strip().split('\n'):
    parts = line.split(' — ')
    if len(parts) == 2:
        name = parts[0].strip().upper()
        # Aliases for typos in the prompt vs code
        if name == "COREL 107": name = "CORAL 107"
        if name == "STELLA 158": name = "STELLE 158"
        if name == "CHICAGO 163": name = "CHICEGO 163"
        price_map[name] = parts[1].strip()

file_path = "src/components/sections/ProductConfigurator.tsx"
with open(file_path, "r") as f:
    content = f.read()

# Replace titles to add price field
def replace_title(match):
    prefix = match.group(1)
    title = match.group(2)
    upper_title = title.upper()
    if upper_title in price_map:
        return f'{prefix}title: "{title}",\n{prefix}price: "{price_map[upper_title]}",'
    else:
        # Check if title with different casing matches
        for k, v in price_map.items():
            if k == upper_title:
                return f'{prefix}title: "{title}",\n{prefix}price: "{v}",'
        
        # Single quote matching
        if title.upper() in price_map:
            return f'{prefix}title: \'{title}\',\n{prefix}price: \'{price_map[title.upper()]}\','
        return match.group(0)

# Replace for double quotes
content = re.sub(r'([ \t]+)title:\s*"([^"]+)",', replace_title, content)
# Replace for single quotes
content = re.sub(r"([ \t]+)title:\s*'([^']+)',", replace_title, content)

# Check how many replacements were made
count = 0
for k in price_map:
    if f'price: "{price_map[k]}"' in content or f"price: '{price_map[k]}'" in content:
        count += 1

print(f"Matched {count} out of {len(price_map)} products.")

with open(file_path, "w") as f:
    f.write(content)
