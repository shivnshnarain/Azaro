import re

with open('src/components/sections/Hero.tsx', 'r') as f:
    content = f.read()

replacements = [
    ('src="/images/panel1.png"', 'src="/images/new_panel1.jpg"'),
    ('src="/images/panel2.png"', 'src="/images/new_panel2.jpg"'),
    ('src="/images/panel3.png"', 'src="/images/new_panel3.jpg"'),
    ('src="/images/panel4.png"', 'src="/images/new_panel4.jpg"'),
    ('src="/images/panel5.png"', 'src="/images/new_panel5.jpg"'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('src/components/sections/Hero.tsx', 'w') as f:
    f.write(content)
