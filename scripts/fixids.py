#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json

replacements = {
    'KOS': 'XKX', #Kosovo
    'PN1': 'PNG', #Papua New Guniea
    'PR1': 'PRT', #Portugal
    'SDS': 'SSD', #S. Sudan
    'SAH': 'ESH', #W. Sahara
}

with open('../src/topojson/world/countries.json', 'r') as f:
    topo = json.load(f)

countries = topo['objects']['units']['geometries']
for country in countries:
    if country['id'] in replacements:
        country['id'] = replacements[country['id']]

with open('../src/topojson/world/countries.json', 'w') as f:
    json.dump(topo, f, separators=(',', ':')) # save bytes to keep file small