import re

with open('src/components/sections/Hero.tsx', 'r') as f:
    content = f.read()

# Replace image sources
replacements = [
    ('src="/images/hero-new-first-image.jpg"', 'src="/images/panel1.png"'),
    ('src="/images/hero-new-farleft-image.jpg"', 'src="/images/panel2.png"'),
    ('src="/images/hero-new-middle-image.jpg"', 'src="/images/panel3.png"'),
    ('src="/images/hero-new-left-image.jpg"', 'src="/images/panel4.png"'),
    ('src="/images/hero-new-right-image.jpg"', 'src="/images/panel5.png"'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('src/components/sections/Hero.tsx', 'w') as f:
    f.write(content)
