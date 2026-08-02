with open('src/components/sections/Hero.module.css', 'r') as f:
    css = f.read()

appends = """

/* NEW IMAGE ADJUSTMENTS (REFINED FOR ALIGNMENT AND INVERSION) */
.rightPlaceholder > .imageWrapper:nth-child(1) { background-color: rgb(224, 221, 204); }
.rightPlaceholder > .imageWrapper:nth-child(2) { background-color: rgb(212, 216, 225); }
.rightPlaceholder > .imageWrapper:nth-child(3) { background-color: rgb(225, 204, 187); }
.rightPlaceholder > .imageWrapper:nth-child(4) { background-color: rgb(200, 195, 189); }
.rightPlaceholder > .imageWrapper:nth-child(5) { background-color: rgb(219, 194, 164); }

.rightPlaceholder > .imageWrapper:nth-child(1) .heroImage {
  --base-y: 3%;
  --base-scale: 1;
  --flip-x: 1;
}
.rightPlaceholder > .imageWrapper:nth-child(2) .heroImage {
  --base-y: 15%;
  --base-scale: 1;
  --flip-x: 1;
}
.rightPlaceholder > .imageWrapper:nth-child(3) .heroImage {
  --base-y: 15%;
  --base-scale: 1;
  --flip-x: 1;
}
.rightPlaceholder > .imageWrapper:nth-child(4) .heroImage {
  --base-y: 1%;
  --base-scale: 1;
  --flip-x: -1;
}
.rightPlaceholder > .imageWrapper:nth-child(5) .heroImage {
  --base-y: 1%;
  --base-scale: 1;
  --flip-x: -1;
}
"""
css += appends

with open('src/components/sections/Hero.module.css', 'w') as f:
    f.write(css)
