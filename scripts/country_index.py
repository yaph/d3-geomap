#!/usr/bin/env python
import json
from pathlib import Path


countries = json.loads(Path('./dist/topojson/world/countries.json').read_text())
meta = [c['properties'] for c in countries['objects']['units']['geometries']
        if Path('./dist/topojson/countries/' + c['properties']['iso3'] + '.json').exists()]
Path('./dist/meta-countries.json').write_text(json.dumps(meta))