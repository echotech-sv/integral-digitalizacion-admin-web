import json
with open(r'C:\Users\paolo\.gemini\antigravity\brain\1e244440-f77e-45be-91a6-be1e50cee558\.system_generated\steps\38\output.txt', encoding='utf8') as f:
    data = json.load(f)
def find_hab(o, p):
    if isinstance(o, str):
        if 'Habilitar' in o: print(p, o)
    elif isinstance(o, dict):
        for k, v in o.items(): find_hab(v, p + '.' + k)
    elif isinstance(o, list):
        for i, v in enumerate(o): find_hab(v, p + f'[{i}]')
find_hab(data, 'root')
