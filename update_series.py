import re
import sys

def process_file(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()
        
    out_lines = []
    in_target = False
    
    for i, line in enumerate(lines):
        # Check if line contains an id like id: "name-101" or id: 'name-101'
        match = re.search(r'id:\s*[\'"](?:[a-zA-Z0-9_-]+)-(\d+)[\'"]', line)
        if match:
            num = int(match.group(1))
            if 101 <= num <= 148:
                in_target = True
            else:
                in_target = False
                
        # If we are in a target product and see 'series:', replace it
        if in_target and re.search(r'^\s*series:\s*[\'"].*?[\'"],?$', line):
            # Replace the string value with "DIRECTOR SERIES"
            line = re.sub(r'(series:\s*[\'"]).*?([\'"],?)', r'\g<1>DIRECTOR SERIES\g<2>', line)
            # After replacing, we can keep in_target True just in case, or reset it.
            # Usually series comes after id. Let's just do it this way.
            
        out_lines.append(line)
        
    with open(filepath, 'w') as f:
        f.writelines(out_lines)

if __name__ == "__main__":
    process_file('/Users/shivanshnarain/aazaro/src/components/sections/ProductConfigurator.tsx')
    print("Done")
