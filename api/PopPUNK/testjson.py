import json

with open('sketch.json', 'r') as f:
    distros_dict = json.load(f)

print(distros_dict)