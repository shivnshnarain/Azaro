import re
import json

with open("src/components/sections/ProductConfigurator.tsx", "r") as f:
    content = f.read()

# Find all blocks like id: 'something', title: 'something', ...
# This can be tricky, but we can look for "id: '.*?'"
# Actually, it's easier to find export const [NAME] = [ ... ] or export const [NAME] = { ... }
# Let's try to just capture the raw JSON-like structures.
