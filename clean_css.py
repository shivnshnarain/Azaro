import re

with open('src/components/sections/Hero.module.css', 'r') as f:
    lines = f.readlines()

# Keep everything up to line 375
new_lines = lines[:375]

new_css = "".join(new_lines)

# Now we adjust the border-right to be 6px
new_css = new_css.replace('border-right: 2px solid #ffffff;', 'border-right: 6px solid #ffffff;')

# Now append the clean adjustments
overrides = """
/* Backgrounds for seamless edges */
.rightPlaceholder > .imageWrapper:nth-child(1) { background-color: rgb(224, 221, 204); }
.rightPlaceholder > .imageWrapper:nth-child(2) { background-color: rgb(212, 216, 225); }
.rightPlaceholder > .imageWrapper:nth-child(3) { background-color: rgb(225, 204, 187); }
.rightPlaceholder > .imageWrapper:nth-child(4) { background-color: rgb(200, 195, 189); }
.rightPlaceholder > .imageWrapper:nth-child(5) { background-color: rgb(219, 194, 164); }

/* NEW IMAGE ADJUSTMENTS */
.heroFirstImage {
  object-position: center;
  --base-y: 4.5%;
  --base-scale: 1;
  --flip-x: 1;
}
.heroFarLeftImage {
  object-position: center;
  --base-y: 2.55%;
  --base-scale: 1;
  --flip-x: 1;
}
.heroMiddleImage {
  object-position: center;
  --base-y: 6.07%;
  --base-scale: 1;
  --flip-x: 1;
}
.heroLeftImage {
  object-position: center;
  --base-y: 4.23%;
  --base-scale: 1;
  --flip-x: -1;
}
.heroRightImage {
  object-position: center;
  --base-y: 2.49%;
  --base-scale: 1;
  --flip-x: -1;
}
"""

new_css += overrides

with open('src/components/sections/Hero.module.css', 'w') as f:
    f.write(new_css)
