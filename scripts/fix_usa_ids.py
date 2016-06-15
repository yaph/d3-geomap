#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Fix FIPS code for Minnesota. See issues:
# https://github.com/yaph/d3-geomap/issues/37
# https://github.com/nvkelso/natural-earth-vector/issues/166
import json
import os

file_dest = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../src/topojson/countries/USA.json'))

with open(file_dest, 'r') as f:
    topo = json.load(f)

for unit in topo['objects']['units']['geometries']:
    if unit['properties']['name'] == 'Minnesota':
        unit['id'] = 'US27'

with open(file_dest, 'w') as f:
    json.dump(topo, f, separators=(',', ':'))  # save bytes to keep file small
