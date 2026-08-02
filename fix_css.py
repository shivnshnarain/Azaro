import re

with open('src/components/sections/Hero.module.css', 'r') as f:
    css = f.read()

# Fix rightPlaceholder gap and background
css = re.sub(r'(\.rightPlaceholder\s*\{[^}]*)gap:\s*2px;([^}]*\})', r'\1\2', css)

# Fix imageWrapper to have explicit border-right for the equal dividers
css = re.sub(r'(\.imageWrapper\s*\{[^}]*)flex:\s*1\s+1\s+0;\s*min-width:\s*0;', r'\1flex: 1 1 20%; width: 20%; min-width: 0; box-sizing: border-box;', css)

wrapper_border = """
.imageWrapper:not(:last-child) {
  border-right: 2px solid #ffffff;
}
"""
if "border-right: 2px solid #ffffff" not in css:
    css += wrapper_border

# Update image transforms and positioning
# We will just redefine the classes at the end of the file to override.

overrides = """
/* NEW IMAGE ADJUSTMENTS */
.heroFirstImage {
  object-position: center;
  --base-y: 0%;
  --base-scale: 1;
  --flip-x: 1;
}
.heroFarLeftImage {
  object-position: center;
  --base-y: 2.5%;
  --base-scale: 1;
  --flip-x: 1;
}
.heroMiddleImage {
  object-position: center;
  --base-y: 2%;
  --base-scale: 0.95;
  --flip-x: 1;
}
.heroLeftImage {
  object-position: center;
  --base-y: 2.5%;
  --base-scale: 1;
  --flip-x: 1;
}
.heroRightImage {
  object-position: center;
  --base-y: 4.5%;
  --base-scale: 1;
  --flip-x: 1;
}

/* Backgrounds for seamless edges */
.rightPlaceholder > .imageWrapper:nth-child(1) { background-color: rgb(207, 208, 192); }
.rightPlaceholder > .imageWrapper:nth-child(2) { background-color: rgb(198, 192, 189); }
.rightPlaceholder > .imageWrapper:nth-child(3) { background-color: rgb(215, 196, 181); }
.rightPlaceholder > .imageWrapper:nth-child(4) { background-color: rgb(206, 214, 223); }
.rightPlaceholder > .imageWrapper:nth-child(5) { background-color: rgb(220, 192, 167); }
"""

css = re.sub(r'\.heroRightImage \{[\s\S]*?\}', '', css)
css = re.sub(r'\.heroLeftImage \{[\s\S]*?\}', '', css)
css = re.sub(r'\.heroFirstImage \{[\s\S]*?\}', '', css)
css = re.sub(r'\.heroMiddleImage \{[\s\S]*?\}', '', css)
css = re.sub(r'\.heroFarLeftImage \{[\s\S]*?\}', '', css)

css += overrides

with open('src/components/sections/Hero.module.css', 'w') as f:
    f.write(css)
